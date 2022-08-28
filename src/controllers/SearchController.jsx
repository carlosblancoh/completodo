
import { collection, query, where } from 'firebase/firestore';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { useSnapshotMany } from '../hooks/firebase';
import { useIsLoggedIn, useUser } from '../hooks/user';
import Search from '../pages/Search';
import { itemSort } from '../utils';


export default function SearchController() {
    const isLoggedIn = useIsLoggedIn();
    const user = useUser();
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');

    const itemsReference1 = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('visibility', 'in', ['normal', 'pinned', 'archived']));
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_itemsLoading1, itemsData1, _itemsError1] = useSnapshotMany(itemsReference1);

    const itemsReference2 = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('type', '==', 'block'));
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_itemsLoading2, itemsData2, _itemsError2] = useSnapshotMany(itemsReference2);

    const itemsData = [...itemsData1, ...itemsData2];

    const filteredItems = useMemo(() => {
        return itemSort(itemsData.filter(item => {
            if (searchString === '') {
                return false;
            }
            if (item.data.title.toLowerCase().includes(searchString.toLowerCase())) {
                return true;
            }
            if (item.data.text && item.data.text.toLowerCase().includes(searchString.toLowerCase())) {
                return true;
            }
            if (item.data.location && item.data.location.toLowerCase().includes(searchString.toLowerCase())) {
                return true;
            }
            return false;
        }));
    }, [itemsData, searchString]);

    function onSearchStringChange(value) {
        setSearchString(value);
    }

    /*function onBack() {
        return navigate('/');
    }onBack-1 test*/
    function onBack() {
        return navigate(-1);
    }

    if (isLoggedIn === false) {
        return (
            <Navigate to = '/login'/>
        );
    } else {
        if (filteredItems !== null) {
            return <Search
                items = {filteredItems}
                searchString = {searchString}
                onSearchStringChange = {onSearchStringChange}
                onBack={onBack}
            />;
        } else {
            return null;
        }
    }

}
