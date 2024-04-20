#! /bin/bash
python -m pip install "pymongo[srv]"
python -m pip install flask
python -m pip install flask_cors
python -m pip install requests
pip install -q -U google-generativeai


# for the tflite model
pip install numpy
pip install tensorflow
pip install opencv-python
pip install pathlib