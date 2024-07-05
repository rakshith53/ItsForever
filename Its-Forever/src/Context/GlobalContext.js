import React, {createContext, useState} from 'react'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [globalState, setGlobalState] = useState({
        id: null,
        userType: "guest"
    });

    return(
        <GlobalContext.Provider value = {{globalState, setGlobalState}} >
            {children}
        </GlobalContext.Provider>
    )
}