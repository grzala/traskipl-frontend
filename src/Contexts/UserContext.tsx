import React from 'react';
import { userContextType } from '../Types/UserTypes';


const userContext = React.createContext<userContextType>({
        user: null,
        onLogin: (userLoginData: {user: {email: string, password: string}}) => {},
        onLogout: () => {}
    }); 

export { userContext }