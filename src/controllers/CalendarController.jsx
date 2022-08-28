import { addDoc, collection, where, query, doc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { useSnapshotMany, useSnapshotOne } from '../hooks/firebase';
import { useIsLoggedIn, useUser } from '../hooks/user';
import Calendar from '../pages/Calendar';
import { itemSort } from '../utils';


export default function CalendarController() {
    const isLoggedIn = useIsLoggedIn();
    const user = useUser();
    const navigate = useNavigate();
    let {year, month, day} = useParams();
    year = year ?? (new Date(Date.now())).getFullYear();
    month = (month ?? ((new Date(Date.now())).getMonth() + 1)) - 1;
    day = day ?? (new Date(Date.now())).getDate();
    const start = new Date(year, month, day, 0, 0);
    const end = new Date(year, month, day, 23, 59);

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

    const itemsReference = useMemo(
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
    const [_itemsLoading, itemsData, _itemsError] = useSnapshotMany(itemsReference);

    const blocksReference = useMemo(
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
    const [_blocksLoading, blocksData, _blocksError] = useSnapshotMany(blocksReference);

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
            date: new Date(year, month, day),
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

    function onNavigateToProfile() {
        return navigate('/profile');
    }

    function onNavigateToHome() {
        return navigate('/');
    }

    function onNavigateToSearch() {
        return navigate('/search');
    }

    function onDayClick(day, month, year) {
        navigate(`/calendar/${year}/${month + 1}/${day}`);
    }

    let selectedDayString = formatDayDate((new Date(year, month, day)).getTime());

    if (isLoggedIn === false) {
        return (
            <Navigate to = '/login'/>
        );
    } else {
        if (itemsData !== null && blocksData !== null) {
            const filteredData = itemsData.filter(item => {
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
            return <Calendar
                onNewGroup={onNewGroup}
                onNewTask={onNewTask}
                onNewNote={onNewNote}
                onNewBlock={onNewBlock}
                onViewProfile={onNavigateToProfile}
                onViewHome={onNavigateToHome}
                onViewSearch={onNavigateToSearch}
                profilePicture = {imageURL}
                blocks = {blocksData}
                onDayClick = {onDayClick}
                items = {itemSort(filteredData)}
                selectedDayString = {selectedDayString}
            />;
        }
    }

}

function formatDayDate(timestamp) {
    const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ];
    if (timestamp === Infinity) {
        return '';
    }
    const today = new Date(Date.now());
    const date = new Date(timestamp);
    if (today.getFullYear() === date.getFullYear()) {
        if (today.getMonth() === date.getMonth() && today.getDate() === date.getDate()) {
            return 'Hoy, ' + date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
        }
        if (today.getMonth() === date.getMonth() && today.getDate() + 1 === date.getDate()) {
            return 'Mañana, ' + date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
        }
    }
    return date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear() + ' ';
}
