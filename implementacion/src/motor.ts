import { Carta, Tablero } from "./modelo";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  //export function shuffleArray(array: number[]): number[] {
  //Creamos un nuevo array para no modificar el original
  const cartasBarajadas = [...cartas];

  let indiceActual = cartasBarajadas.length;
  let indiceAleatorio;

  while (indiceActual !== 0) {
    indiceAleatorio = Math.floor(Math.random() * indiceActual);
    indiceActual--;

    // Intercambiar los elementos
    [cartasBarajadas[indiceActual], cartasBarajadas[indiceAleatorio]] = [
      cartasBarajadas[indiceAleatorio],
      cartasBarajadas[indiceActual],
    ];
  }

  return cartasBarajadas;
};

//Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const carta = tablero.cartas[indice];

  return (
    !carta.estaVuelta &&
    !carta.encontrada &&
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const carta = tablero.cartas[indice];
  carta.estaVuelta = true;
  if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
  } else {
    tablero.estadoPartida = "UnaCartaLevantada";
  }
};

// Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

//Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.indiceCartaVolteadaA = -1;
  tablero.indiceCartaVolteadaB = -2;

  tablero.estadoPartida = esPartidaCompleta(tablero)
    ? "PartidaCompleta"
    : "CeroCartasLevantadas";
};

// Aquí asumimos que no son pareja y las volvemos a poner boca abajo

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.indiceCartaVolteadaA = -1;
  tablero.indiceCartaVolteadaB = -2;

  tablero.estadoPartida = "CeroCartasLevantadas";
};

//  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

//Iniciar partida

export const iniciaPartida = (tablero: Tablero): Tablero => {
  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.numeroDeIntentos = 0;
  tablero.indiceCartaVolteadaA = -1;
  tablero.indiceCartaVolteadaB = -2;
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
  return tablero;
};
