document.addEventListener("DOMContentLoaded", () => {
  // card options

  const cardArray = [
    {
      name: "fries",
      img: "images/fries.jpg",
    },
    {
      name: "fries",
      img: "images/fries.jpg",
    },
    {
      name: "icecream",
      img: "images/icecream.jpg",
    },
    {
      name: "icecream",
      img: "images/icecream.jpg",
    },
    {
      name: "cheeseburger",
      img: "images/cheeseburger.jpg",
    },
    {
      name: "cheeseburger",
      img: "images/cheeseburger.jpg",
    },
    {
      name: "hotdog",
      img: "images/hotdog.jpg",
    },
    {
      name: "hotdog",
      img: "images/hotdog.jpg",
    },
    {
      name: "milkshake",
      img: "images/milkshake.jpg",
    },
    {
      name: "milkshake",
      img: "images/milkshake.jpg",
    },
    {
      name: "pizza",
      img: "images/pizza.jpg",
    },
    {
      name: "pizza",
      img: "images/pizza.jpg",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  // game boaard
  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  resultDisplay.textContent = 0;
  var cardsChoosen = [];
  var cardChoseId = [];
  var cardsWon = [];

  // create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "images/blank.jpg");
      card.setAttribute("height", 100);
      card.setAttribute("width", 100);
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  //check for Matche function
  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = cardChoseId[0];
    const optionTwoId = cardChoseId[1];
    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/blank.jpg");
      cards[optionTwoId].setAttribute("src", "images/blank.jpg");
      alert("You have clicked the same image !!");
    } else if (cardsChoosen[0] === cardsChoosen[1]) {
      alert("You found a match");
      cards[optionOneId].setAttribute("src", "images/white.jpg");
      cards[optionTwoId].setAttribute("src", "images/white.jpg");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChoosen);
    } else {
      cards[optionOneId].setAttribute("src", "images/blank.jpg");
      cards[optionTwoId].setAttribute("src", "images/blank.jpg");
      alert("Sorry,try again");
    }
    cardsChoosen = [];
    cardChoseId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Congratulations ! You Won :)";
    }
  }

  //flip your card
  function flipCard() {
    //    alert(cardArray[0]["name"]);
    var cardId = this.getAttribute("data-id");
    //alert(cardId);
    cardsChoosen.push(cardArray[cardId]["name"]);
    cardChoseId.push(cardId);
    //alert(cardId);
    this.setAttribute("src", cardArray[cardId]["img"]);
    if (cardsChoosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  createBoard();
});
