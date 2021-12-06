import React from 'react';
import { userContextType } from '../Types/UserTypes';


const userContext = React.createContext<userContextType>({
        user: null,
        login: (email: string, password: string) => {},
        logout: () => {}
    }); 

export { userContext }