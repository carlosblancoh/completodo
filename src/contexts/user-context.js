import { onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext(undefined);

export function UserProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(auth.currentUser || undefined);
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // User is signed out
                setUser(undefined);
            }
            setLoading(false);
        });
    }, []);
    return (
        <UserContext.Provider
            value={{loading:loading, user:user, setUser:setUser}}
        >
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

UserProvider.defaultProps = {
    children: undefined,
};
