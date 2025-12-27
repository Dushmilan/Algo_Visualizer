import { sleep } from './utils';

export const quickSort = async (array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef) => {
    let arr = [...array];
    try {
        await sort(arr, 0, arr.length - 1, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
        if (!controlRef.current.isStopped) {
            setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
        }
    } catch (e) {
        if (e === 'STOPPED') return;
        throw e;
    }
};

async function sort(arr, low, high, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef) {
    if (low < high) {
        if (controlRef.current.isStopped) return;

        let pi = await partition(arr, low, high, setArray, setComparingIndices, setSwappingIndices, speed, controlRef);

        setSortedIndices(prev => [...prev, pi]);

        await sort(arr, low, pi - 1, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
        await sort(arr, pi + 1, high, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
    } else if (low === high) {
        setSortedIndices(prev => [...prev, low]);
    }
}

async function partition(arr, low, high, setArray, setComparingIndices, setSwappingIndices, speed, controlRef) {
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j < high; j++) {
        if (controlRef.current.isStopped) throw 'STOPPED';

        setComparingIndices([j, high]);
        await sleep(101 - speed, controlRef);

        if (arr[j] < pivot) {
            i++;
            setSwappingIndices([i, j]);

            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            setArray([...arr]);
            await sleep(101 - speed, controlRef);
            setSwappingIndices([]);
        }
    }

    if (controlRef.current.isStopped) throw 'STOPPED';

    setSwappingIndices([i + 1, high]);
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    setArray([...arr]);
    await sleep(101 - speed, controlRef);
    setSwappingIndices([]);
    setComparingIndices([]);

    return i + 1;
}
