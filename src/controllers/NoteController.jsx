import { doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { useSnapshotOne } from '../hooks/firebase';
import useBufferChanges from '../hooks/useBufferChanges';
import { useUser } from '../hooks/user';
import Note from '../components/Note';

export default function NoteController({id}) {
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

    const onChange = useCallback((value) => {
        if (value != undefined) {
            setDoc(reference, value);
        }
    }, [reference]);

    const [bufferedData, bufferedOnChange] = useBufferChanges(data, onChange);

    if (bufferedData !== undefined) {
        return (
            <Note
                id={id}
                value={bufferedData}
                parent={parentData}
                onClick={() => navigate('/note/'+ id)}
                onChange={bufferedOnChange}
            />
        );
    } else {
        return null;
    }

}

NoteController.propTypes = {
    id: PropTypes.string.isRequired,
};

NoteController.defaultProps = {

};
