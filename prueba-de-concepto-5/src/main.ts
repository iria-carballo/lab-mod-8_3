import "./style.css";

interface InfoCard {
  idFoto: number;
  image: string;
  animal: string;
}

const cards: InfoCard[] = [
  { idFoto: 1, image: "./src/img/chicken.svg", animal: "pollo" },
  { idFoto: 2, image: "./src/img/panda.svg", animal: "panda" },
];

//Crear los elementos en el DOM

const stack = [...cards, ...cards];
const container = document.getElementById("cards-container");

if (container && container) {
  const numberOfCards = stack.length;
  for (let i = 0; i < numberOfCards; i++) {
    const newCard = document.createElement("div");
    newCard.id = `card${i}`;
    newCard.className = "cards";
    const cardImg = document.createElement("img");
    cardImg.src = "./src/img/back.jpg";
    cardImg.alt = `Carta por defecto`;
    cardImg.setAttribute("data-indice-id", i.toString());

    newCard.appendChild(cardImg);

    newCard.addEventListener("click", () => {
      const indice = parseInt(
        cardImg.getAttribute("data-indice-id") || "0",
        10
      );
      cardImg.src = stack[indice].image;
      cardImg.alt = `Carta de un ${stack[i].animal}`;
    });
    container.appendChild(newCard); // Añadir la imagen al div
  }
}
