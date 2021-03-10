import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth.js';

const initialState = {
  login: '',
  password: '',
};

function LoginForm(props) {
  const [state, setState] = useState(initialState)
  const { profile, handleLogin } = useAuth();

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(state.login, state.password);
  }

  if (profile) {
    return null;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="text"
        name="login"
        onChange={handleChange}
        value={state.login}
        placeholder="Username"
      />
      <input
        className="form-control me-2"
        type="password"
        name="password"
        onChange={handleChange}
        value={state.password}
        placeholder="Password"
      />
      <button className="btn btn-outline-success" type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
};

export default LoginForm;
