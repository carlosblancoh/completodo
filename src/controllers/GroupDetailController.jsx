import { collection, doc, query, where, runTransaction, deleteDoc, getDocs, addDoc } from 'firebase/firestore';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useSnapshotOne, useSnapshotMany } from '../hooks/firebase';
import { useUser } from '../hooks/user';
import GroupDetail from '../pages/GroupDetail';
import { groupsDataOrganize, itemSort} from '../utils';

export default function GroupDetailController() {
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
    const [_parentLoading, _parentData, _parentError] = useSnapshotOne(parentReference);

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
                const group = await tx.get(reference);
                if ((group.data().visibility === 'normal' || group.data().visibility === 'pinned') && (
                    (group.data().visibility !== value.visibility && (value.visibility === 'trashed' || value.visibility === 'archived')) ||
                    (group.data().parent !== value.parent)
                )) {
                    if (group.data().parent !== null) {
                        const parentRef = doc(db, 'users', user.uid, 'items', group.data().parent);
                        const parent = await tx.get(parentRef);
                        const children = parent.data().children;
                        const newChildren = children.filter(child => child !== id);
                        await tx.update(parentRef, {
                            children: newChildren,
                            subgroups: (parent.data().subgroups - 1),
                        });
                    }
                }

                if ((value.visibility === 'normal' || value.visibility === 'pinned') && (
                    (group.data().visibility !== value.visibility && (group.data().visibility === 'trashed' || group.data().visibility === 'archived')) ||
                    (group.data().parent !== value.parent)
                )) {
                    if (value.parent !== null) {
                        const parentRef = doc(db, 'users', user.uid, 'items', value.parent);
                        const parent = await tx.get(parentRef);
                        const children = parent.data().children;
                        const newChildren = [...children, id];
                        await tx.update(parentRef, {
                            children: newChildren,
                            subgroups: (parent.data().subgroups + 1),
                        });
                    }
                }
                tx.set(reference, value);
            });
        }
    }, [reference]);

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
        let newTask;
        await runTransaction(db, async tx => {
            const items = collection(db, 'users', user.uid, 'items');
            const ref = doc(db, 'users', user.uid, 'items', id);
            newTask = doc(items);
            const data = await tx.get(ref);
            await tx.set(newTask, {
                children: [],
                completed: false,
                completionDate : null,
                creationDate: new Date(Date.now()),
                deadline: null,
                difficulty: 0,
                duration: 0,
                group: id,
                hasDuration: false,
                isPaused: true,
                timerStartTime: null,
                location: '',
                parent: id,
                priority: 0,
                scheduledDate: null,
                text: '',
                title: '',
                type: 'task',
                visibility: 'normal',
            });
            await tx.update(ref, {
                children : [...data.data().children, newTask.id],
                pendingTasks : (data.data().pendingTasks + 1),
            });
        });
    }

    async function onNewGroup() {
        let newGroup;
        await runTransaction(db, async tx => {
            const items = collection(db, 'users', user.uid, 'items');
            const ref = doc(db, 'users', user.uid, 'items', id);
            newGroup = doc(items);
            const data = await tx.get(ref);
            await tx.set(newGroup, {
                children: [],
                color: data.data().color ?? '#65C582',
                deadline: null,
                group: id,
                parent: id,
                pendingTasks: 0,
                subgroups: 0,
                notes: 0,
                title: '',
                type: 'group',
                visibility: 'normal',
            });
            await tx.update(ref, {
                children : [...data.data().children, newGroup.id],
                subgroups: (data.data().subgroups + 1),
            });
        });
        navigate('/group/'+ newGroup.id);
    }

    async function onNewNote() {
        let newNote;
        await runTransaction(db, async tx => {
            const items = collection(db, 'users', user.uid, 'items');
            const ref = doc(db, 'users', user.uid, 'items', id);
            newNote = doc(items);
            const data = await tx.get(ref);
            await tx.set(newNote, {
                creationDate: new Date(Date.now()),
                group: id,
                location: '',
                parent: id,
                priority: 0,
                scheduledDate: null,
                text: '',
                title: '',
                type: 'note',
                visibility: 'normal',
            });
            await tx.update(ref, {
                children : [...data.data().children, newNote.id],
                notes : (data.data().notes + 1),
            });
        });
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
            group: id,
            color: '#65C582',
            location: '',
            text: '',
            title: '',
            type: 'block',
        });
        navigate('/time-block/'+ doc.id);
    }

    function computeStats() {
        const unarchivedItems = childrenData.length;
        let unarchivedTasks = 0;
        let unarchivedNotes = 0;
        let unarchivedGroups = 0;
        const archivedItems = archivedChildrenData.length;
        let completedTasks = 0;
        let uncompletedTasks = 0;
        let tasksCompletedOnTime = 0;
        let tasksCompletedLate = 0;
        let overdueTasks = 0;
        let tasksOnTime = 0;
        let totalWorkingTime = 0;
        let totalWorkingTimeInCompletedTasks = 0;
        let completedTimedTasks = 0;

        const today = new Date(Date.now());

        for (const item of childrenData) {
            switch(item.data.type) {
            case 'task':
                unarchivedTasks++;
                if (item.data.completed) {
                    completedTasks++;
                    if (item.data.deadline === null || item.data.deadline.toDate() <= item.data.completionDate.toDate()) {
                        tasksCompletedOnTime++;
                    } else {
                        tasksCompletedLate++;
                    }
                    if (item.data.hasDuration) {
                        totalWorkingTimeInCompletedTasks += item.data.duration;
                        completedTimedTasks++;
                    }
                } else {
                    uncompletedTasks++;
                    if (item.data.deadline === null || item.data.deadline.toDate() >= today) {
                        tasksOnTime++;
                    } else {
                        overdueTasks++;
                    }
                }
                if (item.data.hasDuration) {
                    totalWorkingTime += item.data.duration;
                }
                break;
            case 'group':
                unarchivedGroups++;
                break;
            case 'note':
                unarchivedNotes++;
                break;
            default:
                console.error(item.data.type);
            }
        }

        for (const item of archivedChildrenData) {
            if (item.data.type === 'task') {
                if (item.data.completed) {
                    completedTasks++;
                    if (item.data.deadline === null || item.data.deadline.toDate() <= item.data.completionDate.toDate()) {
                        tasksCompletedOnTime++;
                    } else {
                        tasksCompletedLate++;
                    }
                    if (item.data.hasDuration) {
                        totalWorkingTimeInCompletedTasks += item.data.duration;
                        completedTimedTasks++;
                    }
                } else {
                    uncompletedTasks++;
                    if (item.data.deadline === null || item.data.deadline.toDate() <= today) {
                        tasksOnTime++;
                    } else {
                        overdueTasks++;
                    }
                }
                if (item.data.hasDuration) {
                    totalWorkingTime += item.data.duration;
                }
            }
        }

        return {
            color: (data.color),
            notes: unarchivedNotes,
            tasks: unarchivedTasks,
            groups: unarchivedGroups,
            notesP: (unarchivedNotes/(unarchivedItems)),
            tasksP: (unarchivedTasks/(unarchivedItems)),
            groupsP: (unarchivedGroups/(unarchivedItems)),
            completedTasks: completedTasks,
            uncompletedTasks: uncompletedTasks,
            totalTasksCreated: (completedTasks + uncompletedTasks),
            completedTasksP:  (completedTasks/(completedTasks+uncompletedTasks)),
            tasksCompletedOnTime: (tasksCompletedOnTime),
            tasksCompletedOnTimeP: (tasksCompletedOnTime/completedTasks),
            tasksCompletedLate: (tasksCompletedLate/completedTasks),
            overdueTasks: overdueTasks,
            overdueTasksP: (overdueTasks/uncompletedTasks),
            tasksOnTime: (tasksOnTime/uncompletedTasks),
            totalWorkingTime: totalWorkingTime,
            completedTimedTasks: completedTimedTasks,
            meanTaskTime: (totalWorkingTimeInCompletedTasks/completedTimedTasks),
            archivedItems: archivedItems,
            totalItems: (archivedItems + unarchivedItems),
            archived: (archivedItems/(archivedItems + unarchivedItems)),
        };
    }

    if (data !== undefined) {
        return (
            <GroupDetail
                value={data}
                subItems={itemSort(childrenData)}
                hasArchivedItems={archivedChildrenData?.length !== 0}
                onBack={onBack}
                groupsList={groupsDataOrganize(groupsData, id)}
                onNewTask={onNewTask}
                onNewGroup={onNewGroup}
                onNewNote={onNewNote}
                onNewBlock={onNewBlock}
                onChange={onChange}
                onDelete={onDelete}
                onViewArchive={onNavigateToArchive}
                stats={computeStats()}
            />
        );
    } else {
        return null;
    }

}

GroupDetailController.propTypes = {
};

GroupDetailController.defaultProps = {

};
