import { collection, deleteDoc, doc, query, runTransaction, where } from 'firebase/firestore';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useSnapshotOne, useSnapshotMany } from '../hooks/firebase';
import useBufferChanges from '../hooks/useBufferChanges';
import { useUser } from '../hooks/user';
import NoteDetail from '../pages/NoteDetail';
import { groupsDataOrganize } from '../utils';

export default function NoteDetailController() {
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


    const onChange = useCallback(async (value) => {
        if (value != undefined) {
            await runTransaction(db, async tx => {
                const note = await tx.get(reference);
                let oldParentRef = null;
                let oldParent = null;
                let newParentRef = null;
                let newParent = null;

                if (note.data().parent !== null) {
                    oldParentRef = doc(db, 'users', user.uid, 'items', note.data().parent);
                    oldParent = await tx.get(oldParentRef);
                }
                if (value.parent !== null) {
                    newParentRef = doc(db, 'users', user.uid, 'items', value.parent);
                    newParent = await tx.get(newParentRef);
                }

                if ((note.data().visibility === 'normal' || note.data().visibility === 'pinned') && (
                    (note.data().visibility !== value.visibility && (value.visibility === 'trashed' || value.visibility === 'archived')) ||
                    (note.data().parent !== value.parent)
                )) {
                    if (note.data().parent !== null) {
                        const children = oldParent.data().children;
                        const newChildren = children.filter(child => child !== id);
                        await tx.update(oldParentRef, {
                            children: newChildren,
                            notes: (oldParent.data().notes - 1),
                        });
                    }
                }

                if ((value.visibility === 'normal' || value.visibility === 'pinned') && (
                    (note.data().visibility !== value.visibility && (note.data().visibility === 'trashed' || note.data().visibility === 'archived')) ||
                    (note.data().parent !== value.parent)
                )) {
                    if (value.parent !== null) {
                        const children = newParent.data().children;
                        const newChildren = [...children, id];
                        await tx.update(newParentRef, {
                            children: newChildren,
                            notes: (newParent.data().notes + 1),
                        });
                    }
                }
                tx.set(reference, value);
            });
        }
    }, [reference]);

    const [bufferedData, bufferedOnChange] = useBufferChanges(data, onChange);

    async function onDelete() {
        const items = collection(db, 'users', user.uid, 'items');
        const self = doc(items, id);
        deleteDoc(self);
        onBack();
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

    if (bufferedData !== undefined && (bufferedData.parent == null || parentData !== undefined)) {
        return (
            <NoteDetail
                value={bufferedData}
                parent={parentData}
                parentColor={groupsData.find(group => group.id === bufferedData.group)?.data?.color ?? '#65C582'}
                onBack={onBack}
                onChange={bufferedOnChange}
                groupsList={groupsDataOrganize(groupsData, null)}
                onDelete={onDelete}
            />
        );
    } else {
        return null;
    }

}

NoteDetailController.propTypes = {
};

NoteDetailController.defaultProps = {

};
