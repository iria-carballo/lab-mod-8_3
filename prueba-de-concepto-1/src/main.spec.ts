import { shuffleArray } from "./main";

describe("shuffleArray", () => {
  it("devolver el mismo elemento si solo hay uno", () => {
    //arrange or given
    const initialArray: number[] = [1];
    const resultadoEsperado: number[] = [1];
    //act or when
    const resultado = shuffleArray(initialArray);
    //assert or then
    expect(resultado).toStrictEqual(resultadoEsperado);
  });
  it("devolver un array vacío", () => {
    //arrange or given
    const initialArray: number[] = [];
    const resultadoEsperado: number[] = [];
    //act or when
    const resultado = shuffleArray(initialArray);
    //assert or then
    expect(resultado).toStrictEqual(resultadoEsperado);
  });

  it("que no modifique el array original", ()=> {
    const initialArray: number[] = [1,2,3,4,5];
    const newInitialArray = [...initialArray];
    //act or when
    const resultado = shuffleArray(initialArray);
    //assert or then
    expect(initialArray).not.toBe(resultado);
    expect(initialArray).toStrictEqual(newInitialArray);
  })
});
