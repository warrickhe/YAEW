import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = 'http://192.168.1.100:7272';

// Define the data with questions, correct and wrong answers
const quizDataOLD = [
  {
    question: 'What is the capital of France?',
    options: [
      { answer: 'Paris', correct: true },
      { answer: 'London', correct: false },
      { answer: 'Berlin', correct: false },
      { answer: 'Beijing', correct: false },
    ],
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: [
      { answer: 'Mars', correct: false },
      { answer: 'Jupiter', correct: true },
      { answer: 'Earth', correct: false },
      { answer: 'Venus', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for water?',
    options: [
      { answer: 'H2O', correct: true },
      { answer: 'CO2', correct: false },
      { answer: 'O2', correct: false },
      { answer: 'H2', correct: false },
    ],
  },
];

export default function QuizPage(navigation) {
  // State variables
  const [deviceID, setDeviceID] = useState('');
  const [quizData, setQuizData] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);
  const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceID = async () => {
      let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
      setDeviceID(fetchUUID);
    };

    fetchDeviceID();
  }, []);

  useEffect(() => {
    if (!deviceID) return; // Return early if deviceID is not set

    const fetchQuizData = async () => {
      console.log('fetching quiz data');
      try {
        const response = await fetch(`${BACKEND_URL}/quiz?device_id=${deviceID}`, {
          method: 'GET',
        });

        if (response.ok) {
          const resData = await response.json();
          setQuizData(resData);
          console.log(resData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchQuizData();
  }, [deviceID]);

  // Handle button press
  const handlePress = (optionIndex) => {
    const isCorrect = quizData[currentQuestionIndex].options[optionIndex].correct;
    setSelectedOptionIndex(optionIndex);
    setIsCorrectAnswerSelected(isCorrect);
    setIsNextButtonVisible(isCorrect);
  };

  // Handle next button press
  const handleNextPress = () => {
    // Randomly select a new question index
    setCurrentQuestionIndex((currentQuestionIndex + 1) % quizData.length);
    // Reset the state for the next question
    setSelectedOptionIndex(null);
    setIsCorrectAnswerSelected(null);
    setIsNextButtonVisible(false);
  };
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const currentQuestion = quizData[currentQuestionIndex];
  return (
    <View style={styles.container}>
      {/* White box containing the quiz question */}
      <View style={styles.whiteBox}>
        {/* Display the question */}
        <Text style={styles.TitleText}>Quiz</Text>
        <Text style={styles.questionText}>Question: {currentQuestion.question}</Text>

        {/* Iterate through options */}
        {currentQuestion.options.map((option, optionIndex) => {
          // Determine the background color of the button based on the selected answer
          let buttonColor = 'white'; // Default color for unselected options

          if (selectedOptionIndex === optionIndex) {
            if (isCorrectAnswerSelected) {
              buttonColor = '#88C572'; // Correct answer selected
            } else {
              buttonColor = '#F36969'; // Wrong answer selected
            }
          }

          return (
            <TouchableOpacity
              key={optionIndex}
              style={[styles.optionButton, { backgroundColor: buttonColor }]}
              onPress={() => handlePress(optionIndex)}
              disabled={isNextButtonVisible} // Disable buttons after a correct answer is selected
            >
              <Text style={styles.optionText}>{option.answer}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Next button, visible only if the correct answer is selected */}
        {isNextButtonVisible && <Button title="Next Question" onPress={handleNextPress} />}

        {/* Try Again Text, visible only if the incorrect answer is selected */}
        {isCorrectAnswerSelected === false && (
          <Text style={styles.responseText}>Wrong, try again!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CDEBC5',
  },
  whiteBox: {
    padding: 20,
    marginBottom: 20,
    marginTop: 70,
    borderRadius: 20, // Border-radius set to 10px
    borderWidth: 4, // Border width set to 4px
    borderColor: 'rgba(126, 163, 167, 0.70)', // Semi-transparent border color
    backgroundColor: '#F7FAF9', // Background color with fallback to white
    height: '80%',
  },
  questionText: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
    color: '#2F5361',
  },
  TitleText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 100,
    color: '#2F5361',
  },
  optionButton: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15, // Border-radius set to 15px
    borderWidth: 3, // Border width set to 3px
    borderColor: '#44686C', // Border color, matching the value from var(--Icon-Dark)
  },
  optionText: {
    fontSize: 20,
    color: '#2F5361',
  },
  responseText: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
