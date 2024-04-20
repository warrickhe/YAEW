import requests
import sys
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import pymongo
from bson.json_util import dumps, loads 
import my_secrets
mongo_uri = my_secrets.get_mongo_uri()
gemini_api = my_secrets.get_gemini_key()
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

@app.route('/info', methods=['GET'])
def get_info():
  species = request.args.get("species")
  prompt = ""
  return dumps({"description":"the chicken is a fierce species. it is quite tasty though."})


if __name__ == '__main__':
  client = pymongo.MongoClient(mongo_uri)
  db = client["YAEW"]
  app.run(host="localhost", port=7272, debug=True)