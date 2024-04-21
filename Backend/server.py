import requests
import sys
import datetime
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import pymongo
from bson.json_util import dumps, loads 
import my_secrets
import google.generativeai as genai
from functools import lru_cache
import uuid
import copy

mongo_uri = my_secrets.get_mongo_uri()
gemini_api_key = my_secrets.get_gemini_key()
model = None
faster_model = None
client = None
db = None
app = Flask(__name__)
CORS(app)

#location based...

@app.route('/')
def hello():
  return "Hello world!"

@app.route('/getid', methods=['GET'])
def get_id():
  deviceID = request.args.get("device_id")
  res = db['users'].find_one({"deviceID":deviceID})
  if res:
    return jsonify({'username':res['username']})
  #success example: {'_id': ObjectId('6623374f09b87299ae8c5f63'), 'deviceID': 'pixel7', 'username': 'warrick'}
  return Response(status=204)

@app.route('/makeuser', methods=['GET'])
def check_user():
  username = request.args.get("username")
  deviceID = request.args.get("device_id")
  res = db['users'].find_one({"username":username})
  if res: 
    return Response(status=204)
  #success example: {'_id': ObjectId('6623374f09b87299ae8c5f63'), 'deviceID': 'pixel7', 'username': 'warrick'}
  db['users'].insert_one({'deviceID':deviceID,'username':username,'points':0})
  return Response(status=200)

def get_animal(imagefile):
  return "chicken"

@app.route('/capture', methods=['POST'])
def capture_image():
  deviceID = request.args.get("device_id","pixel7")
  imagefile = request.files.get('file').read()
  image_id = str(uuid.uuid4())
  animal = requests.post("https://eaf0-146-152-233-36.ngrok-free.app/classify",files={'file': ('file', imagefile)}).json()['result']
  #below chunk can be CELERIED, don't know the latency on this op but if capture image exceeds 10 seconds in time celery it
  db['captures'].insert_one({"deviceID":deviceID,"date":datetime.datetime.now(),
                             "image_id":image_id,
                             "animal":animal,
                             "points":5})
  with open(f"./images/{image_id}.png","wb") as my_file:
    my_file.write(imagefile)
  #requests.post("https://56d7-146-152-233-36.ngrok-free.app/classify",files=files)
  description = short_description(animal)
  #put image into database
  return dumps({
    "animal": animal,
    "description": description,
    "points": 5
  })

@app.route('/journal', methods=['GET'])
def get_journal():
  deviceID = request.args.get("device_id")
  res = db['captures'].find({"deviceID":deviceID}).sort("date",-1)  
  ret = []
  for r in res:
    r = copy.deepcopy(r)
    image_id = r["image_id"]
    with open(f"./images/{image_id}.png","rb") as user_image:
        r["image"] = user_image.read()
    ret.append(r)
  return dumps(ret)

@app.route('/collection', methods=['GET'])
def get_collection():
  deviceID = request.args.get("device_id")
  res = db['captures'].find({"deviceID":deviceID}).distinct("animal")
  animals = []
  for r in res:
    animals.append(r)
  animals.sort()
  return dumps({"animals":animals})

@app.route('/profile', methods=['GET'])
def get_profile():
  deviceID = request.args.get("device_id")
  print(deviceID)
  res = db['captures'].find({"deviceID":deviceID})
  total_captures = len(list(res))
  res = res.distinct("animal")
  unique_species = len(list(res))
  #possible error with CURSOR above
  user = db['users'].find_one({"deviceID":deviceID})
  points = user['points']
  username = user['username']
  return dumps({"username":username,"total_captures":total_captures,"unique_species":unique_species,"points":points})

@lru_cache(maxsize=3000)
def short_description(species):
  short_prompt = f"Make a short but funny description of a {species}."
  short_resp = faster_model.generate_content(short_prompt).text
  return short_resp

@lru_cache(maxsize=3000)
def long_description(species):
  detailed_prompt = f"Give an 100 to 150 word description of a {species}."
  long_resp = model.generate_content(detailed_prompt).text
  return long_resp

@lru_cache(maxsize=3000)
def how_to_find(species): 
  find_prompt = f"Suppose I am a child. Where can I go to find a live {species}? Keep the output between 100 and 150 words."
  find_resp = model.generate_content(find_prompt).text
  return dumps({"description":find_resp})

@app.route('/info/short', methods=['GET'])
def get_short():
  species = request.args.get("species")
  return short_description(species)

@app.route('/info/long', methods=['GET'])
def get_long():
  species = request.args.get("species")
  description = long_description(species)
  deviceID = request.args.get("device_id")
  res = db['captures'].find({"deviceID":deviceID,"animal":species}).sort("date",-1)
  images = []
  count = 0
  for r in res:
    if count<3:
      image_id = r["image_id"]
      with open(f"./images/{image_id}.png","rb") as user_image:
        images.append(user_image.read())
    count+=1
  return dumps({"num_found":count,"description":description,"user_images":images})

@app.route('/info/find', methods=['GET'])
def get_find():
  species = request.args.get("species")
  return how_to_find(species)

@lru_cache(maxsize=3000)
def make_quiz(species): 
  format = "question||choice 1||choice 2||choice 3||choice 4||answer"
  prompt = f"Give me a multiple choice question about {species} in the format: {format}"
  result = model.generate_content(prompt).text
  result = result.replace('\n',' ')
  result = result.split("||")
  print(result)
  for i in range(len(result)):
    result[i] = result[i].strip()
  print(result)
  question = result[0]
  choices = result[1:5]
  answer = choices.index(result[-1])
  return dumps({"question":question,"choices":choices,"answer":answer})

@app.route('/quiz', methods=['GET'])
def get_quiz():
  species = request.args.get("species")
  return make_quiz(species)
  

if __name__ == '__main__':
  client = pymongo.MongoClient(mongo_uri)
  db = client["YAEW"]
  model = genai.GenerativeModel('gemini-1.5-pro-latest')
  faster_model = genai.GenerativeModel('gemini-pro')
  genai.configure(api_key=gemini_api_key)
  app.run(host="0.0.0.0", port=7272, debug=True)