import React, { useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import { Route, Routes, Navigate } from 'react-router-dom';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Auth from './containers/Auth/Auth';
import QuizList from './containers/QuizList/QuizList';
import { connect } from 'react-redux';
import Logout from './components/Logout/Loguot';
import { autoLogin } from './store/actions/auth';

function App(props) {
  const { autoLogin } = props;
  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  let routes = (
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="quiz/:id" element={<Quiz />} />
      <Route path="/" element={<QuizList />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (props.isAuthenticated) {
    routes = (
      <Routes>
        <Route path="quiz-creator" element={<QuizCreator />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<QuizList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return <Layout>{routes}</Layout>;
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
