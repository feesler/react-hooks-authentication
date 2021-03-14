import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import useAuth from '../../hooks/useAuth.js';

const initialState = {
  login: '',
  password: '',
  validated: false,
};

const initialValidation = {
  login: true,
  password: true,
};

function LoginForm(props) {
  const [state, setState] = useState(initialState);
  const [validation, setValidation] = useState(initialValidation);
  const { profile, error, logIn } = useAuth();

  const handleChange = (e) => {
    setValidation(initialValidation);
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      validated: false,
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

    setState((prev) => ({
      ...prev,
      validated: true,
    }));

    logIn(state.login, state.password);
  }

  if (profile) {
    return null;
  }

  return (
    <div className="col">
      <form
        className={classNames('login-form', { 'is-invalid': error && state.validated })}
        onSubmit={handleSubmit}
      >
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
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

LoginForm.propTypes = {
};

export default LoginForm;
