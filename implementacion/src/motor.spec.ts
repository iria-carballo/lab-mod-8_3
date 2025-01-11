import {
  barajarCartas,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  esPartidaCompleta,
  iniciaPartida,
} from "./motor";
import { Carta, Tablero } from "./modelo";

let cartas: Carta[] = [
  {
    idFoto: 1,
    imagen: "./src/img/bee.svg",
    alt: "abeja",
    estaVuelta: false,
    encontrada: false,
  },
  {
    idFoto: 2,
    imagen: "./src/img/chicken.svg",
    alt: "pollo",
    estaVuelta: false,
    encontrada: false,
  },
  {
    idFoto: 3,
    imagen: "./src/img/deer.svg",
    alt: "ciervo",
    estaVuelta: false,
    encontrada: false,
  },
  {
    idFoto: 4,
    imagen: "./src/img/fox.svg",
    alt: "zorro",
    estaVuelta: false,
    encontrada: false,
  },
  {
    idFoto: 5,
    imagen: "./src/img/owl.svg",
    alt: "búho",
    estaVuelta: false,
    encontrada: false,
  },
  {
    idFoto: 6,
    imagen: "./src/img/panda.svg",
    alt: "panda",
    estaVuelta: false,
    encontrada: false,
  },
];

let tablero: Tablero = {
  cartas: cartas,
  estadoPartida: "CeroCartasLevantadas",
  numeroDeIntentos: 0,
};

describe("barajarCartas", () => {
  it("devolver el mismo elemento si solo hay uno", () => {
    //arrange or given
    const arrayInicial: Carta[] = [cartas[0]];
    const resultadoEsperado = [{ idFoto: 1, imagen: "./src/img/bee.svg",estaVuelta: false,
      encontrada: false, alt: "abeja" }];
    //act or when
    const resultado = barajarCartas(arrayInicial);
    //assert or then
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
  it("devolver un array vacío", () => {
    //arrange or given
    const arrayInicial: Carta[] = [];
    const resultadoEsperado: Carta[] = [];
    //act or when
    const resultado = barajarCartas(arrayInicial);
    //assert or then
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it("que no modifique el array original", () => {
    const arrayInicial: Carta[] = [...cartas];
    const nuevoArray = [...arrayInicial];
    //act or when
    const resultado = barajarCartas(arrayInicial);
    //assert or then
    expect(arrayInicial).not.toBe(resultado);
    expect(arrayInicial).toStrictEqual(nuevoArray);
  });
});

describe("sePuedeVoltearLaCarta", () => {
  it("debería devolver true si la carta no está volteada ni encontrada", () => {
    // arrange
    const indice = 0;

    // act
    const resultado = sePuedeVoltearLaCarta(tablero, indice);

    // assert
    expect(resultado).toBe(true);
  });

  it("debería devolver false si la carta ya está volteada", () => {
    // arrange
    tablero.cartas[0].estaVuelta = true;

    // act
    const resultado = sePuedeVoltearLaCarta(tablero, 0);

    // assert
    expect(resultado).toBe(false);
  });

  it("debería devolver false si la carta ya está encontrada", () => {
    // arrange
    tablero.cartas[0].encontrada = true;

    // act
    const resultado = sePuedeVoltearLaCarta(tablero, 0);

    // assert
    expect(resultado).toBe(false);
  });

  it("debería devolver false si ya hay dos cartas volteadas", () => {
    // arrange
    tablero.estadoPartida = "DosCartasLevantadas";

    // act
    const resultado = sePuedeVoltearLaCarta(tablero, 0);

    // assert
    expect(resultado).toBe(false);
  });
});

describe("voltearLaCarta", () => {
  it("debería voltear la carta y actualizar el estado a 'UnaCartaLevantada'", () => {
    // arrange
    const indice = 0;

    // act
    voltearLaCarta(tablero, indice);

    // assert
    expect(tablero.cartas[indice].estaVuelta).toBe(true);
    expect(tablero.estadoPartida).toBe("UnaCartaLevantada");
  });

  it("debería actualizar el estado a 'DosCartasLevantadas' al voltear la segunda carta", () => {
    // arrange
    tablero.estadoPartida = "UnaCartaLevantada";
    const indice = 1;

    // act
    voltearLaCarta(tablero, indice);

    // assert
    expect(tablero.cartas[indice].estaVuelta).toBe(true);
    expect(tablero.estadoPartida).toBe("DosCartasLevantadas");
  });
});

describe("sonPareja", () => {
  it("debería devolver true si dos cartas tienen el mismo idFoto", () => {
    // arrange
    const indiceA = 1;
    const indiceB = 1;

    // act
    const resultado = sonPareja(indiceA, indiceB, tablero);

    // assert
    expect(resultado).toBe(true);
  });

  it("debería devolver false si dos cartas tienen diferentes idFoto", () => {
    // arrange
    const indiceA = 0;
    const indiceB = 2;

    // act
    const resultado = sonPareja(indiceA, indiceB, tablero);

    // assert
    expect(resultado).toBe(false);
  });
});

describe("esPartidaCompleta", () => {
  it("debería devolver false si alguna carta no está encontrada", () => {
    // act
    const resultado = esPartidaCompleta(tablero);

    // assert
    expect(resultado).toBe(false);
  });

  it("debería devolver true si todas las cartas están encontradas", () => {
    // arrange
    tablero.cartas.forEach((carta) => (carta.encontrada = true));

    // act
    const resultado = esPartidaCompleta(tablero);

    // assert
    expect(resultado).toBe(true);
  });
});

describe("iniciaPartida", () => {
  it("debería resetear el tablero", () => {
    // arrange
    tablero.cartas[0].estaVuelta = true;
    tablero.cartas[0].encontrada = true;

    // act
    iniciaPartida(tablero);

    // assert
    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");
    expect(tablero.cartas.every((carta) => !carta.estaVuelta)).toBe(true);
    expect(tablero.cartas.every((carta) => !carta.encontrada)).toBe(true);
  });
});
