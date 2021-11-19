import React, { useState, useEffect, useCallback } from 'react';
import classes from './QuizList.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

const QuizList = () => {
  const [state, setState] = useState({
    quizes: [],
    loading: true,
  });

  function renderQuizes() {
    return state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  const getQuizList = useCallback(async () => {
    try {
      const response = await axios.get('quizes.json');

      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({ id: key, name: `Тест №${index + 1}` });
      });

      setState((prev) => {
        return { ...prev, quizes, loading: false };
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getQuizList();
  }, [getQuizList]);

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {state.loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
