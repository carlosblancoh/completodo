import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useSnapshotOne(reference) {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if (reference !== undefined) {
            return onSnapshot(
                reference,
                results => {
                    setData(results.data());
                    setLoading(false);
                },
                error => {
                    setError(error.message);
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
            setData(undefined);
            setError(undefined);
        }
    }, [reference]);

    return [loading, data, error];
}

export function useSnapshotMany(reference) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if (reference !== undefined) {
            return onSnapshot(
                reference,
                results => {
                    const docs = results.docs;
                    setData(docs.map(result => ({id: result.id, data: result.data()})));
                    setLoading(false);
                },
                error => {
                    setError(error.message);
                    setLoading(false);
                }
            );
        } else {
            setData([]);
            setLoading(false);
            setError(undefined);
        }
    }, [reference]);

    return [loading, data, error];
}
