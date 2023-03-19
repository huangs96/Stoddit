import { createContext, useContext, useState } from 'react';

//providing global context for logged in user
const UserContext = createContext(null);

//image extraction
const imgExtract = (allUsers) => {
  allUsers.map(user => {
    
  })
}

export {
  UserContext
}