// --- NAVIGATION LOGIC ---
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Show target screen
    document.getElementById(screenId).classList.add('active');
}

// --- FAKE CALL LOGIC ---
function triggerCall(name) {
  setTimeout(() => {
    document.body.innerHTML = `
      <div style="
        background:black;
        color:white;
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-family:Inter;
      ">
        <h2>${name}</h2>
        <p>Incoming Call…</p>
        <div style="display:flex; gap:40px; margin-top:40px;">
          <button style="background:red;padding:20px;border-radius:50%;">Decline</button>
          <button style="background:green;padding:20px;border-radius:50%;">Accept</button>
        </div>
      </div>
    `;
  }, 5000);
}

// --- SOS BUTTON LOGIC ---
let sosTimer;
let progress = 0;
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

async function startSOS() {
  sosRing.style.transition = 'stroke-dashoffset 3s linear';
  sosRing.style.strokeDashoffset = '0';

  sosPressTimer = setTimeout(async () => {
    const fakeAudio = "audio_stream_" + Date.now();
    const hash = await generateHash(fakeAudio);
    console.log("BLACKBOX HASH:", hash);

    alert("Evidence secured & fingerprint sent to cloud.");
    goTo('blackbox');
    resetSOS();
  }, 3000);
}

function cancelSOS() {
    clearInterval(sosTimer);
    document.querySelector('.sos-btn').style.transform = "scale(1)";
    setProgress(0);
}

let stealthTimer;

function startStealthUnlock() {
  stealthTimer = setTimeout(() => {
    document.getElementById('decoy').classList.remove('active');
    goTo('home');
  }, 3000);
}

function cancelStealthUnlock() {
  clearTimeout(stealthTimer);
}

let lastShake = 0;

window.addEventListener("devicemotion", (event) => {
  const acc = event.accelerationIncludingGravity;
  const force = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);

  if (force > 30) {
    const now = Date.now();
    if (now - lastShake > 2000) {
      lastShake = now;
      triggerSOSInstant();
    }
  }
});

function triggerSOSInstant() {
  goTo('sos');
  startSOS();
}

async function generateHash(data) {
  const msgUint8 = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}