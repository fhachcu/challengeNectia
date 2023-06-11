import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {Login} from '../Containers/Login';
import {Table} from '../Containers/Table';

export const AppRouter = () => {
  
  const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => {
        const isAuthenticated =  localStorage.getItem('token');
        return isAuthenticated ? <Component {...props} /> : <Redirect to="/"/>;
        }
    } />
);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/table" component={Table} />
      </Switch>
    </Router>
  );
};