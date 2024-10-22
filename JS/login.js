//using gsap 3.11.4

/* >>> >>> >>> >>> >>> Declaracion de las variables <<< <<< <<< <<< <<< */
let buttons = document.querySelectorAll(".button-skin");
let inputs = document.querySelectorAll(".inputText-skin");
let loginTitle = document.querySelector(".loginTitle-skin");
let novaresTitle = document.querySelector(".novaresTitle-skin");
let novaresTitle2 = document.querySelector(".novaresTitle2-skin");
let background = document.querySelector(".background-skin");
let login = document.querySelector(".login-skin");
let bodyContainer = document.querySelector(".bodyContainer-skin");
let header = document.querySelector(".header-skin");
let article = document.querySelector(".article-skin");
let downloads = document.querySelectorAll(".download-skin");
let endSession = document.querySelector(".endSession-skin");

let button = document.querySelector(".button-skin");
let numEmpleado = document.getElementById("numEmpleado");
let rfc = document.getElementById("rfc");

let showLogin = true;

/* >>> >>> >>> >>> >>> Verificar si esta iniciada la sesion <<< <<< <<< <<< <<< */
if (localStorage.getItem("login") === "true") {
  showLogin = false;
}

if (showLogin === false) {
  background.style.display = "none";
  login.style.display = "none";

  bodyContainer.style.display = "flex";
  bodyContainer.style.justifyContent = "space-between";
  bodyContainer.style.alignItems = "center";
  bodyContainer.style.flexDirection = "column";


  header.style.display = "flex";
  article.style.display = "flex";
}

/* >>> >>> >>> >>> >>> novaresTitle redireccion en nueva ventana <<< <<< <<< <<< <<< */
novaresTitle.addEventListener("click", () => {
  window.open("https://www.novaresteam.com/", "_blank");
});

novaresTitle2.addEventListener("click", () => {
  window.open("https://www.novaresteam.com/", "_blank");
})


/* >>> >>> >>> >>> >>> Animacion de los botones <<< <<< <<< <<< <<< */
buttons.forEach(button => {
  button.addEventListener("mouseover", () => {
    gsap.to(button, { duration: 0.3, backgroundColor: "#ffffff", color: "#000000", boxShadow: "#ffffff 0px 0px 10px 0px" });
  });

  button.addEventListener("mouseout", () => {
    gsap.to(button, { duration: 0.3, backgroundColor: "#000000", color: "#ffffff", boxShadow: "none" });
  });
});

/* >>> >>> >>> >>> >>> Animacion del los boton download <<< <<< <<< <<< <<< */
downloads.forEach(download => {
  download.addEventListener("mouseover", () => {
    gsap.to(download, { duration: 0.3, backgroundColor: "#ffffff", color: "#000000", boxShadow: "#ffffff 0px 0px 10px 0px" });
  });

  download.addEventListener("mouseout", () => {
    gsap.to(download, { duration: 0.3, backgroundColor: "#000000", color: "#ffffff", boxShadow: "none" });
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

/* >>> >>> >>> >>> >>> Animacion de todos los h2 de LoginTitleH2 <<< <<< <<< <<< <<< */ 
    let loginTitleH2 = loginTitle.querySelectorAll('h2');

    loginTitleH2.forEach(loginTitleH2 => {
        loginTitleH2.addEventListener("mouseover", () => {
            gsap.to(loginTitleH2, { duration: 0.2, color: "#000000", textShadow: "0 0 0.1em #fff, 0 0 0.1em #fff, 0 0 0.1em #fff, 0 0 0.1em #fff" });
        });
    
        loginTitleH2.addEventListener("mouseout", () => { 
            gsap.to(loginTitleH2, { duration: 0.2, color: "#ffffff", textShadow: "0 0 0.1em #000, 0 0 0.1em #000, 0 0 0.1em #000, 0 0 0.1em #000" });
        });
    });

/* >>> >>> >>> >>> >>> Peticion post para inicio de sesion <<< <<< <<< <<< <<< */

button.addEventListener("click", () => {
  axios.post("back.php", new URLSearchParams({
    numEmpleado: numEmpleado.value,
    rfc: rfc.value
  })).then((response) => {
    if (response.data === true) {
      localStorage.setItem("numEmpleado", numEmpleado.value);
      localStorage.setItem("rfc", rfc.value);
      localStorage.setItem("login", "true");
      console.log("Se inicio sesion");
      window.location.reload();
    }
    else if (response.data === false) {
      alert("Usuario o contraseña incorrectos");
    }
    else {
      console.log("Ocurrio un error de peticion");
    }
  }).catch((error) => {
    console.log("Ocurrio un error de axios");
  })
});

/* >>> >>> >>> >>> >>> Cerrar sesion <<< <<< <<< <<< <<< */
endSession.addEventListener("click", () => {
  localStorage.setItem("login", "false");
  window.location.reload();
});

/* >>> >>> >>> >>> >>> Preloader <<< <<< <<< <<< <<< */
let preloader = document.getElementById('preloader-container');
let ocultarPreloader = () => {
  gsap.to(preloader, { duration: 0.5, opacity: 0, display: "none" });
}

window.addEventListener("load", ocultarPreloader);