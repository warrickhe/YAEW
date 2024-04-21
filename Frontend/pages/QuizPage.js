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
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchQuizData();
  }, [deviceID]);

  // Handle button press
  const handlePress = (optionIndex) => {
    const isCorrect = quizDataOLD[currentQuestionIndex].options[optionIndex].correct;
    setSelectedOptionIndex(optionIndex);
    setIsCorrectAnswerSelected(isCorrect);
    setIsNextButtonVisible(isCorrect);
  };

  // Handle next button press
  const handleNextPress = () => {
    // Randomly select a new question index
    const randomIndex = Math.floor(Math.random() * quizDataOLD.length);
    setCurrentQuestionIndex(randomIndex);
    // Reset the state for the next question
    setSelectedOptionIndex(null);
    setIsCorrectAnswerSelected(null);
    setIsNextButtonVisible(false);
  };

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
          let buttonColor = 'lightgray'; // Default color for unselected options

          if (selectedOptionIndex === optionIndex) {
            if (isCorrectAnswerSelected) {
              buttonColor = 'green'; // Correct answer selected
            } else {
              buttonColor = 'red'; // Wrong answer selected
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
        {isCorrectAnswerSelected === false && <Text>Wrong, try again!</Text>}
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
  },
  TitleText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 100,
  },
  optionButton: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 20,
  },
});
