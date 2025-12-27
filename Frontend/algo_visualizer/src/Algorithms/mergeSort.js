import { sleep } from './utils';

export const mergeSort = async (array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef) => {
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

async function sort(arr, l, r, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef) {
    if (l >= r) return;

    let m = l + Math.floor((r - l) / 2);
    await sort(arr, l, m, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
    await sort(arr, m + 1, r, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, controlRef);
    await merge(arr, l, m, r, setArray, setComparingIndices, setSwappingIndices, speed, controlRef);
}

async function merge(arr, l, m, r, setArray, setComparingIndices, setSwappingIndices, speed, controlRef) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (controlRef.current.isStopped) throw 'STOPPED';

        setComparingIndices([l + i, m + 1 + j]);
        await sleep(101 - speed, controlRef);

        if (L[i] <= R[j]) {
            setSwappingIndices([k]);
            arr[k] = L[i];
            i++;
        } else {
            setSwappingIndices([k]);
            arr[k] = R[j];
            j++;
        }
        setArray([...arr]);
        await sleep(101 - speed, controlRef);
        setSwappingIndices([]);
        k++;
    }

    while (i < n1) {
        if (controlRef.current.isStopped) throw 'STOPPED';

        setSwappingIndices([k]);
        arr[k] = L[i];
        setArray([...arr]);
        await sleep(101 - speed, controlRef);
        setSwappingIndices([]);
        i++;
        k++;
    }

    while (j < n2) {
        if (controlRef.current.isStopped) throw 'STOPPED';

        setSwappingIndices([k]);
        arr[k] = R[j];
        setArray([...arr]);
        await sleep(101 - speed, controlRef);
        setSwappingIndices([]);
        j++;
        k++;
    }

    setComparingIndices([]);
}
