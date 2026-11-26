const buildings = [
  { name: "T", buildTime: 5, rate: 1500 },
  { name: "P", buildTime: 4, rate: 1000 },
  { name: "C", buildTime: 10, rate: 2000 },
];

function getMaxProfit(n) {
  const cache = {};

  function best(currentTime) {
    // already worked this time out before
    if (cache[currentTime] !== undefined) {
      return cache[currentTime];
    }

    let maxMoney = 0;
    let combos = [[0, 0, 0]];

    // try each building one by one
    buildings.forEach((b, index) => {
      const finish = currentTime + b.buildTime;
      if (finish >= n) {
        return;
      }

      const later = best(finish);
      const money = b.rate * (n - finish) + later.maxMoney;

      // add this building to every combo from later
      const newCombos = later.combos.map((c) => {
        const copy = c.slice();
        copy[index] = copy[index] + 1;
        return copy;
      });

      if (money > maxMoney) {
        maxMoney = money;
        combos = newCombos;
      } else if (money === maxMoney) {
        combos = combos.concat(newCombos);
      }
    });

    // remove same combos that came from different orders
    const seen = {};
    const uniqueCombos = [];
    combos.forEach((c) => {
      const key = c.join(",");
      if (!seen[key]) {
        seen[key] = true;
        uniqueCombos.push(c);
      }
    });

    cache[currentTime] = { maxMoney: maxMoney, combos: uniqueCombos };
    return cache[currentTime];
  }

  const answer = best(0);
  return { maxEarnings: answer.maxMoney, solutions: answer.combos };
}

const timeInput = document.getElementById("timeInput");
const calcBtn = document.getElementById("calcBtn");
const errorBox = document.getElementById("error");
const resultBox = document.getElementById("result");

function showResult() {
  errorBox.textContent = "";
  resultBox.innerHTML = "";

  const value = timeInput.value;
  const n = Number(value);

  if (value === "" || !Number.isInteger(n) || n < 0) {
    errorBox.textContent = "Please enter a whole number (0 or more).";
    return;
  }

  const result = getMaxProfit(n);
  let list = "";
  result.solutions.forEach((s) => {
    list += `<li>T: ${s[0]} P: ${s[1]} C: ${s[2]}</li>`;
  });

  resultBox.innerHTML = `<h3>Earnings: $${result.maxEarnings}</h3>
    <h3>Solutions</h3>
    <ol>${list}</ol>`;
}

calcBtn.addEventListener("click", showResult);
timeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    showResult();
  }
});
