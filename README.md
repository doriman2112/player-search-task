# Frontend Engineer — Home Assignment

Hello esteemed developer! 👋

This task will help us assess your frontend engineering skills. Thank you for taking the time — we appreciate it. 🙂

---

## The Task

You will build a **player search screen** for a back office system. Operations teams use this screen daily to look up players by ID, email, or name, filter by online status, and page through large result sets.

The screen should look something like this:

```
┌─────────────────────────────────────────────────────────────────┐
│  Back Office                                   [🌙 Dark / Light] │
│  Player Search                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────┐  ┌─────────┐      │
│  │  player_id, email, phone                 │  │   Go    │      │
│  └──────────────────────────────────────────┘  └─────────┘      │
│                                                                  │
│  [ All ]  [ Online ]  [ Offline ]                                │
│                                                                  │
│  Showing 1–10 of 200 results                                     │
│                                                                  │
│  ┌──────────┬──────────────┬───────────────────┬──────────┬──────┐
│  │ Player ID▲│ Name        │ Email             │ Balance ▼│Status│
│  ├──────────┼──────────────┼───────────────────┼──────────┼──────┤
│  │ 3846852  │ John Smith   │ john@example.com  │ $500.00  │ 🟢   │
│  │ 3846845  │ Maria Garcia │ maria@example.com │  $45.30  │ 🔴   │
│  │  ...     │  ...         │  ...              │  ...     │ ...  │
│  └──────────┴──────────────┴───────────────────┴──────────┴──────┘
│                                                                  │
│   (skeleton bars while loading)                                  │
│                                                                  │
│  Showing 1–10 of 200    [← Previous]   Page 1 of 20   [Next →]  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

A few things to note:

- The search input auto-searches as the user types (after a short pause) and also has a "Go" button for immediate search
- The status filter pills — All, Online, Offline — work together with the text search at the same time
- Column headers are clickable to sort ascending / descending — show an arrow indicator (▲ / ▼)
- While waiting for results, the table rows are replaced with skeleton bars
- If the API fails, the user sees an error message and a Retry button
- The dark/light toggle in the header switches the entire theme

---

## What Is Already Set Up

We've taken care of the boilerplate so you can focus on building.

| What | Where |
|---|---|
| React 19 + TypeScript + Vite | `package.json`, `vite.config.ts` |
| Tailwind CSS v4 | `src/index.css` |
| ShadCN/UI (configured, no components added yet) | `components.json`, `src/lib/utils.ts` |
| Player TypeScript type | `src/types/player.ts` |
| 200 mock players | `src/data/mockPlayers.ts` |
| Async search API (fake, with delay and random errors) | `src/api/searchPlayers.ts` |
| App shell with state hooks and TODO placeholders | `src/App.tsx` |

> 📌 Read `src/App.tsx` and `src/api/searchPlayers.ts` before you write a single line.
> The state structure, API contract, and component prop shapes are already sketched out there.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/doriman2112/player-search-task.git
cd player-search-task

# Install dependencies
npm install

# Create your feature branch
git checkout -b feature/player-search-implementation

# Start the dev server — opens at http://localhost:5173
npm run dev
```

---

## What You Need to Build

You need to create three components inside `src/components/` and wire them into `src/App.tsx`.

### SearchBar

A text input with a "Go" button.

