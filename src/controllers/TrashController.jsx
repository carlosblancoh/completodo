import { collection, query, where} from 'firebase/firestore';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { useSnapshotMany } from '../hooks/firebase';
import { useUser } from '../hooks/user';
import Trash from '../pages/Trash';
import { itemSort } from '../utils';

export default function TrashController() {
    const user = useUser();
    const navigate = useNavigate();
    const trashedItemsReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('visibility', '==', 'trashed'));
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_trashedItemsLoading, trashedItemsData, _trashedItemsError] = useSnapshotMany(trashedItemsReference);

    /*function onBack() {
        return navigate('/profile');
    }onBack-1 test*/
    function onBack() {
        return navigate(-1);
    }

    if (trashedItemsData !== undefined) {
        return (
            <Trash
                items = {itemSort(trashedItemsData).map(doc => doc.id)}
                onBack={onBack}
            />
        );
    } else {
        return null;
    }
}
