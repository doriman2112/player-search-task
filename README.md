# RealPlay Back Office - Player Search Task

## 🎯 Overview

This is a starter repository for the RealPlay Frontend Engineering technical assessment. You'll be building a player search interface that operations teams use to find and review player data in the back office system.

**Time Limit:** 3 hours from when you start

## 🖼️ Expected Layout

Below is the target layout your implementation should match. Exact colours are up to you, but the structure — header, search bar, table with sortable columns, and pagination — is required.

```
┌─────────────────────────────────────────────────────────────────┐
│  RealPlay Back Office                          [🌙 Dark / Light] │  ← Header
│  Player Search                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────┐  ┌─────────┐      │  ← Search bar
│  │  player_id, email, phone                 │  │   Go    │      │
│  └──────────────────────────────────────────┘  └─────────┘      │
│                                                                  │
│  [ All ]  [ Online ]  [ Offline ]                                │  ← Status filter
│                                                                  │
│  Showing 1–10 of 25 results                                      │
│                                                                  │
│  ┌──────────┬──────────────┬───────────────────┬──────────┬──────┐  │
│  │ Player ID▲│ Name        │ Email             │ Balance ▼│Status│  │  ← Table
│  ├──────────┼──────────────┼───────────────────┼──────────┼──────┤  │    (▲▼ = sortable)
│  │ 3846852  │ John Smith   │ john@example.com  │ $500.00  │ 🟢   │  │
│  │ 3846845  │ Maria Garcia │ maria@example.com │  $45.30  │ 🔴   │  │
│  │ 3846838  │ Peter Jones  │ peter@example.com │ $120.75  │ 🟢   │  │
│  │  ...     │  ...         │  ...              │  ...     │ ...  │  │
│  └──────────┴──────────────┴───────────────────┴──────────┴──────┘  │
│                                                                  │
│   (while loading, show skeletons instead of rows above)          │
│                                                                  │
│              [← Previous]   Page 1 of 3   [Next →]              │  ← Pagination
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Notes on the layout:**
- The search bar is full-width with the "Go" button inline — auto-searches after 500ms of no typing
- Status filter sits below the search bar — "All", "Online", "Offline" pill buttons
- Column headers are clickable to sort — show an arrow indicator (▲ ascending, ▼ descending)
- While a search is loading, table rows show grey skeleton bars instead of data
- If the API call fails, show an error message with a Retry button above the table
- Status is a coloured badge: green for Online, grey for Offline
- Result count ("Showing 1–10 of 25") sits between the filters and the table
- Pagination is at the bottom, result count on the left, buttons on the right
- The dark/light toggle lives in the top-right of the header

---

## 📋 What's Already Done

We've set up the foundation so you can focus on building features:

✅ **Project Setup**
- React 19 + TypeScript + Vite configured
- Tailwind CSS + ShadCN/UI component library installed
- Basic folder structure (`components/`, `types/`, `data/`)
- Dependencies ready (just run `npm install`)

✅ **Data Layer**
- `src/types/player.ts` - Player interface with TypeScript types
- `src/data/mockPlayers.ts` - 25 mock player records ready to use

✅ **App Shell**
- `src/App.tsx` - Main component with state management scaffold
- Basic pagination calculation logic
- Placeholder sections for your components

✅ **Component Skeletons**
- `src/components/SearchBar.tsx` - TODO template with requirements
- `src/components/PlayerTable.tsx` - TODO template with requirements
- `src/components/Pagination.tsx` - TODO template with requirements

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/doriman2112/player-search-task.git
cd player-search-task

# Install dependencies
npm install
```

### 2. Review the Codebase

Before you start coding, explore what's already here:

```bash
# Check the existing commit history
git log --oneline

# Look at the Player interface
cat src/types/player.ts

# Review the mock data
cat src/data/mockPlayers.ts

# See the App structure
cat src/App.tsx
```

### 3. Create Your Feature Branch

```bash
git checkout -b feature/player-search-implementation
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173` and you'll see placeholder text for the components you need to build.

## 🧑‍💻 Coding Standards

These are not optional — they will be evaluated in the code review and walkthrough.

### TypeScript
- Use TypeScript strictly throughout — no `any`, no type assertions unless genuinely necessary
- Define explicit interfaces/types for all props, API responses, and state
- Use union types and discriminated unions instead of booleans where they describe state better
  ```typescript
  // ❌ BAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Player[]>([]);

  // ✅ GOOD — one state variable, mutually exclusive states
  type SearchState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; players: Player[]; total: number }
    | { status: 'error'; message: string };
  ```

### Modern ES6+
Write clean, modern JavaScript — avoid patterns from the pre-ES6 era:

