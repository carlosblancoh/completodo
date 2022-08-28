import { collection, doc, query, where} from 'firebase/firestore';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useSnapshotMany, useSnapshotOne } from '../hooks/firebase';
import { useUser } from '../hooks/user';
import Archive from '../pages/Archive';
import { itemSort } from '../utils';

export default function ArchiveController() {
    const { id } = useParams();
    const user = useUser();
    const navigate = useNavigate();
    const reference = useMemo(
        () => {
            if (user !== undefined && id !== undefined) {
                return doc(db, 'users', user.uid, 'items', id);
            } else {
                return undefined;
            }
        },
        [user, id],
    );
    const [_loading, _data, _error] = useSnapshotOne(reference);
    const archivedItemsReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('parent', '==', id ?? null), where('visibility', '==', 'archived'));
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_archivedItemsLoading, archivedItemsData, _archivedItemsError] = useSnapshotMany(archivedItemsReference);

    /*function onBack() {
        if (id === undefined) {
            return navigate('/');
        } else {
            return navigate('/' + data.type + '/' + id);

        }
    }onBack-1 test*/
    function onBack() {
        return navigate(-1);
    }

    if (archivedItemsData !== undefined) {
        return (
            <Archive
                items = {itemSort(archivedItemsData).map(doc => doc.id)}
                onBack={onBack}
            />
        );
    } else {
        return (
            <Archive
                onBack={onBack}
            />
        );
    }
}
