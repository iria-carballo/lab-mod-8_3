import "./style.css";

const cartas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function shuffleArray(array: number[]): number[] {
  //Creamos un nuevo array para no modificar el original
  const newArray = [...array];

  let currentIndex = newArray.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Intercambiar los elementos
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

const result = shuffleArray(cartas);

console.log(result);
console.log(cartas);
