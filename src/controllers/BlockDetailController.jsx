import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useSnapshotOne, useSnapshotMany } from '../hooks/firebase';
import useBufferChanges from '../hooks/useBufferChanges';
import { useUser } from '../hooks/user';
import BlockDetail from '../pages/BlockDetail';
import { groupsDataOrganize } from '../utils';

export default function BlockDetailController() {
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


    const groupReference = useMemo(
        () => {
            const groupId = data?.group;
            if (user !== undefined && groupId) {
                return doc(db, 'users', user.uid, 'items', groupId);
            } else {
                return undefined;
            }
        },
        [user, data],
    );
    const [_groupLoading, groupData, _groupError] = useSnapshotOne(groupReference);

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


    const onChange = useCallback((value) => {
        if (value !== undefined) {
            setDoc(reference, value);
        }
    }, [reference]);

    const [bufferedData, bufferedOnChange] = useBufferChanges(data, onChange);

    function onCompleted() {
        updateDoc(reference, {
            completed : true,
            completionDate : new Date(Date.now()),
        });
    }

    function onUncompleted() {
        updateDoc(reference, {
            completed : false,
            completionDate : null,
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

    function onBack() {
        return navigate(-1);
    }

    if (bufferedData !== undefined && (bufferedData.group == null || groupData !== undefined)) {
        return (
            <BlockDetail
                id={id}
                value={bufferedData}
                group= {groupData}
                onCompleted={onCompleted}
                onUncompleted={onUncompleted}
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

BlockDetailController.propTypes = {
};

BlockDetailController.defaultProps = {

};
