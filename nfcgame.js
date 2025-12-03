/* ===============================
   CONFIG — MAKE CHANGES HERE ONLY
================================= */
const winners = ["00", "14", "22", "31"]; // <- Add your winning tag numbers here
const majorPrize = "99";                  // <- Set your ONE grand prize tag number here
const winnerVideoID = "9g3--WyItKU";      // <- Replace with the video ID you want for winners
const majorVideoID  = "OItP8-_mjXw";      // <- Replace with Major Award video ID
const loserVideoID  = "3UC96g1A4Nc";      // <- Loser video ID
/* ================================= */


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");

  // Clean URL after loading so it shows as a title-only URL
  history.replaceState({}, "", window.location.pathname);

  const tagDisplay = document.getElementById("resultTag");
  const iconDiv    = document.getElementById("resultIcon");
  const labelDiv   = document.getElementById("resultLabel");
  const revealDiv  = document.getElementById("reveal-container");
  const body       = document.body;
  const ytFrame    = document.getElementById("ytFrame");
  const countdown  = document.createElement("div");

  // Prepare countdown element but hide until needed
  countdown.id = "countdown";
  countdown.style.display = "none";
  countdown.style.fontSize = "6em";
  countdown.style.fontWeight = "bold";
  countdown.style.animation = "flash 0.6s infinite alternate";
  body.appendChild(countdown);

  if (!tag) {
    tagDisplay.textContent = "No tag scanned yet...";
    return;
  }

  // Display tag number at top of revealed content
  tagDisplay.textContent = `Tag #${tag}`;

  // Reveal button initially hidden
  revealDiv.innerHTML = `<button id="reveal" style="display:none;">🎁 Reveal Result</button>`;

  // Decide result type
  let resultType;
  if (tag === majorPrize) resultType = "major";
  else if (winners.includes(tag)) resultType = "winner";
  else resultType = "loser";

  // "Play Video" button to start YouTube with audio
  revealDiv.innerHTML = `<button id="playVideo">🎬 Play Video</button>`;

  document.getElementById("playVideo").addEventListener("click", () => {
    // Remove Play Video button
    document.getElementById("playVideo").remove();

    // Set the video source depending on result type
    let videoID = "";
    if      (resultType === "major")  videoID = majorVideoID;
    else if (resultType === "winner") videoID = winnerVideoID;
    else if (resultType === "loser")  videoID = loserVideoID;

    // Load YouTube iframe with autoplay and audio enabled
    ytFrame.src = `https://www.youtube.com/embed/${videoID}?autoplay=1&playsinline=1&mute=0`;
  });

  // Attach countdown and reveal logic when video actually starts
  ytFrame.addEventListener("load", () => {
    // Make sure video has time to start then reveal the reveal button
    setTimeout(() => {
      document.getElementById("reveal").style.display = "block";
      startCountdown();
    }, 400);
  });

  // Run countdown 3,2,1 then show result screen
  function startCountdown() {
    countdown.style.display = "block";
    let count = 3;
    countdown.textContent = count;

    const timer = setInterval(() => {
      count--;
      countdown.textContent = count;
      if (count <= 0) {
        clearInterval(timer);
        countdown.remove();
        showResultScreen();
      }
    }, 1000);
  }

  // Show the center result screen with icon and labels
  function showResultScreen() {
    revealDiv.innerHTML = ""; // clear reveal button

    if (resultType === "major") {
      iconDiv.innerHTML  = `<div class="majorMark">❗</div>`;
      labelDiv.innerHTML = `<div id="majorLabel">MAJOR AWARD!</div>`;
      runFireworks();
      body.style.background = "black";
    }
    else if (resultType === "winner") {
      iconDiv.innerHTML  = `<div class="checkMark">✅</div>`;
      labelDiv.innerHTML = `<div id="
