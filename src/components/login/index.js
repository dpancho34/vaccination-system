import React, { useEffect, useContext, useState } from 'react';
import TextFieldWrapper from '../wrappers/TextFieldWrapper';
import { LoginFormStyled, ButtonSubmitStyled } from './styles/loginStyles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../../contexts/authContext';

const LoginForm = () => {
    const [dispatch, state] = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = ({ target }) => {
        setEmail(target.value);
    }

    const handlePassword = ({ target }) => {
        setPassword(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'LOGIN',
            payload: {
                email, password
            }
        });
    }

  return (
    <>
      <LoginFormStyled onSubmit={handleSubmit}>
          <TextFieldWrapper
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmail}
          />
          <TextFieldWrapper
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            autoFocus
            type="password"
            onChange={handlePassword}
          />
          <ButtonSubmitStyled
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            <LockOutlinedIcon /> Log In
          </ButtonSubmitStyled>
        </LoginFormStyled>
    </>
  );
}

export default LoginForm;
