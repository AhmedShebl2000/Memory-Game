let chosenOne = null;
let chosenTwo = null;
let countDone = 0;
let isChecking = false; // Prevent rapid clicks

// Mapping image IDs to image paths
const imageMap = {
  1: "/memoryGame/1.gif",
  2: "/memoryGame/2.gif",
  3: "/memoryGame/3.gif",
  4: "/memoryGame/4.gif",
  5: "/memoryGame/5.gif",
  6: "/memoryGame/6.gif",
  7: "/memoryGame/2.gif",
  8: "/memoryGame/3.gif",
  9: "/memoryGame/1.gif",
  10: "/memoryGame/4.gif",
  11: "/memoryGame/5.gif",
  12: "/memoryGame/6.gif",
};

// Initialize the game
function initGame() {
  // Shuffle the cards
  shuffleCards();

  // Add event listener to play again button
  document.getElementById("play-again").addEventListener("click", function () {
    document.querySelector(".congrats").style.display = "none";
    resetGame();
  });
}

// Shuffle the cards by reassigning the image map
function shuffleCards() {
  const images = [1, 2, 3, 4, 5, 6];
  const duplicatedImages = [...images, ...images];

  // Fisher-Yates shuffle algorithm
  for (let i = duplicatedImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicatedImages[i], duplicatedImages[j]] = [
      duplicatedImages[j],
      duplicatedImages[i],
    ];
  }

  // Reassign the image map
  for (let i = 1; i <= 12; i++) {
    imageMap[i] = `/memoryGame/${duplicatedImages[i - 1]}.gif`;
  }
}

function handleClick(myImg) {
  const id = myImg.id;
  const imgElement = document.getElementById(id);

  if (isChecking || imgElement.getAttribute("src") !== "/memoryGame/Moon.gif") {
    return; // Prevent clicking same or revealed image
  }

  imgElement.setAttribute("src", imageMap[id]);

  if (!chosenOne) {
    chosenOne = imgElement;
  } else if (!chosenTwo && imgElement !== chosenOne) {
    chosenTwo = imgElement;
    isChecking = true;
    checkImages();
  }
}

function checkImages() {
  const src1 = chosenOne.getAttribute("src");
  const src2 = chosenTwo.getAttribute("src");

  if (src1 === src2) {
    console.log("Matched");
    // Add a matched class to the cards
    chosenOne.classList.add("matched");
    chosenTwo.classList.add("matched");

    chosenOne = null;
    chosenTwo = null;
    countDone += 2;
    isChecking = false;

    // Update score
    document.getElementById("score").textContent = countDone / 2;

    if (countDone === 12) {
      setTimeout(() => {
        showCongratulations();
      }, 500);
    }
  } else {
    setTimeout(() => {
      wrongShowMoon(chosenOne.id, chosenTwo.id);
    }, 1000);
  }
}

function wrongShowMoon(id1, id2) {
  document.getElementById(id1).setAttribute("src", "/memoryGame/Moon.gif");
  document.getElementById(id2).setAttribute("src", "/memoryGame/Moon.gif");
  chosenOne = null;
  chosenTwo = null;
  isChecking = false;
}

function showCongratulations() {
  document.querySelector(".congrats").style.display = "flex";

  // Trigger confetti effect
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
  });
}

function resetGame() {
  // Reset all cards
  for (let i = 1; i <= 12; i++) {
    const card = document.getElementById(i);
    card.setAttribute("src", "/Task5/memory Game/Moon.gif");
    card.classList.remove("matched");
  }

  // Reset game variables
  chosenOne = null;
  chosenTwo = null;
  countDone = 0;
  isChecking = false;

  // Reset score
  document.getElementById("score").textContent = "0";

  // Shuffle cards for a new game
  shuffleCards();
}

// Initialize the game when the page loads
window.onload = initGame;
