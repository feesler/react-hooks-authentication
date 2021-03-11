import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import useAuth from '../../hooks/useAuth.js';

const initialState = {
  login: '',
  password: '',
};

const initialValidation = {
  login: true,
  password: true,
};

function LoginForm(props) {
  const [state, setState] = useState(initialState);
  const [validation, setValidation] = useState(initialValidation);
  const { profile, logIn } = useAuth();

  const handleChange = (e) => {
    setValidation(initialValidation);
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.login.length) {
      setValidation((prev) => ({ ...prev, login: false }));
      return;
    }
    if (!state.password.length) {
      setValidation((prev) => ({ ...prev, password: false }));
      return;
    }

    logIn(state.login, state.password);
  }

  if (profile) {
    return null;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="col me-2">
        <input
          className={classNames('form-control', { 'is-invalid': !validation.login })}
          type="text"
          name="login"
          onChange={handleChange}
          value={state.login}
          placeholder="Username"
        />
        <div className="invalid-feedback">Input login</div>
      </div>
      <div className="col me-2">
        <input
          className={classNames('form-control', { 'is-invalid': !validation.password })}
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
          placeholder="Password"
        />
        <div className="invalid-feedback">Input password</div>
      </div>
      <button className="btn btn-outline-success" type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
};

export default LoginForm;
