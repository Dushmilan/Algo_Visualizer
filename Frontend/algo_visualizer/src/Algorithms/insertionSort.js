import { sleep } from './utils';

export const insertionSort = async (array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef) => {
    let arr = [...array];
    const n = arr.length;

    setSortedIndices([0]);

    for (let i = 1; i < n; i++) {
        if (controlRef.current.isStopped) return;

        let key = arr[i];
        let j = i - 1;

        setComparingIndices([i, j]);
        await sleep(101 - speed, controlRef);

        while (j >= 0 && arr[j] > key) {
            if (controlRef.current.isStopped) return;

            setSwappingIndices([j, j + 1]);

            arr[j + 1] = arr[j];
            setArray([...arr]);
            await sleep(101 - speed, controlRef);

            j = j - 1;
            setSwappingIndices([]);
            if (j >= 0) setComparingIndices([i, j]);
        }
        arr[j + 1] = key;
        setArray([...arr]);

        setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
        setComparingIndices([]);
    }
};
