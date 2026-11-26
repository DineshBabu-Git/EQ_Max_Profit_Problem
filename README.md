# Max Profit Problem

A small web page that solves the "Max Profit Problem" from the Ever Quint interview assignment.

Mr. X has unlimited land on Mars and can build Theatres, Pubs and Commercial Parks. Given a total number of time units `n`, the page works out the most money he can earn and every mix of buildings (T, P, C counts) that reaches that amount.

| Building            | Build time | Earnings per operational unit |
| ------------------- | ---------- | ----------------------------- |
| Theatre (T)         | 5          | $1500                         |
| Pub (P)             | 4          | $1000                         |
| Commercial Park (C) | 10         | $2000                         |

Built with plain HTML5, CSS3 and JavaScript (ES6). No frameworks, libraries or build tools.

---

## How to run

1. Download or clone the project so `index.html`, `style.css` and `script.js` are in the same folder.
2. Double-click `index.html` to open it in any browser.
3. Type a number into the box and click **Calculate** (or press Enter).

No server or install is needed.

---

## Rules used

The PDF does not spell these out, so they were worked out from the three sample outputs and all three samples match:

1. Only one building can be under construction at a time, so buildings are built one after another.
2. A building starts earning when it finishes and keeps earning until time `n`. Its earnings are `rate * (n - finishTime)`.
3. A building that finishes at time `n` or later earns nothing, so it is never built.
4. Land size, "6 commercial spaces" and "8 auditoriums" do not affect the answer because land is unlimited.

---

## Approach

The solution uses recursion with memoization.

- `best(currentTime)` returns the most money that can still be earned if the next building starts at `currentTime`.
- For each building type, the finish time is `currentTime + buildTime`. If that is less than `n`, the earnings are `rate * (n - finish) + best(finish)`.
- The highest total is kept. If two choices tie, both count combinations are kept.
- Results are saved in a `cache` object, so each time value is only worked out once.
- Different build orders that give the same counts (for example T then P, and P then T) are shown only once.

A greedy approach does not work here. At `n = 13`, building Pubs first (they finish fastest) gives $15000, but two Theatres give $16500.

The logic lives in one function, `getMaxProfit(n)`, which returns `{ maxEarnings, solutions }`. It does not touch the page, so it can be tested on its own.

---

## Complexity

- **Time:** O(n). There are at most n + 1 different start times, and each one tries 3 building types. (Copying tied combinations adds a small extra cost.)
- **Space:** O(n) for the cache plus the recursion depth.

Limitation: the recursion goes about n / 4 levels deep, so a very large `n` (tens of thousands or more) could overflow the call stack. A bottom-up loop would avoid this.

---

## Sample inputs and expected outputs

| Input (n) | Earnings | Solutions                              |
| --------- | -------- | -------------------------------------- |
| 7         | $3000    | 1. T: 1 P: 0 C: 0<br>2. T: 0 P: 1 C: 0 |
| 8         | $4500    | 1. T: 1 P: 0 C: 0                      |
| 9         | $6000    | 1. T: 1 P: 0 C: 0<br>2. T: 0 P: 2 C: 0 |
| 11        | $11000   | 1. T: 1 P: 1 C: 0                      |
| 13        | $16500   | 1. T: 2 P: 0 C: 0                      |

For `n` from 0 to 4, nothing can be finished in time, so the result is $0 with `T: 0 P: 0 C: 0`.

Inputs that are empty, negative or not whole numbers show an error message instead of a result.

---
