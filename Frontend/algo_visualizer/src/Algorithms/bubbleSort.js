import { sleep } from './utils';

export const bubbleSort = async (array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef) => {
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (controlRef.current.isStopped) return;

            setComparingIndices([j, j + 1]);
            await sleep(101 - speed, controlRef);

            if (arr[j] > arr[j + 1]) {
                setSwappingIndices([j, j + 1]);

                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                setArray([...arr]);
                await sleep(101 - speed, controlRef);

                setSwappingIndices([]);
            }
            setComparingIndices([]);
        }
        setSortedIndices(prev => [...prev, n - i - 1]);
    }
};
