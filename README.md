# RealPlay Back Office — Player Search Task

## Overview

You are building a **player search interface** for an operations back office. Operations teams use this screen every day to look up players by ID, email, or name, filter by online status, and page through results.

**Time limit:** 3 hours from when you start.

---

## Expected Result

This is what your finished screen should look like:

```
┌─────────────────────────────────────────────────────────────────┐
│  RealPlay Back Office                          [🌙 Dark / Light] │
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
│  │ 3846838  │ Peter Jones  │ peter@example.com │ $120.75  │ 🟢   │
│  │  ...     │  ...         │  ...              │  ...     │ ...  │
│  └──────────┴──────────────┴───────────────────┴──────────┴──────┘
│                                                                  │
│   (skeleton bars shown here while loading)                       │
│                                                                  │
│  Showing 1–10 of 200        [← Previous]  Page 1 of 20  [Next →]│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

- Search input auto-searches as the user types (after a short pause) and has a "Go" button for immediate search
- Status filter pills narrow results to All / Online / Offline — works together with the text search
- Table columns are clickable to sort ascending / descending
- While waiting for results, skeleton bars replace the table rows
- If the API fails, show an error message with a Retry button
- The dark/light toggle in the header switches the whole theme

---

## What Is Already Set Up

You don't need to configure anything — just install dependencies and start coding.

| What | Where |
|---|---|
| React 19 + TypeScript + Vite | `package.json`, `vite.config.ts` |
| Tailwind CSS v4 | `src/index.css` |
| ShadCN/UI (configured, no components added yet) | `components.json`, `src/lib/utils.ts` |
| Player TypeScript type | `src/types/player.ts` |
| 200 mock players | `src/data/mockPlayers.ts` |
| Async search API (fake, with delay + random errors) | `src/api/searchPlayers.ts` |
| App shell with state, routing hooks, and TODO placeholders | `src/App.tsx` |

> **Read `src/App.tsx` and `src/api/searchPlayers.ts` before you start.**
> The state management scaffold, API contract, and component prop signatures are already defined there.

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/doriman2112/player-search-task.git
cd player-search-task

# 2. Install dependencies
npm install

# 3. Create your feature branch
git checkout -b feature/player-search-implementation

# 4. Start the dev server
npm run dev
```

The app opens at `http://localhost:5173`. You'll see placeholder boxes where your components should go.

---

## Your Tasks

### 1. SearchBar — `src/components/SearchBar.tsx`

Build a search input with a "Go" button.

- Placeholder text: `"player_id, email, phone"`
- "Go" button triggers `onSearch(query)` immediately
- Also auto-searches as the user types — but **not on every keystroke** (see Edge Cases below)
- Disable the "Go" button when the input is empty

```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}
```

---

### 2. Status Filter

Add pill buttons or a dropdown that filters results by player status.

- Options: **All** (default) · **Online** · **Offline**
- Must work together with the text search — both active at the same time
- Call `handleStatusChange()` in `App.tsx` when the selection changes

---

### 3. PlayerTable — `src/components/PlayerTable.tsx`

Build a scrollable table of players.

- Columns: **Player ID** · **Name** · **Email** · **Balance** · **Status**
- Status comes from `player.online` (boolean) — render as a coloured badge: green = Online, grey = Offline
- When `loading` is `true`, show skeleton bars instead of rows (no stale data visible)
- The table must have a **fixed height with a scrollable body** — and only render the rows **currently visible in the scroll area** (see Edge Cases below)

```typescript
interface PlayerTableProps {
  players: Player[];
  loading: boolean;
}
```

---

### 4. Pagination — `src/components/Pagination.tsx`

Build prev/next pagination controls.

- Show: `"Showing X–Y of Z results"` (calculate X and Y from `currentPage` and `pageSize`)
- Show: `"Page N of M"`
- Previous button disabled on page 1 · Next button disabled on the last page

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

---

### 5. Wire it all together in App.tsx

- Uncomment the component imports at the top of `App.tsx`
- Replace the TODO placeholder divs with your components and their props
- Complete the debounce `useEffect` (the commented-out block shows exactly where)
- Make `handleStatusChange` trigger a new search

---

### 6. Error handling

The fake API (`src/api/searchPlayers.ts`) randomly fails ~10% of requests.

- Show a clear error message when a request fails
- Show a **Retry** button that re-runs the last search
- The user must never be left staring at a broken empty screen with no explanation

---

## UI Library — ShadCN/UI

