import { doc } from 'firebase/firestore';
import { useContext, useMemo } from 'react';
import { UserContext } from '../contexts/user-context';
import { db } from '../firebase';
import { useSnapshotOne } from './firebase';

export function useUser() {
    const userContext = useContext(UserContext);
    return userContext?.user;
}

export function useSetUser() {
    const {setUser} = useContext(UserContext);
    return setUser;
}

export function useIsLoggedIn() {
    const {loading, user} = useContext(UserContext);
    if (loading) {
        return undefined;
    } else {
        return user !== undefined;
    }
}

export function useUserData() {
    const user = useUser();
    const reference = useMemo(
        () => {
            if (user !== undefined) {
                return doc(db, 'users', user.uid);
            } else {
                return undefined;
            }
        },
        [user],
    );
    return useSnapshotOne(reference);
}