- Placeholder: `"player_id, email, phone"`
- "Go" triggers `onSearch(query)` immediately
- Also auto-searches as the user types — but **not on every keystroke** (see Food for Thought below)
- "Go" is disabled when the input is empty

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}
```

### Status Filter

Pill buttons or a dropdown that narrows results.

- Options: **All** (default) · **Online** · **Offline**
- Works together with the text search — both filters apply at the same time
- Calls `handleStatusChange()` in `App.tsx` when selection changes

### PlayerTable

A scrollable table of players.

- Columns: **Player ID** · **Name** · **Email** · **Balance** · **Status**
- Status comes from `player.online` (boolean) — render as a coloured badge
- When `loading` is `true`, show skeleton bars instead of rows
- The table must have a **fixed height with a scrollable body** — all rows can be rendered for now
- **Column headers are clickable to sort** — clicking the same header again toggles ascending / descending. Show a ▲ / ▼ arrow indicator on the active column.

```typescript
interface PlayerTableProps {
  players: Player[];
  loading: boolean;
}
```

### Pagination

Prev/next controls with a result count.

- Show `"Showing X–Y of Z results"` — calculate X and Y from `currentPage` and `pageSize`
- Show `"Page N of M"`
- Previous disabled on page 1 · Next disabled on last page

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

### Error Handling

The fake API (`src/api/searchPlayers.ts`) randomly fails ~10% of the time to simulate real network errors.

- Show a clear error message when a request fails
- Show a **Retry** button that re-runs the last search
- Never leave the user staring at an empty screen with no explanation

### Empty State

When a search returns zero results, show a friendly message — not just an empty table.

### Responsive Layout

The screen must work on both desktop and mobile:

- On mobile, the search input and "Go" button stack vertically
- The table scrolls horizontally on small screens — the user should be able to reach every column
- The pagination result count and buttons stack vertically on mobile

### URL Sync

Reflect the current search state in the URL so that searches are shareable and survive a browser refresh.

- Query, status filter, and current page should be readable from the URL (e.g. `?q=john&status=online&page=2`)
- When the page loads with params already in the URL, restore the search state from them
- When the user changes the query or status, reset to page 1

> 📌 `STORAGE_KEY` and a `useTheme` hook are already set up in `App.tsx` for the next two features.

### Session Restore

Save the last search query in `localStorage` so it is restored when the user reopens the tab.

- On page load: if there are no URL params, restore the last query from `localStorage`
- On every search: update `localStorage` with the latest query

### Dark / Light Theme

Add a toggle button in the header that switches the entire app between dark and light mode.

- The `useTheme` hook is already implemented in `App.tsx` — you just need to connect a button to it
- The user's preference should be remembered across page refreshes

---

## 🍽️ Food for Thought

These are the problems most developers don't notice until they break production. You don't need to solve all of them perfectly — but you must be able to **explain your approach** in the walkthrough.

### 1. The user types too fast

Your search input calls the API on every change. The user types `"john"` — that's 4 keystrokes, 4 API calls in under a second. Now multiply that by many concurrent users.

Some questions to guide your thinking:

- How can you wait until the user *stops* typing before firing a request?
- If you set a 500ms timer on every keystroke, what should happen to the *previous* timer when a new key is pressed?
- What React concept lets you run code when a value changes *and* clean up the previous run?

> 🔑 Search: `debounce useEffect`, `useEffect cleanup clearTimeout`

---

### 2. Slow responses arriving out of order

The user types `"j"`, waits, then quickly types `"john"`. Two requests are now in flight. The `"j"` response is slower and arrives *after* the `"john"` response. The UI now shows the wrong data.

Some questions to guide your thinking:

- When a response arrives, how do you know it's still the *latest* one?
- Is there a browser API that lets you cancel an in-flight request?
- Could a simple counter or flag be enough to discard stale results?

> 🔑 Search: `AbortController fetch cancel`, `ignore flag async useEffect`

---

### 3. Three booleans that lie

You have `loading`, `error`, and `data` as separate state variables. Some combinations are impossible in reality — you can't be loading *and* have an error, or show data *and* an error banner at the same time. But code allows it, leading to subtle UI bugs.

Some questions to guide your thinking:

- Can you express all these states as a *single* variable with a `status` field?
- How would TypeScript prevent you from rendering the table when status is `'error'`?

> 🔑 Search: `discriminated union TypeScript`, `making impossible states impossible`

---

### 4. Two hundred rows in the DOM

The API returns 200 players. A real back office might return 10,000. Every DOM node has a cost — layout, paint, memory. Rendering all rows at once causes visible lag on normal hardware.

Some questions to guide your thinking:

- The user sees roughly 10 rows at a time. Do the other 190 need to exist in the DOM?
- What if you only rendered the rows *currently visible* in the scroll area and swapped them out as the user scrolls?
- How would you know which rows are visible, given the scroll position and a fixed row height?

> 🔑 Search: `list virtualization React`, `@tanstack/react-virtual useVirtualizer`

---

## ⚠️ Coding Instructions

1. **Safety first.** Use TypeScript and be type-safe — no `any`, no type assertions unless genuinely necessary. Let the compiler protect you.
2. **Use modern React** and write idiomatic React code. Functional components, hooks, clean composition.
3. **Write clean, concise, modern code.** Prefer `const`, arrow functions, destructuring, optional chaining, `async/await`, and array methods over imperative loops.
4. **Naming matters.** Use short, descriptive names for variables, functions, and files. This is one of the most important signals of good engineering judgment.
5. **Use ShadCN/UI** for all UI components. It is already configured in this project. Add the components you need:
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add input
   npx shadcn@latest add table
   npx shadcn@latest add badge
   npx shadcn@latest add skeleton
   ```
   Browse all components at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).
