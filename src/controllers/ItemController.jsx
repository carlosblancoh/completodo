import { doc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { db } from '../firebase';
import { useSnapshotOne } from '../hooks/firebase';
import { useUser } from '../hooks/user';
import GroupController from './GroupController';
import TaskController from './TaskController';
import NoteController from './NoteController';
import BlockController from './BlockController';


export default function ItemController({id}) {
    const user = useUser();
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

    switch (data?.type) {
    case 'task':
    case 'subtask':
        return (<TaskController id={id} stackable={false}/>);
    case 'group':
        return (<GroupController id={id}/>);
    case 'note':
        return (<NoteController id={id}/>);
    case 'block':
        return (<BlockController id={id}/>);
    default:
        return null;
    }

}

ItemController.propTypes = {
    id: PropTypes.string.isRequired,
};

ItemController.defaultProps = {

};
