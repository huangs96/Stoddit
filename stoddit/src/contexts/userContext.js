import { createContext, useEffect } from 'react';

//providing global context for logged in user
const UserContext = createContext(null);

export default UserContext;