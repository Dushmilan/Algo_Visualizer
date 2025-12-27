export class MinHeap {
    constructor(comparator = (a, b) => (a.totalDistance ?? a.distance) - (b.totalDistance ?? b.distance)) {
        this.heap = [];
        this.comparator = comparator;
    }

    // Insert a node into the heap
    insert(node) {
        this.heap.push(node);
        this.siftUp(this.heap.length - 1);
    }

    // Extract the node with the minimum distance/f-score
    extractMin() {
        if (this.isEmpty()) return null;

        const minNode = this.heap[0];
        const lastNode = this.heap.pop();

        if (!this.isEmpty()) {
            this.heap[0] = lastNode;
            this.siftDown(0);
        }

        return minNode;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    siftUp(index) {
        let parentIndex = Math.floor((index - 1) / 2);

        // Use 'distance' for Dijkstra and 'totalDistance' for A*
        // We check which property exists or prioritize totalDistance if both exist (for A*)
        while (index > 0 && this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    siftDown(index) {
        let minIndex = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;

        if (leftChild < this.heap.length && this.comparator(this.heap[leftChild], this.heap[minIndex]) < 0) {
            minIndex = leftChild;
        }

        if (rightChild < this.heap.length && this.comparator(this.heap[rightChild], this.heap[minIndex]) < 0) {
            minIndex = rightChild;
        }

        if (index !== minIndex) {
            this.swap(index, minIndex);
            this.siftDown(minIndex);
        }
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}
