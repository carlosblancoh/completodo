import { doc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { useSnapshotOne } from '../hooks/firebase';
import { useUser } from '../hooks/user';
import Group from '../components/Group';

export default function GroupController({id}) {
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

    if (data !== undefined) {
        return (
            <Group
                id={id}
                value={data}
                onClick={() => navigate('/group/'+ id)}
            />
        );
    } else {
        return null;
    }

}

GroupController.propTypes = {
    id: PropTypes.string.isRequired,
};

GroupController.defaultProps = {

};
