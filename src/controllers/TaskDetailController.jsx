import { addDoc, collection, deleteDoc, doc, getDocs, query, runTransaction, updateDoc, where } from 'firebase/firestore';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useSnapshotOne, useSnapshotMany } from '../hooks/firebase';
import useBufferChanges from '../hooks/useBufferChanges';
import { useUser } from '../hooks/user';
import TaskDetail from '../pages/TaskDetail';
import { groupsDataOrganize, itemSort } from '../utils';

export default function TaskDetailController() {
    const { id } = useParams();
    const user = useUser();
    const navigate = useNavigate();
    const reference = useMemo(
        () => {
            if (user !== undefined) {
                return doc(db, 'users', user.uid, 'items', id);
            } else {
                return undefined;
            }
        },
        [user, id],
    );
    const [_loading, data, _error] = useSnapshotOne(reference);

    const userReference = useMemo(
        () => {
            if (user !== undefined) {
                return doc(db, 'users', user.uid);
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_userLoading, userData, _userError] = useSnapshotOne(userReference);


    const parentReference = useMemo(
        () => {
            const parentId = data?.parent;
            if (user !== undefined && parentId) {
                return doc(db, 'users', user.uid, 'items', parentId);
            } else {
                return undefined;
            }
        },
        [user, data],
    );
    const [_parentLoading, parentData, _parentError] = useSnapshotOne(parentReference);

    const groupsReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('type', '==', 'group'), where('visibility', 'in', ['normal', 'pinned']));
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_groupsLoading, groupsData, _groupsError] = useSnapshotMany(groupsReference);

    const childrenReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('parent', '==', id), where('visibility', 'in', ['normal', 'pinned']));
            } else {
                return undefined;
            }
        },
        [user, id],
    );
    const [_childrenLoading, childrenData, _childrenError] = useSnapshotMany(childrenReference);

    const archivedChildrenReference = useMemo(
        () => {
            if (user !== undefined) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('parent', '==', id), where('visibility', '==', 'archived'));
            } else {
                return undefined;
            }
        },
        [user, id],
    );
    const [_archivedChildrenLoading, archivedChildrenData, _archivedChildrenError] = useSnapshotMany(archivedChildrenReference);

    const onChange = useCallback(async (value) => {
        if (value != undefined) {
            await runTransaction(db, async tx => {
                const task = await tx.get(reference);
                let oldParentRef = null;
                let oldParent = null;
                let newParentRef = null;
                let newParent = null;

                if (task.data().parent !== null) {
                    oldParentRef = doc(db, 'users', user.uid, 'items', task.data().parent);
                    oldParent = await tx.get(oldParentRef);
                }
                if (value.parent !== null) {
                    newParentRef = doc(db, 'users', user.uid, 'items', value.parent);
                    newParent = await tx.get(newParentRef);
                }

                if ((task.data().visibility === 'normal' || task.data().visibility === 'pinned') && (
                    (task.data().visibility !== value.visibility && (value.visibility === 'trashed' || value.visibility === 'archived')) ||
                    (task.data().parent !== value.parent)
                )) {
                    if (task.data().parent !== null) {
                        const children = oldParent.data().children;
                        const newChildren = children.filter(child => child !== id);
                        await tx.update(oldParentRef, {
                            children: newChildren,
                            pendingTasks: (oldParent.data().pendingTasks - 1),
                        });
                    }
                }

                if ((value.visibility === 'normal' || value.visibility === 'pinned') && (
                    (task.data().visibility !== value.visibility && (task.data().visibility === 'trashed' || task.data().visibility === 'archived')) ||
                    (task.data().parent !== value.parent)
                )) {
                    if (value.parent !== null) {
                        const children = newParent.data().children;
                        const newChildren = [...children, id];
                        await tx.update(newParentRef, {
                            children: newChildren,
                            pendingTasks: (newParent.data().pendingTasks + 1),
                        });
                    }
                }
                tx.set(reference, value);
            });
        }
    }, [reference]);

    const [bufferedData, bufferedOnChange] = useBufferChanges(data, onChange);

    function onCompleted() {
        const end = new Date(Date.now());
        if (data.isPaused) {
            onChange({
                ...data,
                completed : true,
                completionDate : new Date(Date.now()),
                visibility: userData.autoArchive?'archived':data.visibility,
            });
        } else {
            onChange({
                ...data,
                completed : true,
                completionDate : new Date(Date.now()),
                visibility: userData.autoArchive?'archived':data.visibility,
                duration : data.duration + Math.floor((end - data.timerStartTime.toDate())/1000),
                isPaused : true,
            });
        }
    }

    function onUncompleted() {
        onChange({
            ...data,
            completed : false,
            completionDate : null,
            visibility: userData.autoArchive?'normal':data.visibility,
        });
    }

    async function onDelete() {
        const items = collection(db, 'users', user.uid, 'items');
        async function deleteChildren(id) {
            const reference = query(items, where('parent', '==', id));
            const docs = await getDocs(reference);
            if (docs.docs !== []){
                await Promise.all(docs.docs.map(element => deleteChildren(element.id)));
            }
            const self = doc(items, id);
            await deleteDoc(self);
        }
        await deleteChildren(id);
        onBack();
    }

    function onNavigateToArchive() {
        return navigate('archive');
    }

    /*function onBack() {
        if (data?.visibility === 'trashed') {
            return navigate('/trash');
        }
        if (data?.parent === null || data?.parent === undefined) {
            return navigate('/');
        } else {
            return navigate('/' + parentData?.type + '/'+ data?.parent);
        }
    }onBack-1 test*/
    function onBack() {
        return navigate(-1);
    }

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
            group: data?.group,
            hasDuration: false,
            isPaused: true,
            timerStartTime: null,
            location: '',
            parent: id,
            priority: 0,
            scheduledDate: null,
            text: '',
            title: '',
            type: 'subtask',
            visibility: 'normal',
        });
        updateDoc(reference, {
            children : [...data.children, doc.id],
        });
    }

    function onTimerPlay(start) {
        updateDoc(reference, {
            timerStartTime : start,
            isPaused : false,
        });
    }

    function onTimerPause(end) {
        updateDoc(reference, {
            duration : data.duration + Math.floor((end - data.timerStartTime.toDate())/1000),
            isPaused : true,
        });
    }

    if (bufferedData !== undefined && (bufferedData.parent == null || parentData !== undefined)) {
        return (
            <TaskDetail
                id={id}
                value={bufferedData}
                subItems={itemSort(childrenData)}
                hasArchivedItems={archivedChildrenData?.length !== 0}
                parent={parentData}
                parentColor={groupsData.find(group => group.id === bufferedData.group)?.data?.color ?? '#65C582'}
                onCompleted={onCompleted}
                onUncompleted={onUncompleted}
                onBack={onBack}
                onChange={bufferedOnChange}
                groupsList={groupsDataOrganize(groupsData, null)}
                onNewTask={onNewTask}
                onDelete={onDelete}
                onViewArchive={onNavigateToArchive}
                onTimerPlay={onTimerPlay}
                onTimerPause={onTimerPause}
            />
        );
    } else {
        return null;
    }

}

TaskDetailController.propTypes = {
};

TaskDetailController.defaultProps = {

};
