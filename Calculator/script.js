const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");


buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    display.value += btn.textContent;
  });
});

clear.addEventListener("click", () => {
  display.value = "";
});


equals.addEventListener("click", () => {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    display.value += key;
  } else if (key === "Enter") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    display.value = "";
  }
});
