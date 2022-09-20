import React from 'react';
import {
  Redirect,
  Route as ReactDOMRouter,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouterProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouterProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { userToken } = useAuth();
  return (
    <ReactDOMRouter
      {...rest}
      render={({ location }) => (isPrivate === !!userToken ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: isPrivate ? '/' : '/home',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default Route;
