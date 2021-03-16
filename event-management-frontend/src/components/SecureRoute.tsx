import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import { UserRole } from '../model/UserRole';

interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export class SecureRoute extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      isAdmin: false,
    };
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.setState({
          isLoading: false,
          isAuthenticated: true,
          isAdmin: user.signInUserSession.accessToken.payload['cognito:groups']?.includes(
            UserRole.ROLE_ADMIN.toString()
          ),
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isAuthenticated: false,
          isAdmin: false,
        });
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          !this.state.isAuthenticated ? (
            this.state.isLoading ? (
              <CircularProgress />
            ) : (
              <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
            )
          ) : (this.props.admin && this.state.isAdmin) || (!this.props.admin && !this.state.isAdmin) ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
          )
        }
      />
    );
  }
}