```typescript
// ❌ Avoid
var items = [];
for (var i = 0; i < players.length; i++) { ... }
function handleClick() { ... }

// ✅ Use
const items = players
  .filter(({ online }) => online)
  .map(({ playerId, name }) => ({ id: playerId, label: name }));

const handleClick = () => { ... };
```

Required patterns:
- `const`/`let` — never `var`
- Arrow functions for callbacks and component definitions
- Destructuring in function params, array/object assignments
- Optional chaining (`?.`) and nullish coalescing (`??`) where appropriate
- Template literals instead of string concatenation
- Array methods (`map`, `filter`, `reduce`, `find`) over imperative loops
- Async/await over `.then()` chains
- Named exports for utilities; default export for components

### Error Handling
Every `async` call must be wrapped in try/catch. Errors must be surfaced to the user — never silently swallowed:

```typescript
// ❌ BAD
const data = await searchPlayers(params);
setPlayers(data.players);

// ✅ GOOD
try {
  const data = await searchPlayers(params);
  setState({ status: 'success', ...data });
} catch (err) {
  const message = err instanceof Error ? err.message : 'Unexpected error';
  setState({ status: 'error', message });
}
```

---

## 📝 Your Tasks

### Required Features (Must Complete)

You need to implement these four things:

#### 1. **SearchBar Component** (`src/components/SearchBar.tsx`)

**Requirements:**
- Text input that accepts player ID, email, or name
- Placeholder: `"player_id, email, phone"`
- "Go" button to trigger search immediately
- **Auto-search as the user types** — but do NOT fire a request on every keystroke. Implement **debouncing** so the API is called only after the user stops typing for ~500ms
- Call `onSearch(query)` callback when the search triggers (either via button or debounce)

> Hint: debouncing with plain React means `useEffect` + `setTimeout` + a cleanup function. Returning the cleanup from `useEffect` cancels the pending timer when the input changes again before the delay is up.

**Component Interface:**
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}
```

#### 2. **Status Filter**

Add a filter (e.g. pill buttons or a select) that lets the user narrow results to:
- **All** (default)
- **Online only**
- **Offline only**

This should work alongside the text search — both filters apply at the same time.
Pass the selected status to `handleStatusChange()` in `App.tsx`.

#### 3. **PlayerTable Component** (`src/components/PlayerTable.tsx`)

**Requirements:**
- Display players in a table format
- Columns: Player ID, Name, Email, Balance, Status
- The **Status** column comes from `online: boolean` — display it as a coloured "Online" / "Offline" badge
- Accept a `players` array and a `loading` boolean as props
- When `loading` is `true`, show a **loading skeleton** instead of the table rows — do not show stale data while a new search is in progress
- **Implement row virtualization** — the dataset can contain hundreds of rows. Only the rows currently visible in the viewport should be rendered in the DOM. Use [`@tanstack/react-virtual`](https://tanstack.com/virtual/latest) for this.

> Why virtualization? Rendering 200 DOM rows is slow. Rendering 10 visible rows + recycling them as the user scrolls is fast. This is standard practice in any BO or data-heavy dashboard. The table should have a fixed height (e.g. `500px`) with overflow scroll, and `useVirtualizer` manages which rows are mounted.

**Component Interface:**
```typescript
interface PlayerTableProps {
  players: Player[];
  loading: boolean;
}
```

**Virtualization sketch:**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: players.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 48, // row height in px
});

// Render only rowVirtualizer.getVirtualItems() — not the full players array
```

#### 4. **Pagination Component** (`src/components/Pagination.tsx`)

**Requirements:**
- "Previous" and "Next" buttons
- Show "Showing X–Y of Z results" count
- Disable Previous on page 1, Next on last page
- Call `onNext()` and `onPrev()` callbacks

