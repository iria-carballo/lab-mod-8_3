export interface Carta {
  idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string; // por comodidad repetimos la url de la imagen
  alt: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

export interface InfoCarta {
  idFoto: number;
  imagen: string;
  alt: string;
}

export const infoCartas: InfoCarta[] = [
  // Aquí ponemos seis cartas siguiendo la interfaz de InfoCarta
  { idFoto: 1, imagen: "./src/img/bee.svg", alt: "abeja" },
  { idFoto: 2, imagen: "./src/img/chicken.svg", alt: "pollo" },
  { idFoto: 3, imagen: "./src/img/deer.svg", alt: "ciervo" },
  { idFoto: 4, imagen: "./src/img/fox.svg", alt: "zorro" },
  { idFoto: 5, imagen: "./src/img/owl.svg", alt: "búho" },
  { idFoto: 6, imagen: "./src/img/panda.svg", alt: "panda" },
];

const crearCartaInicial = (idFoto: number, imagen: string, alt: string): Carta => ({
  idFoto,
  imagen,
  alt,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  let infoCartaToCarta: Carta[] = [];
  for (let i = 0; i < infoCartas.length; i++) {
    const cartaCreada = crearCartaInicial(
      infoCartas[i].idFoto,
      infoCartas[i].imagen,
      infoCartas[i].alt
    );
    infoCartaToCarta.push(cartaCreada);
  }
  const baraja = structuredClone(infoCartaToCarta).concat(structuredClone(infoCartaToCarta));
  return baraja;
};

const baraja: Carta[] = crearColeccionDeCartasInicial(infoCartas);


/*
Aquí definimos el tipo de estado de la partida,
la idea es que cuando empiece la partida todas las cartas estén boca abajo
y si se hacen click sobre ellas no se volteen.

EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida
el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.


*/

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";


export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
  numeroDeIntentos: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: baraja,
  estadoPartida: "PartidaNoIniciada",
  numeroDeIntentos: 0,
});

export let tablero: Tablero = crearTableroInicial();
