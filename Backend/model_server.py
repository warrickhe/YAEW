import requests
import sys
import datetime
from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from microsoft_classification.classify_images import classify_img

app = Flask(__name__)
CORS(app)

#location based...

@app.route('/')
def hello():
  return "Hello world!"

def classify_image():
  #image will be in path
  result = classify_img()
  return result

@app.route('/classify', methods=['POST'])
def handle_query():
  imagefile = request.files.get('file').read()
  with open("./local.png","wb") as my_file:
    my_file.write(imagefile)
  return jsonify({"result":classify_image()})

if __name__ == '__main__':
  app.run(host="localhost", port=9272, debug=True)
