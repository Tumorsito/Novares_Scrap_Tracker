//using gsap 3.11.4

/* >>> >>> >>> >>> >>> Declaracion de las variables <<< <<< <<< <<< <<< */
let buttons = document.querySelectorAll(".button-skin");
let inputs = document.querySelectorAll(".inputText-skin");
let loginTitle = document.querySelectorAll("loginTitle-skin");

/* >>> >>> >>> >>> >>> Animacion de los botones <<< <<< <<< <<< <<< */
buttons.forEach(button => {
  button.addEventListener("mouseover", () => {
    gsap.to(button, { duration: 0.3, backgroundColor: "#ffffff", color: "#000000", boxShadow: "#ffffff 0px 0px 10px 0px" });
  });

  button.addEventListener("mouseout", () => {
    gsap.to(button, { duration: 0.3, backgroundColor: "#000000", color: "#ffffff", boxShadow: "none" });
  });
});

/* >>> >>> >>> >>> >>> Animacion de los inputs <<< <<< <<< <<< <<< */
inputs.forEach(input => {
  input.addEventListener("mouseover", () => {
    gsap.to(input, { duration: 0.3, boxShadow: "#ffffff 0px 0px 10px 0px" });
  });

  input.addEventListener("mouseout", () => {
    gsap.to(input, { duration: 0.3, boxShadow: "none" });
  });

  input.addEventListener("focus", () => {
    gsap.to(input, { duration: 0.3, backgroundColor: "#ffffff", color: "#000000" });
    document.documentElement.style.setProperty('--selection-color', '#ffffff');
    document.documentElement.style.setProperty('--selection-background', '#000000');
  });

  input.addEventListener("blur", () => {
    gsap.to(input, { duration: 0.3, backgroundColor: "#000000", color: "#ffffff" });
    document.documentElement.style.setProperty('--selection-color', '#000000');
    document.documentElement.style.setProperty('--selection-background', '#ffffff');
  });

  
});


