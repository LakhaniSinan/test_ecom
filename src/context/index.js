import React, { createContext ,useState} from 'react';
export const AppContext = createContext();

const AppProvider = props => {

    const [user, setUser] = useState(null)

    return (
        <>
            <AppContext.Provider
                value={{
                    user,
                    setUser,
                }}
            >
                {props.children}
            </AppContext.Provider>
        </>
    );
};

export default AppProvider