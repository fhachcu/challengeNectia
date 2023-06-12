import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../Services/api';
import { LoginData } from '../Interfaces/interfaces';
import '../Styles/styles.css';

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
    <div className='bodyColor'>
      <div className="container">
        <div className="row justify-content-center align-content-center vh-100">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header fs-5">
                <h4>Movies login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="username" className='fs-5 mb-1'>Username</label>
                    <input type="text" className="form-control" id="username" value={loginData.username} onChange={(event) => setLoginData({ ...loginData, username: event.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password mb-1" className='fs-5 mb-1'>Password</label>
                    <input type="password" className="form-control" id="password" value={loginData.password} onChange={(event) => setLoginData({ ...loginData, password: event.target.value })} />
                  </div>
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
                  <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn-3d mt-3">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
