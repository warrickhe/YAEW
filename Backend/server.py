import requests
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://warrickhe:secure!@cluster0.ngq8tww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    print("request received",file=sys.stderr)
    return "Hello world!"



if __name__ == '__main__':
    app.run(host="localhost", port=7272, debug=True)