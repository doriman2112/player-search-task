# RealPlay Back Office - Player Search Task

## 🎯 Overview

This is a starter repository for the RealPlay Frontend Engineering technical assessment. You'll be building a player search interface that operations teams use to find and review player data in the back office system.

**Time Limit:** 3 hours from when you start

## 📋 What's Already Done

We've set up the foundation so you can focus on building features:

✅ **Project Setup**
- React 18 + TypeScript configured
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
# Clone this repository (replace with actual URL)
git clone <REPOSITORY_URL>
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
npm start
```

The app will open at `http://localhost:3000` and you'll see placeholder text for the components you need to build.

## 📝 Your Tasks

### Required Features (Must Complete)

You need to implement these three components:

#### 1. **SearchBar Component** (`src/components/SearchBar.tsx`)

**Requirements:**
- Text input that accepts player ID, email, or phone
- Placeholder: `"player_id, email, phone"`
- "Go" button to trigger search
- Call `onSearch(query)` callback when user searches

**Component Interface:**
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
}
```

#### 2. **PlayerTable Component** (`src/components/PlayerTable.tsx`)

**Requirements:**
- Display players in a table format
- Show columns: Player ID, Name, Email, Balance, Status
- Accept `players` array as prop
- Style to look professional (match BO aesthetic if possible)

**Component Interface:**
```typescript
interface PlayerTableProps {
  players: Player[];
}
```

#### 3. **Pagination Component** (`src/components/Pagination.tsx`)

**Requirements:**
- "Previous" and "Next" buttons
- Show current page and total pages
- Call `onNext()` and `onPrev()` callbacks
- Handle edge cases (first page, last page)

**Component Interface:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}
```

#### 4. **Wire Everything Together in App.tsx**

- Uncomment the component imports
- Replace the TODO placeholders with your components
- Pass the correct props to each component
- Test that search, display, and pagination all work together

### Bonus Features (If Time Permits)

- ⭐ Add loading state during search (simulate with `setTimeout`)
- ⭐ Show result count: "Showing 1-10 of 25 results"
- ⭐ Disable Previous on page 1, Next on last page
- ⭐ Handle Enter key in search input
- ⭐ Show empty state when no results
- ⭐ Style to match the RealPlay BO screenshot (dark header, teal buttons)

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
- [ ] Application runs without errors (`npm start`)
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
3. **Demonstrate a specific commit** - we'll pick one and you'll show what worked at that point
4. **Explain your pagination logic** - how does it calculate which players to show?
5. **Discuss AI usage** - what did AI generate vs. what you modified and why?

### Tips for the Walkthrough

- Be ready to screen share and navigate your code
- Practice running `git log` and `git checkout <commit-hash>`
- Be able to explain **why** you made certain technical decisions
- Be honest about what you struggled with or didn't finish

## 🆘 Need Help?

If you have questions about:
- **Requirements:** Ask for clarification before starting
- **Technical setup issues:** Reach out if `npm install` or `npm start` fails  
- **Submission process:** Contact us anytime

We want you to succeed! Don't hesitate to ask.

## ⏱️ Time Management Suggestions

Here's a rough guide (adjust based on your pace):

- **45 min** - SearchBar component
- **1 hour** - PlayerTable component  
- **45 min** - Pagination component
- **30 min** - Wire everything together in App, test, clean up, commit

Remember: Working code > perfect code. Get something functional first, then improve it.

---

**Good luck! We're excited to see what you build.** 🚀

— RealPlay Engineering Team
