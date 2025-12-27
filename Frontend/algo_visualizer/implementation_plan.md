# Implementation Plan - Algorithm Visualizer Home Page

## 1. Design Concept & Aesthetics
**Goal**: Create a "Wow" factor with a modern, high-contrast, premium feel.
**Theme**: Cyberpunk / Futurist Glassmorphism.

### Color Palette
- **Background**: Deep Void Black/Blue (`#0A0E17`) with subtle animated radial gradients.
- **Glass Panels**: White opacity (`rgba(255, 255, 255, 0.05)`) with backdrop blur (`blur(10px)`).
- **Accents (Neon)**:
  - **Primary**: Electric Violet (`#7B2CBF`) - Buttons / Active states.
  - **Secondary**: Cyan (`#4CC9F0`) - Default Array Bars.
  - **Highlight (Compare)**: Amber (`#FF9E00`).
  - **Action (Swap)**: Hot Pink (`#F72585`).
  - **Success (Sorted)**: Neon Green (`#06D6A0`).

### Typography
- **Font**: 'Inter' or 'Outfit' (Google Fonts).
- **Headings**: Bold, uppercase, widely spaced.
- **Micro-text**: Monospace for stats/code (`'Fira Code'`, `'JetBrains Mono'`).

## 2. Layout Structure (Home Page)
The app will be a "Single View Dashboard" (no scrolling needed).

### A. Header (Control Hub)
A floating glass bar at the top containing:
- **Logo/Title**: "ALGO // VISA" (Stylized).
- **Algorithm Selector**: Custom dropdown (Bubble Sort, Quick Sort, Merge Sort, Dijkstra, etc.).
- **Controls Group**:
  - **Speed Slider**: "Slow" <-> "Fast".
  - **Size Slider**: "Few Elements" <-> "Many Elements".
  - **Action Buttons**:
    - "Generate New Array" (Icon: Refresh).
    - "START VISUALIZATION" (Large, glowing, gradient button).

### B. Main Canvas (The Stage)
Occupies the center 70% of the screen.
- **Visuals**: Vertical bars (for sorting) or Grid (for pathfinding).
- **Animations**: Smooth height transitions. Hover effects on bars showing their numeric value.
- **Status Indicator**: "Comparing indices [i] and [j]..." overlay appearing in a futuristic HUD style.

### C. Info Panel & Footer
Bottom section.
- **Legend**: Color dots explaining what Red/Green/Yellow mean.
- **Time Complexity**: Big-O notation card for the currently selected algorithm.
- **Footer**: "Built by [User]" - Minimal opacity text.

## 3. Component Architecture

```
App.js
│
├── <Navbar />           # Logo + Theme Toggle
├── <ControlBar />       # The main interaction hub (Algorithms, Sliders, Play Button)
├── <VisualizerCanvas /> # The dynamic area rendering bars/nodes
│   └── <ArrayBar />     # Individual mapped component
└── <InfoFooter />       # Legend and Complexity Info
```

## 4. State Management (React Hooks)
- `array`: Number[] (The data being sorted).
- `algorithm`: String (Current selection).
- `isSorting`: Boolean (Disables controls while running).
- `speed`: Number (Delay in ms).
- `compareIndices`: [Number, Number] (For highlighting active bars).
- `swapIndices`: [Number, Number] (For highlighting swaps).

## 5. Step-by-Step Implementation Guide

### Phase 1: Foundation ✅
1.  **Clean Up**: Remove default CRA boilerplate. ✅
2.  **Styles**: Set up `index.css` with CSS Variables for the neon palette and Google Fonts. ✅
3.  **Layout**: specialized CSS Grid/Flexbox layout for the Dashboard. ✅

### Phase 2: The Visualizer Core ✅
1.  **State Setup**: `useEffect` to generate random arrays. ✅
2.  **Rendering**: Map `array` to `div`s with dynamic heights. ✅
3.  **Controls**: Wire up Sliders and Buttons to update state. ✅

### Phase 3: The Algorithms ✅
1.  **Sorting Logic**: Implement Bubble, Insertion, Selection, Quick, and Merge Sort. ✅
2.  **Animation Engine**: Use `async/await` patterns with a Pause-aware sleep utility. ✅
3.  **Advanced Controls**: Add Stop and Pause/Resume functionality. ✅

### Phase 4: Polish ✅
1.  **Glassmorphism**: Add backdrop-filter blurs to the Control Bar. ✅
2.  **Glow Effects**: Add `box-shadow` matching the bar colors. ✅
3.  **Refined UI**: Consistent neon theme and improved typography. ✅

## 6. Next Phase: Roadmap to V2.0 🚀

### Phase 5: Pathfinding Module ✅
- **Hybrid Canvas**: Create a toggle to switch between Sorting (Array) and Pathfinding (Grid). ✅
- **Interactive Grid**: Implement a grid where users can draw "walls" and drag the Start/End nodes. ✅
- **Pathfinding Algorithms**:
  - **Dijkstra’s Algorithm** (Weighted). ✅
  - **A* Search** (Heuristic-based). ✅
  - **BFS/DFS** (Unweighted). ✅
- **Visuals**: Animated "wave" effect for node exploration and path tracing. ✅
- **Dynamic Sizing**: Grid and node sizes scale automatically based on the 'size' slider. ✅

### Phase 6: Educational HUD & Data Analytics 📊
- **Pseudocode Tracker**: A floating panel that highlights the current line of code being executed.
- **Live Stats**:
  - Comparison Counter.
  - Array Access / Swap Counter.
  - Time Elapsed (ms).
- **Algorithm Deep-Dive**: A "Learn More" modal for each algorithm with logic explanation and best/worst case scenarios.

### Phase 7: Functional Enhancements ⚙️
- **Step-by-Step Mode**: Allow users to "Step Forward" or "Step Backward" through the algorithm.
- **Custom Input**: Allow users to type in their own comma-separated array values.
- **Sound Mapping**: Map bar heights to different frequencies for an "Auditory Visualization" (Audio Synthesis).

### Phase 8: Deployment & Final Polish 🚀
- **Performance Optimization**: (Initial Pass Complete ✅)
  - `useCallback` + `React.memo` for DOM rendering stability.
  - `MinHeap` data structure for pathfinding efficiency.
- **Persistence**: Save user's favorite settings or custom arrays to LocalStorage.
- **Deployment**: Host on Vercel/Netlify with a custom domain.
- **PWA**: Make the app installable on mobile devices.

---
**Current Status**: Phase 5 Complete. Performance optimization pass (initial) complete with `MinHeap` and `memoization`.
**Next Up**: Phase 6: Educational HUD (Pseudocode Tracker & Live Stats).

