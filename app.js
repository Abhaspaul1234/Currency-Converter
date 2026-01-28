const API_KEY = "6e833a4add595c2bf058de4e";

const getURL = (baseCurrency) => {
  return `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;
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

const updateExchangeRate = async () => {
  const amountInput = document.querySelector(".amount input");
  let amount = amountInput.value;

  if (amount === "" || amount < 1) {
    amount = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  try {
    const response = await fetch(getURL(from));
    const data = await response.json();

    const rate = data.conversion_rates[to];
    const finalAmount = (amount * rate).toFixed(2);

    msg.innerText = `${amount} ${from} = ${finalAmount} ${to}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate";
    console.error(error);
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