6. **Do not use other component libraries** — no MUI, Chakra, Ant Design, etc.

---

## ⭐ Bonus Features

If you finish early, these will make your submission stand out:

- **Cancel stale requests** — use `AbortController` to cancel the previous in-flight request before firing a new one. This is the proper fix for Food for Thought #2. Most implementations have a subtle bug here — see if yours does.
- **Row virtualization** — only render the rows currently visible in the scroll area instead of all 200 at once. See Food for Thought #4. (`@tanstack/react-virtual` is the library to look at)

---

## 🔧 Working with Git

Commit as you go. **Don't save everything for one final commit** — we review your commit history in the walkthrough.

```bash
# Good commit messages
git commit -m "Add SearchBar with debounced input and Go button"
git commit -m "Implement PlayerTable with virtualised rows and skeleton"
git commit -m "Add Online/Offline status filter"
git commit -m "Fix Pagination result count off-by-one"
```

When you are done, push your branch:

```bash
git push origin feature/player-search-implementation
```

---

## 📦 Before You Submit

- [ ] SearchBar, PlayerTable, and Pagination are implemented
- [ ] Status filter works alongside text search
- [ ] Column sorting works (▲/▼ indicator on active column)
- [ ] Loading skeleton shows while waiting for results
- [ ] Error message and Retry button appear when the API fails
- [ ] Empty state shows when search returns no results
- [ ] Layout is responsive (mobile + desktop)
- [ ] Search state is reflected in the URL (`?q=&status=&page=`)
- [ ] Last query is saved and restored from `localStorage`
- [ ] Dark / Light theme toggle works in the header
- [ ] App runs without errors (`npm run dev`)
- [ ] At least 5 meaningful commits with descriptive messages
- [ ] Feature branch pushed to the repository


## 🎓 Code Walkthrough

After you submit we will schedule a short screen share. Be ready to:

1. Walk through your commit history and explain your progression
2. Pick a component and explain your implementation decisions
3. **Debounce:** show what happens in the browser if you remove the cleanup. Can you make it break live?
4. **Loading state:** what does the user see during the 600ms API delay? Can stale data ever appear?
5. **Error handling:** trigger a real error live (the API fails ~10% of calls) and walk us through the recovery flow
6. **URL sync:** open the app, search for something, copy the URL, open it in a new tab — does it restore correctly? What happens to the page number when you change the query?
7. **Responsive:** resize the browser to mobile width — does everything still work? Walk us through how you handled the table on small screens.
8. **State modeling:** can your app show an error banner *and* a data table at the same time? Should it? How does your code prevent or allow that?
9. **Live challenge:** we'll give you one small feature to add while we watch (15 min)
10. **AI usage:** walk us through what you generated vs. wrote yourself

If you have any questions during the task, don't hesitate to reach out. It's always better to ask than to go in the wrong direction — that's true in this exercise as much as it is in real software development. 🙂


Working code beats perfect code. Get something functional first, then improve it.

---

**Good luck — we're excited to see what you build!** 🚀
