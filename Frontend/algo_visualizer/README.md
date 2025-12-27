# ⚡ ALGO // VISA - Advanced Algorithm Visualizer

![Algorithm Visualizer Banner](https://img.shields.io/badge/ALGO-VISA-blue?style=for-the-badge&logoColor=white&color=7B2CBF)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Glassmorphism](https://img.shields.io/badge/UI-Glassmorphism-4CC9F0?style=for-the-badge)

**ALGO // VISA** is a high-performance, visually stunning algorithm visualizer built with a modern **Cyberpunk / Futurist Glassmorphism** aesthetic. It provides real-time, step-by-step visualization of both **Sorting** and **Pathfinding** algorithms with precise controls.

---

## ✨ Features

- 🎨 **Premium UI**: Deep void background with animated radial gradients and backdrop-blur panels.
- 🗺️ **Hybrid Canvas**: Seamlessly switch between Sorting (Array) and Pathfinding (Grid) modes.
- 🚀 **Real-time Visualization**: Watch algorithms work in real-time with smooth transitions and glow effects.
- ⚙️ **Interactive Controls**:
  - **Dynamic Array Generation**: Create new datasets instantly.
  - **Speed Control**: Adjust visualization speed from slow-mo to lightning fast.
  - **Size Control**: Scale the number of elements from 5 to 100+.
  - **Playback Controls**: Start, Stop, and Pause/Resume functionality.
- 🧠 **Smart Highlighting**: 
  - 🟡 **Amber**: Elements being compared.
  - 💗 **Hot Pink**: Elements being swapped.
  - 🟢 **Neon Green**: Sorted elements.
- 📊 **Complexity HUD**: Instantly see the Time Complexity (Big-O) of the selected algorithm.
- ⚡ **Optimized Performance**:
  - **Memoized Components**: Using `React.memo` and `useCallback` to prevent unnecessary re-renders.
  - **Efficient Data Structures**: Algorithms like Dijkstra and A* use **MinHeap (Priority Queue)** for $O(\log N)$ extraction.
  - **Surgical State Updates**: Targeted grid updates (row-level cloning) for buttery smooth drawing.

---

## 🛠️ Tech Stack

- **Frontend**: React (Hooks, Refs)
- **Styling**: Vanilla CSS3 (Custom Properties, Backdrop Filters, Flex/Grid)
- **Algorithms**: Pure JavaScript Implementation (Async/Await pattern for throttling)
- **Font**: Outfit / Inter (Google Fonts)

---

## 📂 Algorithms Included

### 📊 Sorting
| Algorithm | Average Complexity | Status |
| :--- | :--- | :--- |
| **Bubble Sort** | O(n²) | ✅ Implemented |
| **Insertion Sort** | O(n²) | ✅ Implemented |
| **Selection Sort** | O(n²) | ✅ Implemented |
| **Quick Sort** | O(n log n) | ✅ Implemented |
| **Merge Sort** | O(n log n) | ✅ Implemented |

### 🗺️ Pathfinding
| Algorithm | Weighted? | Status |
| :--- | :--- | :--- |
| **Dijkstra's** | Yes | ✅ Implemented |
| **A* Search** | Yes | ✅ Implemented |
| **BFS** | No | ✅ Implemented |
| **DFS** | No | ✅ Implemented |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/algo-visualizer.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd algo-visualizer/Frontend/algo_visualizer
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

---

## 🌈 Visual Identity (Color Palette)

The app uses a curated neon palette designed for maximum contrast and readability in dark environments:

- **Primary Glow**: `#7B2CBF` (Electric Violet)
- **Array Bars**: `#4CC9F0` (Cyan)
- **Comparison**: `#FF9E00` (Amber)
- **Swapping**: `#F72585` (Hot Pink)
- **Background**: `#0A0E17` (Void Black)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Built with 💜 for the Algorithmic Community.</p>
