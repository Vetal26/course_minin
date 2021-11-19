import React, { useState, useEffect, useCallback } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const [state, setState] = useState({
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
  });

  const { id } = useParams();

  const onAnswerClickHandler = (answerId) => {
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      setState({ ...state, answerState: { [answerId]: 'success', results } });

      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setState({ ...state, isFinished: true });
        } else {
          setState({
            ...state,
            activeQuestion: state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      setState({
        ...state,
        answerState: {
          [answerId]: 'error',
          results,
        },
      });
    }
  };

  const isQuizFinished = () => {
    return state.activeQuestion + 1 === state.quiz.length;
  };

  const retryHandler = () => {
    setState({
      ...state,
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(`quizes/${id}.json`);
      const quiz = response.data;

      setState((prev) => {
        return { ...prev, quiz: quiz, loading: false };
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {state.loading ? (
          <Loader />
        ) : state.isFinished ? (
          <FinishedQuiz
            results={state.results}
            quiz={state.quiz}
            onRetry={retryHandler}
          />
        ) : (
          <ActiveQuiz
            answers={state.quiz[state.activeQuestion].answers}
            question={state.quiz[state.activeQuestion].question}
            onAnswerClick={onAnswerClickHandler}
            quizLength={state.quiz.length}
            answerNumber={state.activeQuestion + 1}
            state={state.answerState}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
