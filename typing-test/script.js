const randomWords = [
    "run", "jump", "believe", "create", "discover", "explore", "imagine", "inspire", "learn", "understand",
    "remember", "forget", "build", "over", "before", "after", "beside", "beneath", "inside", "outside", "near",
    "beyond", "toward", "apple", "house", "river", "mountain", "ocean", "sun", "moon", "star", "forest", "desert",
    "love", "hope", "dream", "fear", "joy", "sorrow", "anger", "patience", "wisdom", "courage", "truth", "power",
    "energy", "future", "idea", "break", "change", "decide", "help", "move", "work", "play", "laugh", "cry", "grow",
    "wait", "share", "trust", "fight", "win", "lose", "lead", "follow", "quickly", "slowly", "happily", "sadly",
    "angrily", "USA", "Canada", "write", "read", "speak", "listen", "sing", "dance", "walk", "think", "Brazil",
    "Germany", "France", "Japan", "India", "eagerly", "quietly", "loudly", "softly", "boldly", "always", "never",
    "sometimes", "rarely", "often", "seldom", "Einstein", "Newton", "Shakespeare", "Mozart", "Cleopatra",
    "Napoleon", "Lincoln", "Tesla", "Plato", "Mandela", "soon", "later", "now", "then", "and", "but", "or", "nor",
    "so", "yet", "because", "although", "since", "unless", "in", "on", "at", "by", "with", "about", "against",
    "between", "through", "under", "goal", "shadow", "mirror", "music", "storm", "Australia", "Russia", "Egypt"
  ];
  
 
  const passage = document.querySelector(".text-display");
  const input = document.querySelector("#text-input");
  const timer = document.querySelector("#timer");
  const rsBtn = document.getElementById("restart-btn");
  const accuracyDisplay = document.querySelector("#accuracy");
  const wpmDisplay = document.querySelector("#wpm");
  
  let time = 15;
  let timerInterval = null;
  let currentPassage = '';
  
  
  function loadPassage() {
    let wordsArray = [];
    for (let i = 0; i < 50; i++) {
      wordsArray.push(randomWords[Math.floor(Math.random() * randomWords.length)]);
    }
    currentPassage = wordsArray.join(" ");
    passage.innerText = currentPassage;
  }
 
  function calculateAccuracy() {
    const typedText = input.value;
    const passageText = currentPassage;
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === passageText[i]) {
        correctChars++;
      }
    }
    const totalTypedChars = typedText.length;
    const accuracy = totalTypedChars > 0 ? (correctChars / totalTypedChars) * 100 : 0;
    accuracyDisplay.textContent = `${accuracy.toFixed(1)}%`;
    //wpm calculation
    const rawWpm = parseInt((totalTypedChars/5)*4);
    const netWpm = parseInt(rawWpm * (correctChars / totalTypedChars));
    wpmDisplay.textContent = `${netWpm}`;;
    
  }
 

  input.addEventListener("input", () => {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        time--;
        timer.innerText = time;
        if (time === 0) {
          clearInterval(timerInterval);
          input.disabled = true;
        }
      }, 1000);
    }
    calculateAccuracy();
  });
  
  rsBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 15;
    timer.innerText = time;
    input.value = "";
    input.disabled = false;
    loadPassage();
    accuracyDisplay.textContent = "0.0%";
  });

  loadPassage();