import { randomImage } from "./main";

describe("ramdonImage", () => {
  it("devuelve uno de los elementos de array", () => {
    // Arrange
    const initialArray: string[] = [
      "./src/img/bee.svg",
      "./src/img/chicken.svg",
      "./src/img/deer.svg",
      "./src/img/fox.svg",
      "./src/img/owl.svg",
      "./src/img/panda.svg",
    ];
    //act or when
    const resultado = randomImage(initialArray);
    //assert or then
    expect(initialArray).toContain(resultado);
  });
});