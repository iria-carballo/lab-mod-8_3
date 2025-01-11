import { tablero } from "./modelo";

import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  iniciaPartida,
  sonPareja,
  parejaNoEncontrada,
  parejaEncontrada,
  esPartidaCompleta,
} from "./motor";

const botonIniciarPartida = document.getElementById("nueva-partida");
const contenedorJuego = document.getElementById("contenedor-tablero");
const contenedorTablero = document.getElementById("contenedor");

let partida = iniciaPartida(tablero);

// Iniciar partida
const iniciarPartidaUI = () => {
  cargarTablero();
  const cartasUi = document.querySelectorAll(".cartas");
  cartasUi.forEach((cartaUi) => {
    cartaUi.addEventListener("click", () => manejarClickCarta(cartaUi));
  });
};

if (botonIniciarPartida instanceof HTMLButtonElement) {
  botonIniciarPartida.addEventListener("click", iniciarPartidaUI);
}

// Crear tablero de juego
const cargarTablero = () => {
  eliminarIntro();
  crearElementoHTML("p", "intentos", "intentos", `Intentos: 0`);
  crearGridDeCartas(partida.cartas.length);
  crearElementoHTML(
    "button",
    "reset-partida",
    "reset-partida",
    "Reiniciar Partida"
  );
  const resetPartida = document.getElementById("reset-partida");
  if (resetPartida instanceof HTMLButtonElement && resetPartida) {
    resetPartida.addEventListener("click", resetearPartida);
  } else {
    console.log("no se ha encontrado el boton de resetear partida");
  }
};

// Manejar el click de una carta
const manejarClickCarta = (cartaUi: Element) => {
  const indiceCarta = obtenerIndiceCarta(cartaUi);

  if (sePuedeVoltearLaCarta(partida, indiceCarta)) {
    voltearCartaYActualizarEstado(cartaUi, indiceCarta);
  } else {
    alert("No se puede voltear la carta");
  }

  if (partida.estadoPartida === "DosCartasLevantadas") {
    manejarDosCartasLevantadas();
  }
};

// Manejar dos cartas levantadas
const manejarDosCartasLevantadas = () => {
  partida.numeroDeIntentos++;
  pintarNumeroDeIntentos();
  const cartaA = partida.indiceCartaVolteadaA;
  const cartaB = partida.indiceCartaVolteadaB;

  if (cartaA !== undefined && cartaB !== undefined) {
    if (sonPareja(cartaA, cartaB, partida)) {
      parejaEncontrada(partida, cartaA, cartaB);
      if (esPartidaCompleta(partida)) {
        setTimeout(() => {
          alert("¡Feclidades!¡Has ganado!");
        }, 200);
      }
    } else {
      setTimeout(() => {
        resetearImagenCartaSiNoSonPareja(cartaA, cartaB);
        parejaNoEncontrada(partida, cartaA, cartaB);
      }, 2000);
    }
  }
};

// Reiniciar partida
const resetearPartida = () => {
  partida = iniciaPartida(tablero);
  pintarNumeroDeIntentos();
  const cartasImg = document.querySelectorAll(".cartas img");
  cartasImg.forEach((cartaImg) => {
    if (cartaImg instanceof HTMLImageElement && cartaImg) {
      cartaImg.src = "./src/img/back.jpg";
    }
  });
};

// Otras funciones

const eliminarIntro = () => {
  const introDiv = document.getElementById("intro");
  if (introDiv) {
    introDiv.remove();
  }
};

const crearElementoHTML = (
  elemento: string,
  clase: string,
  id: string,
  contenido: string
) => {
  const nuevoElemento = document.createElement(elemento);
  nuevoElemento.className = clase;
  nuevoElemento.id = id;
  nuevoElemento.innerHTML = contenido;
  if (contenedorTablero) {
    contenedorTablero.appendChild(nuevoElemento);
  }
};

const crearGridDeCartas = (numeroDeCartas: number) => {
  for (let i = 0; i < numeroDeCartas; i++) {
    const nuevaCarta = document.createElement("div");
    nuevaCarta.id = `carta${i}`;
    nuevaCarta.className = "cartas";
    nuevaCarta.setAttribute("data-indice-id", i.toString());
    const imgCarta = document.createElement("img");
    imgCarta.className = "carta-img";
    imgCarta.src = "./src/img/back.jpg";
    imgCarta.alt = `Carta por defecto`;
    nuevaCarta.appendChild(imgCarta);
    if (contenedorJuego) {
      contenedorJuego.appendChild(nuevaCarta);
    }
  }
};

const pintarNumeroDeIntentos = () => {
  const numeroDeIntentos = partida.numeroDeIntentos.toString();
  const intentosElement = document.getElementById("intentos");
  if (intentosElement) {
    intentosElement.innerHTML = `Intentos: ${numeroDeIntentos}`;
  }
};

const obtenerIndiceCarta = (cartaUi: Element): number => {
  return parseInt(cartaUi.getAttribute("data-indice-id") || "0", 10);
};

const voltearCartaYActualizarEstado = (
  cartaUi: Element,
  indiceCarta: number
) => {
  voltearLaCarta(partida, indiceCarta);

  if (partida.estadoPartida === "UnaCartaLevantada") {
    partida.indiceCartaVolteadaA = indiceCarta;
  } else if (partida.estadoPartida === "DosCartasLevantadas") {
    partida.indiceCartaVolteadaB = indiceCarta;
  }

  actualizarImagenCarta(cartaUi, indiceCarta);
};

const actualizarImagenCarta = (cartaUi: Element, indiceCarta: number) => {
  const imgCarta = cartaUi.querySelector("img");

  if (imgCarta) {
    imgCarta.src = partida.cartas[indiceCarta].imagen;
    imgCarta.alt = partida.cartas[indiceCarta].alt;
  }
};

const resetearImagenCartaSiNoSonPareja = (
  cartaIdA: number,
  cartaIdB: number
) => {
  const cartaA = document.querySelector(`[data-indice-id="${cartaIdA}"]`);
  const cartaB = document.querySelector(`[data-indice-id="${cartaIdB}"]`);

  if (cartaA) {
    const imgCartaA = cartaA.querySelector("img");
    if (imgCartaA) {
      imgCartaA.src = "./src/img/back.jpg";
    }
  }

  if (cartaB) {
    const imgCartaB = cartaB.querySelector("img");
    if (imgCartaB) {
      imgCartaB.src = "./src/img/back.jpg";
    }
  }
};
