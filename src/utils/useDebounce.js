
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebounmcedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounmcedValue(value);
        }, delay);

        return() => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
