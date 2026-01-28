// ================= Dummy Exchange Rates (just for testing purpose) =================
const dummyRates = {
  USD: {
    INR: 83,
    EUR: 0.92,
    AUD: 1.52,
    JPY: 148,
  },
  INR: {
    USD: 0.012,
    EUR: 0.011,
    AUD: 0.018,
  },
  EUR: {
    USD: 1.08,
    INR: 90,
  },
};

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;


    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];

  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const updateExchangeRate = () => {
  const amountInput = document.querySelector(".amount input");
  let amount = amountInput.value;

  if (amount === "" || amount < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  const rate = dummyRates[from]?.[to];

  if (!rate) {
    msg.innerText = "Exchange rate not available";
    console.log("Rate not available for", from, "to", to);
    return;
  }

  const finalAmount = (amount * rate).toFixed(2);
  console.log(`${amount} ${from} = ${finalAmount} ${to}`);
  msg.innerText = `${amount} ${from} = ${finalAmount} ${to}`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
