import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

export const PublicRoute = ({
                              isAuthenticated,
                              component: Component,
                              ...rest
                            }) => (
    <Route {...rest} component={(props) => (
        !isAuthenticated ? (
            <Component {...props} />
        ) : (<Redirect to="/dashboard"/>)
    )}/>
);

const mpaStateToProps = state => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mpaStateToProps)(PublicRoute);
