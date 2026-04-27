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

### Modern ES6+
Write clean, modern JavaScript:
- `const`/`let` only — never `var`
- Arrow functions for callbacks and utilities
- Destructuring in function params and assignments
- Optional chaining `?.` and nullish coalescing `??` where appropriate
- Template literals over string concatenation
- `map`/`filter`/`find` over `for` loops
- `async/await` over `.then()` chains

### Error Handling
Every `async` call must be wrapped in `try/catch`. Errors must be visible to the user — never silently swallowed. Think: *what does the user see if the server returns a 500?*

---

## 🤔 Edge Cases to Think Through

These are the problems most developers don't think about until something breaks in production. Read each one, understand the problem, then figure out how to solve it. You don't need to get them all perfect — but you need to be able to explain your approach in the walkthrough.

---

### 1. Typing too fast — the debounce problem

**The problem:** Your search input calls the API. The user types `"john"` — that's 4 keystrokes, 4 API calls fired in under a second. Now imagine 50 users doing that simultaneously.

**Think about it:**
- How can you wait until the user *stops* typing before firing the request?
- If you set a 500ms timer on every keystroke, what do you do with the *previous* timer when a new keystroke arrives?
- What React concept lets you run code when a value changes *and* clean up the previous run?

> 🔑 Keywords to search: **debounce**, **useEffect cleanup**, **clearTimeout**

---

### 2. Slow responses arriving out of order — the race condition

**The problem:** The user types `"j"`, waits, then quickly types `"john"`. Two requests are now in flight. The `"j"` request is slower (bad luck, server load) and arrives *after* the `"john"` result. Your UI now shows results for `"j"` even though the user is looking at `"john"`.

**Think about it:**
- How do you know, when a response arrives, whether it's still the *latest* one?
- Is there a browser API that lets you cancel an in-flight HTTP request?
- Alternatively, could you track a counter or ID to discard stale responses?

> 🔑 Keywords to search: **AbortController**, **stale closure React**, **ignore flag async useEffect**

---

### 3. Impossible UI states — the state modeling problem

**The problem:** You have three pieces of state: `loading`, `error`, and `data`. But some combinations make no sense — you can't be loading *and* have an error at the same time, or have data *and* be in an error state. These impossible states lead to bugs like showing an empty table while an error banner is also displayed.

**Think about it:**
- Can you represent loading, error, and success as a *single* state variable instead of three?
- How would TypeScript help you make sure you never render the table when the state is `'error'`?

> 🔑 Keywords to search: **discriminated union TypeScript**, **making impossible states impossible**, **type-safe state React**

---

### 4. Rendering hundreds of rows — the performance problem

**The problem:** The API returns 200 players. You render 200 `<tr>` elements in the DOM. A real back office might have 10,000. Each DOM node has a cost — layout, paint, memory. On low-end devices this causes visible lag.

**Think about it:**
- The user can only see ~10 rows at a time. Do you really need the other 190 in the DOM?
- What if instead of rendering all rows, you only rendered the ones *visible in the scrollable area*, and swapped them out as the user scrolls?
- How would you calculate which rows are visible based on scroll position and row height?

> 🔑 Keywords to search: **list virtualization**, **windowing React**, **@tanstack/react-virtual useVirtualizer**

---

## 📝 Your Tasks

### Required Features (Must Complete)

You need to implement these four things:

#### 1. **SearchBar Component** (`src/components/SearchBar.tsx`)

**Requirements:**
- Text input that accepts player ID, email, or name
- Placeholder: `"player_id, email, phone"`
- "Go" button to trigger an immediate search
- Auto-search as the user types, but don't fire on every keystroke — see **Edge Case #1** above

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
- When `loading` is `true`, show a loading skeleton instead of the table rows
- The table has a fixed height with a scrollable body — don't render all rows at once; only render what's visible. See **Edge Case #4** above.

**Component Interface:**
```typescript
interface PlayerTableProps {
  players: Player[];
  loading: boolean;
}
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
- Make sure `handleStatusChange` triggers a new search with page reset
- Think about how you model your async state — see **Edge Case #3** above
- Think about whether slow responses can arrive out of order — see **Edge Case #2** above

#### 6. **Handle Errors**

The search API (`src/api/searchPlayers.ts`) randomly fails ~10% of the time.

- Show a clear error message to the user when a request fails
- Provide a **Retry** button that re-runs the last search
- Think: *is it possible for your UI to show an error banner and a table at the same time? Should it be?*

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
4. **Debounce** — what problem does it solve? What happens if you remove the cleanup function from your `useEffect`? Can you show it breaking without it?
5. **Loading state** — what does the UI show in the 600ms between the request firing and the response arriving? Could the user see stale data?
6. **Error handling** — trigger an error in the browser (the API fails randomly ~10% of calls). Walk us through what the user sees and how they recover.
7. **Virtualization** — open DevTools, inspect the DOM while scrolling. How many `<tr>` elements are in the DOM at any time? What would happen without virtualization at 10,000 rows?
8. **State modeling** — can your app ever show an error message *and* a table of results at the same time? Should it be able to? How does your state structure prevent or allow that?
9. **Live coding challenge** — we'll give you a small extension to implement while we watch (15 min)
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
