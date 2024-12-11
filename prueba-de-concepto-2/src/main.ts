const images: string[] = [
  "./src/img/bee.svg",
  "./src/img/chicken.svg",
  "./src/img/deer.svg",
  "./src/img/fox.svg",
  "./src/img/owl.svg",
  "./src/img/panda.svg",
];

export const randomImage = (images: string[]) => {
  const randomIndex = Math.floor(Math.random() * images.length);
  const imageUrl = images[randomIndex];

  return imageUrl;
};

//comentar de aquí para abajo para ejecutar el test para probar la funcion randomImage

const showCard = (imageUrl: string): void => {
  const cardImg = document.getElementById("cardImg");
  if (
    cardImg !== null &&
    cardImg !== undefined &&
    cardImg instanceof HTMLImageElement
    //cardImg.src === "./src/img/back.jpg"
  ) {
    if (cardImg.src.endsWith("back.jpg")) {
      cardImg.src = imageUrl;
    } else {
      cardImg.src = "./src/img/back.jpg";
    }
  }
};

const newCard = document.getElementById("cardImg");
if (newCard !== null && newCard !== undefined) {
  newCard.addEventListener("click", () => {
    showCard(randomImage(images));
  });
}
