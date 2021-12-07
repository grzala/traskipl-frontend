import React from 'react';
import { userContextType } from '../Types/UserTypes';


const userContext = React.createContext<userContextType>({
        user: null,
        onLogin: (email: string, password: string) => {},
        onLogout: () => {}
    }); 

export { userContext }