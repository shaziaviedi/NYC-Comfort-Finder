(function () {
  const questions = [
    {
      question: "When your week starts feeling heavy, what do you usually do first?",
      answers: [
        { text: "Put my phone away and sit somewhere quiet", type: "quietReset" },
        { text: "Make or buy a drink or snack I already know I like", type: "familiarRoutine" },
        { text: "Leave my room and walk without a strict plan", type: "reflectiveOuting" },
        { text: "Text someone and see if they want to hang out or study nearby", type: "lowPressureCompany" }
      ]
    },
    {
      question: "What sounds like the best place to study right now?",
      answers: [
        { text: "A quiet library", type: "quietReset" },
        { text: "A small café", type: "familiarRoutine" },
        { text: "A place with a view", type: "reflectiveOuting" },
        { text: "A shared table", type: "lowPressureCompany" }
      ]
    },
    {
      question: "What is your favorite way to get around the city if travel time is not a concern?",
      answers: [
        { text: "Taxi", type: "quietReset" },
        { text: "Subway", type: "familiarRoutine" },
        { text: "Walking", type: "reflectiveOuting" },
        { text: "Citi Bike", type: "lowPressureCompany" }
      ]
    },
    {
      question: "Which New York moment sounds the most appealing right now?",
      answers: [
        { text: "Stepping into somewhere unexpectedly calm", type: "quietReset" },
        { text: "Finding a place that serves something I already know I will like", type: "familiarRoutine" },
        { text: "Taking the long way somewhere just because the walk feels nice", type: "reflectiveOuting" },
        { text: "Running into someone I know and stay together a little longer", type: "lowPressureCompany" }
      ]
    },
    {
      question: "If you could turn into a New York animal for a day, which would you choose?",
      answers: [
        { text: "Cat", type: "quietReset" },
        { text: "Dog", type: "lowPressureCompany" },
        { text: "Pigeon", type: "reflectiveOuting" },
        { text: "Squirrel", type: "familiarRoutine" }
      ]
    },
    {
      question: "Which of these New York parks would you most like to spend time in today?",
      answers: [
        { text: "Jefferson Market Garden", type: "quietReset" },
        { text: "Bryant Park", type: "familiarRoutine" },
        { text: "Central Park", type: "reflectiveOuting" },
        { text: "Washington Square Park", type: "lowPressureCompany" }
      ]
    },
    {
      question: "If you had an unexpected free afternoon, what would feel most appealing?",
      answers: [
        { text: "Staying in and doing very little", type: "quietReset" },
        { text: "Eating comfort food", type: "familiarRoutine" },
        { text: "Exploring somewhere on my own", type: "reflectiveOuting" },
        { text: "Catching up with an old friend", type: "lowPressureCompany" }
      ]
    },
    {
      question: "What kind of weather fits your mood today?",
      answers: [
        { text: "A quiet cloudy day", type: "quietReset" },
        { text: "Light rain and staying indoors", type: "familiarRoutine" },
        { text: "Cool weather for a long walk", type: "reflectiveOuting" },
        { text: "Golden hour when everyone is still out", type: "lowPressureCompany" }
      ]
    }
  ];

  const results = {
    quietReset: {
      title: "Quiet Reset",
      description:
        "You recharge best by lowering the volume of the city for a little while. This comfort type is about stepping into spaces that feel calmer, quieter, and less demanding. When everything feels overstimulating, stillness and soft focus may help you feel more grounded.",
      suggestions: [
        "Spend 20 minutes at Jefferson Market Garden in Greenwich Village",
        "Sit by yourself at Greenacre Park and just listen to the waterfall",
        "Find a quiet floor or study spot at the Stavros Niarchos Foundation Library",
        "Walk slowly through the Conservatory Garden in Central Park",
        "Visit The Noguchi Museum for a quieter indoor-outdoor reset"
      ]
    },
    familiarRoutine: {
      title: "Familiar Routine",
      description:
        "You may feel better through familiarity and small rituals that make the day feel steadier. This comfort type is about returning to something reliable, like a favorite food or place. When the city feels too big or distant, routine can help it feel more manageable.",
      suggestions: [
        "Pick a regular seat at Bryant Park’s Reading Room and stay with a book or magazine",
        "Browse Kinokuniya across from Bryant Park for books, stationery, or comfort purchases",
        "Get an Indonesian bowl from Jakarta Munch at Urban Hawker",
        "Visit Indo Java Groceries in Elmhurst for Indonesian groceries and familiar flavors",
        "Settle into Housing Works Bookstore Cafe with the same drink or snack you love"
      ]
    },
    reflectiveOuting: {
      title: "Reflective Outing",
      description:
        "You seem to reset best through movement, light exploration, and a gentle change of scenery. This comfort type is less about adventure and more about giving yourself room to wander and think. A calm solo outing may help you feel clearer and more grounded.",
      suggestions: [
        "Browse on your own at McNally Jackson and let yourself linger without a plan",
        "Take a slow walk through the Conservatory Garden in Central Park",
        "Go to Little Island and wander until you find a place to sit",
        "Walk along Domino Park around golden hour and watch the river",
        "Take the NYC Ferry East River route just for the views and the reset"
      ]
    },
    lowPressureCompany: {
      title: "Low-Pressure Company",
      description:
        "You may not need a big social plan, just gentle connection. This comfort type is about being around people in a way that feels easy, unforced, and emotionally light. Instead of intense socializing, casual shared time may help you feel more supported.",
      suggestions: [
        "Meet a friend at Bryant Park and borrow a board game or try pétanque",
        "Catch up quietly at Housing Works Bookstore Cafe in SoHo",
        "Sit together in Washington Square Park and people-watch for a while",
        "Take the NYC Ferry East River route with a friend and just talk along the way",
        "Check McNally Jackson’s event calendar and go to a reading or book club with someone"
      ]
    }
  };

  const TYPE_ORDER = [
    "quietReset",
    "familiarRoutine",
    "reflectiveOuting",
    "lowPressureCompany"
  ];

  const elLanding = document.getElementById("screen-landing");
  const elQuiz = document.getElementById("screen-quiz");
  const elResult = document.getElementById("screen-result");
  const btnStart = document.getElementById("btn-start-quiz");
  const btnQuizBack = document.getElementById("quiz-btn-back");
  const btnRetake = document.getElementById("btn-retake");
  const btnSave = document.getElementById("btn-save-result");
  const elProgressInner = document.querySelector(
    "#quiz-progress-label .quiz-progress-strip__inner"
  );
  const elQuestionText = document.getElementById("quiz-question-text");
  const elAnswers = document.getElementById("quiz-answers");
  const panelActive = document.getElementById("quiz-panel-active");
  const elQuizWrap = document.querySelector(".quiz__wrap");
  const elResultTitle = document.getElementById("result-title");
  const elResultDescription = document.getElementById("result-description");
  const elResultSuggestions = document.getElementById("result-suggestions");
  const elResultCapture = document.getElementById("result-capture");

  let currentIndex = 0;
  /** @type {string[]} */
  let answers = [];

  function showScreen(name) {
    const isLanding = name === "landing";
    const isQuiz = name === "quiz";
    const isResult = name === "result";

    elLanding.hidden = !isLanding;
    elLanding.setAttribute("aria-hidden", isLanding ? "false" : "true");

    elQuiz.hidden = !isQuiz;
    elQuiz.setAttribute("aria-hidden", isQuiz ? "false" : "true");

    elResult.hidden = !isResult;
    elResult.setAttribute("aria-hidden", isResult ? "false" : "true");
  }

  function resetQuizState() {
    currentIndex = 0;
    answers = [];
  }

  function getDominantComfortType(answerList) {
    const counts = { quietReset: 0, familiarRoutine: 0, reflectiveOuting: 0, lowPressureCompany: 0 };
    answerList.forEach(function (t) {
      if (counts[t] !== undefined) counts[t] += 1;
    });
    let best = TYPE_ORDER[0];
    let bestN = -1;
    TYPE_ORDER.forEach(function (k) {
      if (counts[k] > bestN) {
        bestN = counts[k];
        best = k;
      }
    });
    return best;
  }

  function renderResult(dominantKey) {
    const data = results[dominantKey];
    if (!data || !elResultTitle || !elResultDescription || !elResultSuggestions) return;

    elResultTitle.textContent = "Comfort Type: " + data.title;
    elResultDescription.textContent = data.description;

    elResultSuggestions.innerHTML = "";
    data.suggestions.forEach(function (text) {
      const li = document.createElement("li");
      li.textContent = text;
      elResultSuggestions.appendChild(li);
    });
  }

  function goToResultFromAnswers() {
    const dominant = getDominantComfortType(answers);
    renderResult(dominant);
    showScreen("result");
  }

  function renderQuiz() {
    if (!elProgressInner || !elQuestionText || !elAnswers || !panelActive) {
      return;
    }

    panelActive.hidden = false;

    const q = questions[currentIndex];
    if (elQuizWrap) {
      // Q1 and Q4: reduce bottom whitespace.
      elQuizWrap.classList.toggle("quiz--compact-bottom", currentIndex === 0 || currentIndex === 3);
      // Q1 and Q4: give first answer more white space.
      elQuizWrap.classList.toggle("quiz--first-answer-roomy", currentIndex === 0 || currentIndex === 3);
      // Q1 and Q4: move polaroid higher to match last-answer top edge.
      elQuizWrap.classList.toggle("quiz--polaroid-higher", currentIndex === 0 || currentIndex === 3);
      // Q2, Q3, Q5-Q7: move polaroid lower; Q8 stays as baseline reference.
      elQuizWrap.classList.toggle(
        "quiz--polaroid-lower",
        currentIndex === 1 ||
          currentIndex === 2 ||
          currentIndex === 4 ||
          currentIndex === 5 ||
          currentIndex === 6
      );
    }
    elProgressInner.textContent =
      "Question " + (currentIndex + 1) + " of " + questions.length;
    elQuestionText.textContent = q.question;

    elAnswers.innerHTML = "";
    elAnswers.setAttribute("aria-label", "Answers for question " + (currentIndex + 1));

    q.answers.forEach(function (ans, i) {
      const cell = document.createElement("div");
      cell.className = "quiz-answer-cell";
      if (i === 2) cell.classList.add("quiz-answer-cell--2");
      if (i === 3) cell.classList.add("quiz-answer-cell--3");

      const tape = document.createElement("span");
      tape.className = "quiz-answer-tape quiz-answer-tape--" + i;
      tape.setAttribute("aria-hidden", "true");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-answer quiz-answer--" + i;
      btn.textContent = ans.text;
      btn.addEventListener("click", function () {
        onAnswer(ans.type);
      });

      cell.appendChild(tape);
      cell.appendChild(btn);
      elAnswers.appendChild(cell);
    });
  }

  function onAnswer(type) {
    answers[currentIndex] = type;
    if (currentIndex === questions.length - 1) {
      goToResultFromAnswers();
      return;
    }
    currentIndex += 1;
    renderQuiz();
  }

  function goBackFromQuiz() {
    if (currentIndex === 0) {
      resetQuizState();
      showScreen("landing");
      return;
    }
    currentIndex -= 1;
    answers.pop();
    renderQuiz();
  }

  function startQuiz() {
    resetQuizState();
    showScreen("quiz");
    renderQuiz();
  }

  function retakeQuiz() {
    resetQuizState();
    showScreen("quiz");
    renderQuiz();
  }

  function saveResultAsImage() {
    if (!elResultCapture) return;
    if (typeof html2canvas !== "function") {
      window.alert("Could not load image tools. Check your network and try again.");
      return;
    }

    if (btnSave) {
      btnSave.disabled = true;
    }

    var done = function () {
      if (btnSave) btnSave.disabled = false;
    };

    var run = function () {
      html2canvas(elResultCapture, {
        scale: 2,
        backgroundColor: "#e4dcc8",
        useCORS: true,
        logging: false
      })
        .then(function (canvas) {
          canvas.toBlob(function (blob) {
            done();
            if (!blob) {
              window.alert("Could not create image file.");
              return;
            }
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "nyc-comfort-finder-result.png";
            a.rel = "noopener";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
          }, "image/png");
        })
        .catch(function () {
          done();
          window.alert("Could not save image. Try again.");
        });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run).catch(run);
    } else {
      run();
    }
  }

  if (btnStart) {
    btnStart.addEventListener("click", startQuiz);
  }
  if (btnQuizBack) {
    btnQuizBack.addEventListener("click", goBackFromQuiz);
  }
  if (btnRetake) {
    btnRetake.addEventListener("click", retakeQuiz);
  }
  if (btnSave) {
    btnSave.addEventListener("click", saveResultAsImage);
  }
})();
