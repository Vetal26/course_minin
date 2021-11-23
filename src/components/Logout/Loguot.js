import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../../store/actions/auth';

const Logout = (props) => {
  const { logout } = props;

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate replace to="/" />;
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