**Component Interface:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  onNext: () => void;
  onPrev: () => void;
}
```

#### 5. **Wire Everything Together in App.tsx**

- Uncomment the component imports
- Replace the TODO placeholders with your components
- Wire the debounce into `useEffect` (the commented-out block shows where)
- Make sure `handleStatusChange` triggers a new search
- Test that search, status filter, loading states, error states, and pagination all work correctly

#### 6. **Handle Errors**

The search API (`src/api/searchPlayers.ts`) randomly fails ~10% of the time to simulate real network errors.

- Catch errors and show a visible error message to the user
- Provide a **Retry** button that re-runs the last search
- Do not leave the user staring at a broken empty table with no explanation

### UI Library

**ShadCN/UI** is pre-installed and ready to use. Several components are already available in `src/components/ui/`:
- `Button`, `Input`, `Card`, `Table`, `Badge`

To add more components:
```bash
npx shadcn@latest add <component-name>
```

Browse all available components at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).

### Bonus Features (If Time Permits)

- ⭐ **Column sorting** — clicking a column header sorts the table ascending/descending (toggle)
- ⭐ **Empty state** — a friendly message when the search returns zero results
- ⭐ **Persist search in URL** — reflect the current query, status filter and page as GET params (e.g. `?q=john&status=online&page=2`) so the search is shareable and survives a browser refresh
- ⭐ **Session persistence** — restore the last search query from `localStorage` when the user reopens the tab (the scaffold already sets up the `STORAGE_KEY` constant for you)
- ⭐ **Dark / Light theme toggle** — add a toggle button in the header; the scaffold already includes the `useTheme` hook wired up for you
- ⭐ **Abort in-flight requests** — if the user types quickly, an older slow request can arrive after a newer fast one and overwrite the correct result. Use `AbortController` to cancel the previous request before firing a new one

## 🔧 Working with Git

### Commit Your Work Incrementally

**Don't wait until the end!** Make meaningful commits as you build:

```bash
# Good commit example
git add src/components/SearchBar.tsx
git commit -m "Implement SearchBar component with input handling and Go button"

# Another good commit
git add src/components/PlayerTable.tsx  
git commit -m "Add PlayerTable with columns for ID, name, email, balance, status"
```

### Commit Message Guidelines

✅ **Good commits:**
```
Implement SearchBar component with input handling
Add PlayerTable with player data display
Implement pagination controls with prev/next buttons
Wire up search functionality in App component
Style components to match BO theme
```

❌ **Bad commits:**
```
update
fix
changes
final
stuff
```

### When You're Done

Push your feature branch:

```bash
git push origin feature/player-search-implementation
```

## 📦 Deliverables Checklist

Before you submit, make sure you have:

- [ ] All three components implemented (SearchBar, PlayerTable, Pagination)
- [ ] Components wired together in App.tsx
- [ ] Application runs without errors (`npm run dev`)
- [ ] 5-10 meaningful git commits with descriptive messages
- [ ] Your feature branch pushed to the repository
- [ ] README updated with your notes (see below)

## 📄 Add Your Notes Here

### My Approach
[Describe how you broke down the problem and your implementation strategy]

### Component Structure  
[Explain what components you created and why you organized them that way]

### AI Usage
[Be honest: What did you use AI for? What did you modify? What did you figure out yourself?]

### Challenges & Solutions
[What problems did you encounter? How did you solve them?]

### What I'd Improve With More Time
[What would you refactor, add, or change if you had another 2-3 hours?]

### Time Breakdown
[Optional: How did you spend your 3 hours?]

---

## 🎓 Code Walkthrough Preparation

After you submit, we'll schedule a 15-minute walkthrough where you'll:

1. **Show your commit history** and explain your progression
2. **Walk through your component structure** and explain your decisions
3. **Demonstrate a specific commit** — we'll pick one and you'll show what worked at that point
4. **Explain your debounce implementation** — how does it prevent unnecessary API calls? What happens if you remove the cleanup function?
5. **Explain how you handle the loading state** — what does the UI show between the request firing and the response arriving?
6. **Explain your virtualization setup** — what is `useVirtualizer` doing? Why is the total container height set to `rowVirtualizer.getTotalSize()`? What breaks if you render all rows instead?
7. **Explain your discriminated union state** — why is `{ status: 'loading' }` better than separate `loading` + `error` + `data` booleans?
8. **Live coding challenge** — we'll give you a small extension to implement while we watch (15 min)
7. **Explain any bonus features you implemented**
8. **Discuss AI usage** — what did AI generate vs. what you modified and why?

### Tips for the Walkthrough

- Be ready to screen share and navigate your code
- Practice running `git log` and `git checkout <commit-hash>`
- Be able to explain **why** you made certain technical decisions
- Be honest about what you struggled with or didn't finish

## 🆘 Need Help?

If you have questions about:
- **Requirements:** Ask for clarification before starting
- **Technical setup issues:** Reach out if `npm install` or `npm run dev` fails  
- **Submission process:** Contact us anytime

We want you to succeed! Don't hesitate to ask.

## ⏱️ Time Management Suggestions

Here's a rough guide (adjust based on your pace):

- **30 min** — SearchBar component + debounce
- **15 min** — Status filter
- **60 min** — PlayerTable with loading skeleton + row virtualization
- **15 min** — Error handling + Retry
- **30 min** — Pagination component
- **30 min** — Wire everything together, test all states, clean up, commit

Remember: Working code > perfect code. Get something functional first, then improve it.

---

**Good luck! We're excited to see what you build.** 🚀

— RealPlay Engineering Team
