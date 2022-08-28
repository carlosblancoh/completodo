import { useCallback, useEffect, useRef, useState } from 'react';
import usePrevious from './previous';

export default function useBufferChanges(value, setValue) {
    const [buffered, setBufferedBase] = useState(value);
    const commitTimeout = useRef(undefined);
    const setValueOld = usePrevious(setValue);

    useEffect(() => {
        setBufferedBase(value);
    }, [value]);

    useEffect(() => {
        if (commitTimeout) {
            clearTimeout(commitTimeout.current);
            commitTimeout.current = undefined;
            setValueOld?.(buffered);
        }
    }, [setValue]);

    const commitChanges = useCallback((change) => {
        if (commitTimeout) {
            clearTimeout(commitTimeout.current);
            commitTimeout.current = undefined;
            setValue(change);
        }
    }, [commitTimeout, setValue]);

    const setBuffered = useCallback((newValue) => {
        if (commitTimeout) {
            clearTimeout(commitTimeout.current);
            commitTimeout.current = undefined;
        }
        setBufferedBase(newValue);
        const timeout = setTimeout(() => commitChanges(newValue), 1000);
        commitTimeout.current = timeout;
    }, [commitTimeout, commitChanges]);

    return [buffered, setBuffered];
}
