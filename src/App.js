import React from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Route, Routes } from 'react-router-dom';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';

function App() {
  let routes = (
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="quiz-creator" element={<QuizCreator />} />
      <Route path="quiz/:id" element={<Quiz />} />
      <Route path="/" element={<QuizList />} />
    </Routes>
  );

  return <Layout>{routes}</Layout>;
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(App);
