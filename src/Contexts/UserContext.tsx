import React from 'react';
import { userContextType } from '../Types/UserTypes';


const userContext = React.createContext<userContextType>({
        user: null,
        onLogin: async (userLoginData: {user: {email: string, password: string}}): Promise<boolean> => {return false},
        onLogout: () => {}
    }); 

export { userContext }