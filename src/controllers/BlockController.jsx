import { collection, doc, query, updateDoc, where } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { useSnapshotMany, useSnapshotOne } from '../hooks/firebase';
import { useUser } from '../hooks/user';
import Block from '../components/Block';
import { itemSortNoPin } from '../utils/itemSort';

export default function BlockController({id}) {
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

    const childrenReference = useMemo(
        () => {
            if (user !== undefined && data !== undefined && data.group !== undefined && data.group != null ) {
                const items = collection(db, 'users', user.uid, 'items');
                return query(items, where('parent', '==', data.group), where('type', '==', 'task'), where('visibility', 'in', ['normal', 'pinned']));
            } else {
                return undefined;
            }
        },
        [user, data],
    );
    const [_childrenLoading, childrenData, _childrenError] = useSnapshotMany(childrenReference);



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

    if (data !== undefined) {
        return (
            <Block
                id={id}
                value={data}
                onCompleted={onCompleted}
                onUncompleted={onUncompleted}
                onClick={() => navigate('/time-block/'+ id)}
                toDoS={itemSortNoPin(childrenData).slice(0, 3)}
                group={groupData}
            />
        );
    } else {
        return null;
    }

}


BlockController.propTypes = {
    id: PropTypes.string.isRequired,
};

BlockController.defaultProps = {

};
