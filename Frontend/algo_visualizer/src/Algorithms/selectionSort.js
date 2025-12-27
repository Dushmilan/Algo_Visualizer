import { sleep } from './utils';

export const selectionSort = async (array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef) => {
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        if (controlRef.current.isStopped) return;

        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            if (controlRef.current.isStopped) return;

            setComparingIndices([minIdx, j]);
            await sleep(101 - speed, controlRef);

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            setSwappingIndices([i, minIdx]);

            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;

            setArray([...arr]);
            await sleep(101 - speed, controlRef);
            setSwappingIndices([]);
        }

        setSortedIndices(prev => [...prev, i]);
        setComparingIndices([]);
    }
};
