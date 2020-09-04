document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const resultDisplay = document.querySelector("#result");
  let width = 15;
  let currentshooterIndex = 202;
  let currentinvaderIndex = 0;
  let alieninvadersTakeDown = [];
  let result = 0;
  let direction = 1;
  let invavderId;

  // define alien invaders
  const alieninvaders = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
  ];

  // draw alien invaders
  alieninvaders.forEach((invader) =>
    squares[currentinvaderIndex + invader].classList.add("invader")
  );

  // draw the shooter
  squares[currentshooterIndex].classList.add("shooter");

  // move the shooter along a line
  function moveShooter(e) {
    squares[currentshooterIndex].classList.remove("shooter");
    switch (e.keyCode) {
      case 37:
        if (currentshooterIndex % width !== 0) {
          currentshooterIndex -= 1;
          break;
        }
      case 39:
        if (currentshooterIndex % width < width - 1) {
          currentshooterIndex += 1;
          break;
        }
    }
    squares[currentshooterIndex].classList.add("shooter");
  }

  document.addEventListener("keydown", moveShooter);

  // move the alien invader
  function moveInvaders() {
    const leftEdge = alieninvaders[0] % width === 0;
    const rightEdge =
      alieninvaders[alieninvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) {
        direction = 1;
      } else {
        direction = -1;
      }
    }
    for (let i = 0; i < alieninvaders.length; i++) {
      squares[alieninvaders[i]].classList.remove("invader");
    }

    for (let i = 0; i < alieninvaders.length; i++) {
      alieninvaders[i] += direction;
    }
    for (let i = 0; i < alieninvaders.length; i++) {
      if (!alieninvadersTakeDown.includes(i)) {
        squares[alieninvaders[i]].classList.add("invader");
      }
    }

    // decide a game over
    if (squares[currentshooterIndex].classList.contains("invader", "shooter")) {
      resultDisplay.textContent = "Game Over";
      squares[currentshooterIndex].classList.add("boom");
      clearInterval(invavderId);
    }

    for (let i = 0; i < alieninvaders.length - 1; i++) {
      if (alieninvaders[i] > squares.length - (width - 1)) {
        resultDisplay.textContent = "Game Over";
        clearInterval(invavderId);
      }
    }

    // Game win logic
    if (alieninvadersTakeDown.length === alieninvaders.length) {
      resultDisplay.textContent = "You Win !!!!";
      clearInterval(invavderId);
    }
  }
  invavderId = setInterval(moveInvaders, 500);

  // shoot aliens
  function shoot(e) {
    let laserId;
    let currentLaserIndex = currentshooterIndex;

    // move the laser from the shooter to the Invader
    function moveLaser() {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");
      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("bloom");
        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          250
        );
        clearInterval(laserId);

        const alienTakeDown = alieninvaders.indexOf(currentLaserIndex);
        alieninvadersTakeDown.push(alienTakeDown);
        result++;
        resultDisplay.textContent = result;
      }

      if (currentLaserIndex < width) {
        clearInterval(laserId);
        setTimeout(
          () => squares[currentLaserIndex].classList.remove("laser"),
          100
        );
      }
    }
    /*   document.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) {
        laserId = setInterval(moveLaser, 100);
      }
    }); */

    switch (e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100);
        break;
    }
  }

  document.addEventListener("keyup", shoot);
});
