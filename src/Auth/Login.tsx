import React, { Fragment } from 'react';
import { userContext } from '../Contexts/UserContext';

const Login = () => {

    return (
        <Fragment>
            <userContext.Consumer>
                {({user, login, logout}) => (
                    <Fragment>
                        
                        Hello. current user is { JSON.stringify(user) }

                        <button className="btn btn-primary " onClick={() => login("a@a.a", "bbbbb")}>
                            Click me for magick
                        </button>

                    </Fragment>
                )}
            </userContext.Consumer>
        </Fragment>
    )
}

export default Login