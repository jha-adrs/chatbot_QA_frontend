import React,{ createContext } from 'react';

const Context = createContext({
    category: 'try',
    isLoggedIn: false,
});

export default Context;