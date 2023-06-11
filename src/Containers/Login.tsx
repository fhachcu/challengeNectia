import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {api} from '../Services/api';
import {LoginData} from '../Interfaces/interfaces';

export const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post('/login', loginData);
      const newToken = await response.data.token;
      localStorage.setItem('token', newToken);
      history.push('/table')
    } catch (error) {
      console.error(error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" value={loginData.username} onChange={(event) => setLoginData({ ...loginData, username: event.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" value={loginData.password} onChange={(event) => setLoginData({ ...loginData, password: event.target.value })} />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
