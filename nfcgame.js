/* ===== USER EDIT ZONE — update these IDs/links as needed ===== */
const WINNER_REDIRECT_PAGE = "https://brummy.github.io/nfctag";  
const YOUTUBE_VIDEO_ID     = "dQw4w9WgXcQ"; 
/* ============================================================ */

let player; // YouTube player instance
let countdownTimer;
let countdownValue = 5; // seconds for countdown

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 0,
      playsinline: 1, 
      rel: 0
    },
    events: {
      onReady: e => {
        e.target.playVideo(); 
        enableAudio(); 
      }
    }
  });
}

function enableAudio() {
  try {
    document.getElementById("winAudio").play();
  } catch {}
}
function enableAudio() {
  try {
    player.unMute();
    player.setVolume(100);
  } catch (err) {
    console.warn("Audio enable failed:", err);
  }
}

async function startNFCScan() {
  if (!("NDEFReader" in window)) {
    document.getElementById("status").textContent = "❌ Web NFC not supported on this phone";
    return;
  }

  try {
    const reader = new NDEFReader();
    await reader.scan();
    document.getElementById("status").textContent = "✅ Scanning for NFC tags...";

    reader.onreading = ({serialNumber}) => handleTag(serialNumber);
  } catch (err) {
    document.getElementById("status").textContent = "❌ NFC scan failed: " + err;
  }
}

function handleTag(uidString) {
  document.getElementById("status").textContent = "Tag detected ✅";

  // Convert UID string into numeric bytes (reliable)
  const bytes = uidString
    .split(":")
    .map(v => parseInt(v, 16))
    .filter(v => !isNaN(v));

  let sum = bytes.reduce((a,b) => a + b, 0);
  let tagNumber = sum % 100;

  // Fix display
  const displayNum = tagNumber.toString().padStart(2, "0");
  document.getElementById("tagOutput").textContent = "🎯 Your Tag Number: " + displayNum;

  // Determine winner/loser
  const isWinner = (sum % 2 === 0); // ✅ simple, reliable winner rule

  document.getElementById("webBtn").classList.add("hidden"); // Default hide
  if (isWinner) {
    document.getElementById("tagOutput").textContent += " 🏆 (WINNER!)";
    document.getElementById("webBtn").onclick = () => {
      location.href = WINNER_REDIRECT_PAGE; // ✅ Opens your result page
    };
    document.getElementById("webBtn").classList.remove("hidden"); // Show only if winner
  } else {
    document.getElementById("tagOutput").textContent += " ☠️ (Loser)";
    document.getElementById("webBtn").classList.add("hidden");
  }

  // Play win audio if winner
  if (isWinner) {
    document.getElementById("winAudio").currentTime = 0;
    document.getElementById("winAudio").play();
  }

  // Start countdown visual
  runCountdown();

  embedVideo();
}

function runCountdown() {
  clearInterval(countdownTimer);
  countdownValue = 5;
  document.getElementById("countdown").textContent = countdownValue;

  countdownTimer = setInterval(() => {
    countdownValue--;
    document.getElementById("countdown").textContent = countdownValue;
    if (countdownValue <= 0) clearInterval(countdownTimer);
  }, 1000);
}

function embedVideo() {
  // already handled by API
}

function enableAudio() {
  document.getElementById("winAudio").play();
}

function scriptReady() {
  console.log("Game ready, scanning...");
}

document.getElementById("scanXiao").classList.add("btn");
document.getElementById("scanXiao").onclick = startNFCScan;
document.getElementById("scanBtn").addEventListener("click", startNFCScan);
scriptReady();

function embedVideo() {
  if (!article.youtubeID) {
    console.error("YouTube ID missing for video embed.");
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=0&playsinline=1`;
  iframe.allow = "autoplay; encrypted-media; fullscreen";
  iframe.allowFullscreen = true;
  document.getElementById("player").innerHTML = "";
  document.getElementById("player").appendChild(iframe);
  iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', "*");
  iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
}
 
function playAudio() {
  document.getElementById("audio").play();
  document.getElementById("scoreDisplay").textContent = "Starting countdown...";
  startCountdown();
}

function startCountdown() {
  var countdown = 5;
  var countdownDisplay = document.getElementById("countdown");
  countdownDisplay.innerHTML = countdown;
  countdownTimer = setInterval(function() {
    countdown--;
    countdownDisplay.innerHTML = countdown;
    if(countdown <= 0) {
      clearInterval(countdownTimer);
      countdownDisplay.innerHTML = "--";
    }
  }, 1000);
}

function startCountdown(seconds) {
  const countdownEl = document.getElementById("countdown");
  countdownEl.textContent = seconds;
  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      countdownEl.textContent = "--";
    }
  }, 1000);
}

function handleNFCReading(serialNumber) {
  console.log("NFC Tag detected:", serialNumber);
  document.getElementById("scoreDisplay").textContent = "Tag UID: " + serialNumber;
  startCountdown(5);
  window.location.href = "https://brummy.github.io/nfcgame"; // redirect winner page
}

async function startNFCScan() {
  if (!("NDEFReader" in window)) {
    alert("Web NFC is not available on this device.");
    return;
  }
  try {
    const reader = new NDEFReader();
    document.getElementById("scoreDisplay").textContent = "Scanning for NFC tags...";
    await reader.scan();
    reader.onreading = ({ serialNumber }) => {
      handleNFCReading(serialNumber);
    };
  } catch (error) {
    console.error("Error during NFC scan:", error);
    alert("Failed to start NFC scan.");
  }
}

function optimizeForPhones() {
  document.body.classList.add("phone-mode");
  document.getElementById("scoreDisplay").classList.add("small-font");
}

optimizeForPhones();

/* Optional: if you want background video with sound on page load */
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 0,
      playsinline: 1,
      rel: 0
    },
    events: { onReady: e => e.target.playVideo() }
  });
}
