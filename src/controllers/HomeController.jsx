import { addDoc, collection, where, query, doc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { useSnapshotMany, useSnapshotOne } from '../hooks/firebase';
import { useIsLoggedIn, useUser } from '../hooks/user';
import Home from '../pages/Home';
import { itemSort } from '../utils';


export default function HomeController() {
    const isLoggedIn = useIsLoggedIn();
    const user = useUser();
    const navigate = useNavigate();

    const itemsReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('parent', '==', null), where('visibility', 'in', ['normal', 'pinned']));
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [itemsLoading, itemsData, _itemsError] = useSnapshotMany(itemsReference);

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
    const [_loading, userData, _error] = useSnapshotOne(reference);

    const [imageURL, setImageURL] = useState(undefined);
    useEffect(
        async () => {
            if (userData) {
                const pathReference = ref(storage, userData.profilePicture);
                const URL = await getDownloadURL(pathReference);
                setImageURL(URL);
            } else {
                setImageURL(undefined);
            }
        },
        [userData],
    );

    const archivedChildrenReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('parent', '==', null), where('visibility', '==', 'archived'));
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_archivedChildrenLoading, archivedChildrenData, _archivedChildrenError] = useSnapshotMany(archivedChildrenReference);


    const allItemsReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return items;
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_allItemsLoading, allItemsData, _allItemsError] = useSnapshotMany(allItemsReference);

    async function onNewTask() {
        const items = collection(db, 'users', user.uid, 'items');
        const doc = await addDoc(items, {
            children: [],
            completed: false,
            completionDate : null,
            creationDate: new Date(Date.now()),
            deadline: null,
            difficulty: 0,
            duration: 0,
            group: null,
            hasDuration: false,
            isPaused: true,
            timerStartTime: null,
            location: '',
            parent: null,
            priority: 0,
            scheduledDate: null,
            text: '',
            title: '',
            type: 'task',
            visibility: 'normal',
        });
        navigate('/task/'+ doc.id);
    }

    async function onNewGroup() {
        const items = collection(db, 'users', user.uid, 'items');
        const doc = await addDoc(items, {
            children: [],
            color: '#65C582',
            deadline: null,
            group: null,
            parent: null,
            pendingTasks: 0,
            subgroups: 0,
            notes: 0,
            title: '',
            type: 'group',
            visibility: 'normal',
        });
        navigate('/group/'+ doc.id);
    }

    async function onNewNote() {
        const items = collection(db, 'users', user.uid, 'items');
        const doc = await addDoc(items, {
            creationDate: new Date(Date.now()),
            group: null,
            location: '',
            parent: null,
            priority: 0,
            scheduledDate: null,
            text: '',
            title: '',
            type: 'note',
            visibility: 'normal',
        });
        navigate('/note/'+ doc.id);
    }

    async function onNewBlock() {
        const items = collection(db, 'users', user.uid, 'items');
        const doc = await addDoc(items, {
            completable: false,
            completed: false,
            completionDate : null,
            creationDate: new Date(Date.now()),
            date: new Date(Date.now()),
            duration: 3600,
            group: null,
            color: '#65C582',
            location: '',
            text: '',
            title: '',
            type: 'block',
        });
        navigate('/time-block/'+ doc.id);
    }

    function onNavigateToArchive() {
        return navigate('/archive');
    }

    function onNavigateToProfile() {
        return navigate('/profile');
    }

    function onNavigateToCalendar() {
        return navigate('/calendar');
    }

    function onNavigateToSearch() {
        return navigate('/search');
    }

    const today = new Date(Date.now());
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0);
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59);

    if (isLoggedIn === false) {
        return (
            <Navigate to = '/login'/>
        );
    } else {
        if (itemsData !== null && allItemsData !== null) {
            const filteredData = allItemsData.filter(item => {
                switch(item.data.type) {
                case 'block':
                    return start.getTime() <= item.data.date.toDate().getTime() && end.getTime() >= item.data.date.toDate().getTime();
                case 'group':
                    return start.getTime() <= item.data.deadline?.toDate().getTime() && end.getTime() >= item.data.deadline?.toDate().getTime();
                case 'task':
                case 'note':
                    return ((start.getTime() <= item.data.deadline?.toDate().getTime() && end.getTime() >= item.data.deadline?.toDate().getTime()) || (start.getTime() <= item.data.scheduledDate?.toDate().getTime() && end.getTime() >= item.data.scheduledDate?.toDate().getTime()));
                default:
                    return false;
                }
            });
            return <Home
                items = {(isLoggedIn && !itemsLoading) ? itemSort(itemsData).map(doc => doc.id) : undefined}
                todayItems = {itemSort(filteredData)}
                hasArchivedItems={archivedChildrenData?.length !== 0}
                onNewGroup={onNewGroup}
                onNewTask={onNewTask}
                onNewNote={onNewNote}
                onNewBlock={onNewBlock}
                onViewArchive={onNavigateToArchive}
                onViewProfile={onNavigateToProfile}
                onViewCalendar={onNavigateToCalendar}
                onViewSearch={onNavigateToSearch}
                profilePicture = {imageURL}
            />;
        }
    }

}
