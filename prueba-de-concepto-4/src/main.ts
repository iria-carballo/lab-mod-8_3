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

let revealedCards = 0;

const showCard = (imageUrl: string, cardElement: Element): void => {
  const cardImg = cardElement.querySelector("img");
  if (cardImg && cardImg instanceof HTMLImageElement) {
    cardImg.src = imageUrl;
    revealedCards++;
    if (revealedCards === 2) {
        setTimeout(() => {
          resetCards();
        }, 1000); 
      }
  }
};

const resetCards = () =>{
    const everyCard = document.querySelectorAll('.cards img');
    everyCard.forEach((img)=>{
        if (img instanceof HTMLImageElement) {
            img.src = "./src/img/back.jpg";
          }
        });
        revealedCards = 0; 
    }

const newCard = document.querySelectorAll(".cards");
newCard.forEach((card) => {
    card.addEventListener('click', () => {
      showCard(randomImage(images), card);
    });
  });
