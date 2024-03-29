import { createContext, useContext, useState } from 'react';

//providing global context for logged in user
const UserContext = createContext(null);

//image extraction
const imgExtract = (allUsers) => {
  const userImgData = {};
  allUsers.map(user => {
    if (user.contact_img !== null) {
      userImgData[user.username] = user.imgUrl;
    };
  });
  return userImgData;
};

export {
  UserContext,
  imgExtract
}