import requests
import sys
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import pymongo
from bson.json_util import dumps, loads 
import my_secrets
import google.generativeai as genai
from functools import lru_cache

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
  print(deviceID)
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
  db['users'].insert_one({'device_id':deviceID,'username':username,'points':0})
  return Response(status=200)

@app.route('/capture', methods=['POST'])
def capture_image():
  deviceID = request.args.get("device_id")
  ret = {
    "animal": "chicken"
  }
  #put image into database
  return dumps(ret)

@app.route('/journal', methods=['GET'])
def get_journal():
  deviceID = request.args.get("device_id")
  res = db['captures'].find({"deviceID":deviceID}).sort("date",-1)
  return dumps(res)

@app.route('/profile', methods=['GET'])
def get_profile():
  deviceID = request.args.get("device_id")
  res = db['captures'].find({"deviceID":deviceID})
  total_captures = len(list(res))
  res = res.distinct("animal")
  unique_species = len(list(res))
  user = db['users'].find_one({"device_id":deviceID})
  points = user['points']
  username = user['username']
  return dumps({"username":username,"total_captures":total_captures,"unique_species":unique_species,"points":points})

@lru_cache(maxsize=3000)
def short_description(species):
  short_prompt = f"Make a short but funny description of a {species}."
  short_resp = faster_model.generate_content(short_prompt).text
  return dumps({"description":short_resp})

@lru_cache(maxsize=3000)
def long_description(species):
  detailed_prompt = f"Give an 100 to 150 word description of a {species}."
  long_resp = model.generate_content(detailed_prompt).text
  return dumps({"description":long_resp})

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
  return long_description(species)

@app.route('/info/find', methods=['GET'])
def get_find():
  species = request.args.get("species")
  return how_to_find(species)

if __name__ == '__main__':
  client = pymongo.MongoClient(mongo_uri)
  db = client["YAEW"]
  model = genai.GenerativeModel('gemini-1.5-pro-latest')
  faster_model = genai.GenerativeModel('gemini-pro')
  genai.configure(api_key=gemini_api_key)
  app.run(host="localhost", port=7272, debug=True)