import React from 'react';
import { currentUserType, User } from '../Types/UserTypes';

const sampleUser: User = {
    first_name: "bayo",
    last_name: "yayo",
    email: "bayoyayo@yayo.yo"
  }

const userContext = React.createContext<{user: currentUserType}>({user: sampleUser});

export { userContext };