ShadCN is configured but **no components have been added yet**. Add what you need:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add skeleton
```

Each command generates the component file in `src/components/ui/` — you then import and use it.
Full list at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).

---

## Edge Cases to Think Through

These are real problems that appear in production. You don't need to solve all of them perfectly — but you must be able to **explain your approach** in the walkthrough.

---

### Edge Case 1 — Typing too fast (debounce)

**The problem:** The user types `"john"` — that's 4 keystrokes, 4 API calls fired within a second.

**Think about:**
- How can you wait until the user *stops* typing before firing the request?
- If you set a 500ms timer on each keystroke, what do you do with the *previous* timer when a new key is pressed?
- What React feature lets you run code when a value changes and **cancel the previous run**?

> 🔑 Search: `debounce useEffect`, `useEffect cleanup setTimeout`, `clearTimeout React`

---

### Edge Case 2 — Responses arriving out of order (race condition)

**The problem:** The user types `"j"`, pauses, then types `"john"`. Two requests are in flight. The `"j"` response arrives *after* the `"john"` response. Your UI now shows the wrong results.

**Think about:**
- How do you know, when a response arrives, if it's still the *latest* one?
- Is there a browser API that lets you cancel an in-flight request?
- Could a simple counter or flag be enough to discard stale results?

> 🔑 Search: `AbortController fetch`, `ignore flag useEffect async`, `stale closure React`

---

### Edge Case 3 — Impossible UI states (state modeling)

**The problem:** With three separate state variables — `loading`, `error`, `data` — some combinations are impossible but can still happen in code: loading *and* error at the same time, or showing the table while an error banner is also shown.

**Think about:**
- Can you represent all these states as a *single* state variable with a `status` field?
- How does TypeScript stop you from rendering the table when the status is `'error'`?

> 🔑 Search: `discriminated union TypeScript`, `making impossible states impossible React`

---

### Edge Case 4 — Rendering 200+ rows (virtualization)

**The problem:** The API can return 200 players. A real back office might have 10,000. Putting 10,000 `<tr>` elements in the DOM at once causes visible lag — layout, paint, and memory cost for every node.

**Think about:**
- The user sees ~10 rows at a time. Do the other 190 need to exist in the DOM?
- What if you only rendered the rows *visible in the scroll area* and swapped them as the user scrolls?
- How would you know which rows are visible from scroll position and row height?

> 🔑 Search: `list virtualization React`, `@tanstack/react-virtual useVirtualizer`, `windowing`

---

## Bonus Features

If you finish early, these will set your submission apart:

- ⭐ **Column sorting** — click a header to sort asc/desc
- ⭐ **Empty state** — friendly message when search returns zero results
- ⭐ **URL sync** — reflect query, status, and page as GET params (`?q=john&status=online&page=2`) so searches are shareable and survive a refresh
- ⭐ **Session restore** — save the last query in `localStorage` and restore it on page load (the `STORAGE_KEY` constant in `App.tsx` is already there for you)
- ⭐ **Dark / Light theme** — the `useTheme` hook in `App.tsx` is already wired up; add a toggle button in the header
- ⭐ **Cancel stale requests** — use `AbortController` to cancel the previous request before firing a new one (solves Edge Case 2 properly)

---

## Git Guidelines

Commit as you go — **don't save everything for the end.** We look at your commit history in the walkthrough.

```bash
# Good commits
git commit -m "Add SearchBar with debounced input and Go button"
git commit -m "Implement PlayerTable with skeleton loading state"
git commit -m "Add status filter and wire to search API"
git commit -m "Fix pagination result count calculation"
```

```bash
# Bad commits
git commit -m "update"
git commit -m "fix"
git commit -m "final"
```

When you are done, push your branch:

```bash
git push origin feature/player-search-implementation
```

---

## Deliverables Checklist

Before submitting, verify:

- [ ] SearchBar, PlayerTable, and Pagination are implemented
- [ ] Status filter works alongside text search
- [ ] Loading skeleton shows while waiting for results
- [ ] Error state with Retry button works
- [ ] App runs without errors (`npm run dev`)
- [ ] 5–10 meaningful commits with descriptive messages
- [ ] Feature branch pushed to the repository
- [ ] Your notes added below

---

## Add Your Notes Here

### My Approach
*How did you break down the problem? Where did you start?*

### Decisions I Made
*What choices did you make and why? (component structure, state shape, libraries used)*

### Edge Cases I Handled
*Which of the 4 edge cases did you tackle? How did you solve each one?*

### AI Usage
*Be honest — what did you use AI for? What did you write yourself? What did you modify from AI output?*

### What I'd Improve With More Time
*What would you refactor, add, or change with another hour?*

---

## Code Walkthrough

After you submit we will schedule a 15-minute screen share. Be prepared to:

1. Walk through your commit history and explain your progression
2. Explain a specific component — we'll pick one
3. **Debounce:** show us what happens in the browser if you remove the `clearTimeout` cleanup. Can you make it break live?
4. **Loading state:** what does the user see during the 600ms API delay? Can stale data appear?
5. **Error handling:** the API fails ~10% of the time — trigger one live and walk us through the recovery flow
6. **Virtualization:** open DevTools Elements panel and scroll the table — how many `<tr>` elements are in the DOM? What would change without virtualization?
7. **State modeling:** can your app show an error banner *and* a data table at the same time? Should it? How does your code prevent or allow it?
8. **Live challenge:** we'll give you one small feature to add while we watch (15 min)
9. **AI usage:** walk us through what you generated vs. wrote yourself

---

## Time Guide

| Task | Suggested time |
|---|---|
| SearchBar + debounce | 30 min |
| Status filter | 15 min |
| PlayerTable + skeleton + virtualization | 60 min |
| Error handling | 15 min |
| Pagination | 20 min |
| Wiring + testing + cleanup | 30 min |
| **Total** | **~3 hours** |

Working code beats perfect code. Get something functional first, then improve it.

---

**Good luck — we're excited to see what you build.**

— RealPlay Engineering Team
