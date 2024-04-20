## Dependencies
# tensorflow
# numpy

# Load the models and study its input and output
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  
# '2' ignores INFO messages, '3' ignores INFO and WARNING messages

import numpy as np
import tensorflow as tf
import cv2
import pathlib


# Get labels
labels = []
with open("common_names.txt", "r", encoding="utf-8") as file:
    # Read each line and append it to the list
    for line in file:
        # Remove leading and trailing whitespace and append to the list
        labels.append(line.strip())

# Load TFLite model and allocate tensors.
interpreter = tf.lite.Interpreter(model_path="species_classification.tflite")

# Allocate tensors.
interpreter.allocate_tensors()

# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Reading an image and passing it to the TFLite model
script_dir = pathlib.Path(__file__).resolve().parent
folder_path = script_dir / "images"
for file in folder_path.iterdir():

    # read and resize the image
    img = cv2.imread(str(file))

    img = np.moveaxis(img, -1, 0)
    img_resized = cv2.resize(img.transpose(1, 2, 0), (560, 560))
    img_resized = np.moveaxis(img_resized, -1, 0)
    #cv2.imshow("Resized Image", img_resized.transpose(1, 2, 0))
    #cv2.waitKey(0)
    #cv2.destroyAllWindows()

    # input_details[0]['index'] = the index which accepts the input
    new_img = img_resized.astype(np.float32)
    interpreter.set_tensor(input_details[0]['index'], [new_img])

    # run the inference
    interpreter.invoke()

    # output_details[0]['index'] = the index which provides the input
    output_data = interpreter.get_tensor(output_details[0]['index'])
    
    # prints a tensor of probabilities for all the classes
    # filter to only get the max value
    index_with_highest_score = np.argmax(output_data)
    highest_score = output_data[0, index_with_highest_score]
    label = labels[index_with_highest_score]
    print( label )
    #print("For file {}, the output is {}, the score is {}".format(file.stem, label, highest_score))

    
