import { doc, runTransaction, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { useSnapshotOne } from '../hooks/firebase';
import useBufferChanges from '../hooks/useBufferChanges';
import { useUser } from '../hooks/user';
import Task from '../components/Task';

export default function TaskController({id, stackable}) {
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
            const parentId = data?.group;
            if (user !== undefined && parentId) {
                return doc(db, 'users', user.uid, 'items', parentId);
            } else {
                return undefined;
            }
        },
        [user, data],
    );
    const [_parentLoading, parentData, _parentError] = useSnapshotOne(parentReference);

    const onChange = useCallback(async (value) => {
        if (value != undefined) {
            await runTransaction(db, async tx => {
                const task = await tx.get(reference);
                let parentRef = null;
                let parent = null;

                if (task.data().parent !== null) {
                    parentRef = doc(db, 'users', user.uid, 'items', task.data().parent);
                    parent = await tx.get(parentRef);
                }

                if ((task.data().visibility === 'normal' || task.data().visibility === 'pinned') && (
                    (task.data().visibility !== value.visibility && (value.visibility === 'trashed' || value.visibility === 'archived'))
                )) {
                    if (task.data().parent !== null) {
                        const children = parent.data().children;
                        const newChildren = children.filter(child => child !== id);
                        await tx.update(parentRef, {
                            children: newChildren,
                            pendingTasks: (parent.data().pendingTasks - 1),
                        });
                    }
                }

                if ((value.visibility === 'normal' || value.visibility === 'pinned') && (
                    (task.data().visibility !== value.visibility && (task.data().visibility === 'trashed' || task.data().visibility === 'archived'))
                )) {
                    if (task.data().parent !== null) {
                        const children = parent.data().children;
                        const newChildren = [...children, id];
                        await tx.update(parentRef, {
                            children: newChildren,
                            pendingTasks: (parent.data().pendingTasks + 1),
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
            updateDoc(reference, {
                completed : true,
                completionDate : new Date(Date.now()),
            });
        } else {
            updateDoc(reference, {
                completed : true,
                completionDate : new Date(Date.now()),
                duration : data.duration + Math.floor((end - data.timerStartTime.toDate())/1000),
                isPaused : true,
            });
        }
        setTimeout(() => {
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
        }, 1500);

    }

    function onUncompleted() {
        onChange({
            ...data,
            completed : false,
            completionDate : null,
            visibility: userData.autoArchive?'normal':data.visibility,
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

    if (bufferedData !== undefined) {
        return (
            <Task
                id={id}
                value={bufferedData}
                parent={parentData}
                onCompleted={onCompleted}
                onUncompleted={onUncompleted}
                onClick={() => navigate('/task/'+ id)}
                onChange={bufferedOnChange}
                onTimerPlay={onTimerPlay}
                onTimerPause={onTimerPause}
                stackable={stackable}
            />
        );
    } else {
        return null;
    }

}

TaskController.propTypes = {
    id: PropTypes.string.isRequired,
    stackable: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['auto'])
    ]),
};

TaskController.defaultProps = {
    stackable: 'auto',
};
