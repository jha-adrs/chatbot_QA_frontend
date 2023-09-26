import React, {useState} from 'react';
import Context from './context';
const AppContext  = ({ children,value }) => {
    const [category, setCategory] = useState('try');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Context.Provider value={{
            category,
            setCategory,
            isLoggedIn,
            setIsLoggedIn,

        }}>
        {children}
        </Context.Provider>
    )
}
export default AppContext;