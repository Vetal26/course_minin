import React, { useEffect } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz';

const Quiz = (props) => {
  const { id } = useParams();
  const { fetchQuizById, quizAnswerClick, retryQuiz } = props;

  useEffect(() => {
    fetchQuizById(id);
  }, [fetchQuizById, id]);

  useEffect(() => {
    retryQuiz();
  }, [retryQuiz]);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {props.loading || !props.quiz ? (
          <Loader />
        ) : props.isFinished ? (
          <FinishedQuiz
            results={props.results}
            quiz={props.quiz}
            onRetry={retryQuiz}
          />
        ) : (
          <ActiveQuiz
            answers={props.quiz[props.activeQuestion].answers}
            question={props.quiz[props.activeQuestion].question}
            onAnswerClick={quizAnswerClick}
            quizLength={props.quiz.length}
            answerNumber={props.activeQuestion + 1}
            state={props.answerState}
          />
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
