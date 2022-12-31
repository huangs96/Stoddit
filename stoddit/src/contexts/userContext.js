import { createContext, useContext, useState } from 'react';

//providing global context for logged in user
const UserContext = createContext(null);

export default UserContext;