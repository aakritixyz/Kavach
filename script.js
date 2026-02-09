(() => {
    // 1. STATE MANAGEMENT
    const AppState = {
        journeyActive: false,
        endTime: 0,
        timerInterval: null,
        isListening: false
    };

    const Alarm = {
        ctx: null, osc: null, gain: null, interval: null,
        init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    };

    // 2. NAVIGATION
    window.navigateTo = function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        
        // Context-aware triggers
        if (id === 'stealth-screen') startVoiceTrigger();
        if (id === 'home-screen') { stopVoiceTrigger(); stopAlarm(); }
        if (id === 'blackbox-screen') startHashing();
    };

    // 3. STEALTH HANDSHAKE (Long Press)
    const trigger = document.getElementById('handshake-trigger');
    let pressTimer;
    trigger.addEventListener('mousedown', () => {
        Alarm.init(); // Warm up audio context
        pressTimer = setTimeout(() => navigateTo('home-screen'), 1000);
    });
    trigger.addEventListener('mouseup', () => clearTimeout(pressTimer));
    // Mobile Touch
    trigger.addEventListener('touchstart', (e) => {
        e.preventDefault();
        Alarm.init();
        pressTimer = setTimeout(() => navigateTo('home-screen'), 1000);
    });
    trigger.addEventListener('touchend', () => clearTimeout(pressTimer));

    // 4. VOICE TRIGGER (SpeechRecognition)
    let recognition;
    function startVoiceTrigger() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR || AppState.isListening) return;

        recognition = new SR();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
            AppState.isListening = true;
            document.getElementById('mic-status').style.display = 'block';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("Speech:", transcript);
            if (transcript.includes("help help")) {
                triggerPanic();
            }
        };

        recognition.onend = () => {
            if (AppState.isListening) recognition.start();
        };

        try { recognition.start(); } catch(e) {}
    }

    function stopVoiceTrigger() {
        AppState.isListening = false;
        if (recognition) recognition.stop();
        document.getElementById('mic-status').style.display = 'none';
    }

    function triggerPanic() {
        stopVoiceTrigger();
        navigateTo('blackbox-screen');
        triggerAlarm();
    }

    // 5. JOURNEY TIMER
    window.promptStartJourney = function() {
        const mins = prompt("Enter arrival time (minutes):", "20");
        if (mins) startJourney(parseFloat(mins));
    };

    function startJourney(mins) {
        AppState.journeyActive = true;
        AppState.endTime = Date.now() + (mins * 60000);
        const label = document.getElementById('journey-countdown');
        label.style.display = 'block';

        if (AppState.timerInterval) clearInterval(AppState.timerInterval);
        AppState.timerInterval = setInterval(() => {
            const remaining = AppState.endTime - Date.now();
            if (remaining <= 0) {
                clearInterval(AppState.timerInterval);
                label.textContent = "EXPIRED";
                triggerPanic();
            } else {
                const m = Math.floor(remaining / 60000);
                const s = Math.floor((remaining % 60000) / 1000);
                label.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
            }
        }, 1000);
    }

    // 6. ALARM SYSTEM
    window.triggerAlarm = function() {
        Alarm.init();
        if (Alarm.ctx.state === 'suspended') Alarm.ctx.resume();
        
        const osc = Alarm.ctx.createOscillator();
        const gain = Alarm.ctx.createGain();
        osc.type = 'square';
        gain.gain.setValueAtTime(0.3, Alarm.ctx.currentTime);
        osc.connect(gain).connect(Alarm.ctx.destination);
        osc.start();

        Alarm.interval = setInterval(() => {
            osc.frequency.setValueAtTime(osc.frequency.value === 1000 ? 1500 : 1000, Alarm.ctx.currentTime);
        }, 200);
        Alarm.osc = osc;
    };

    window.stopAlarm = function() {
        if (Alarm.osc) {
            Alarm.osc.stop();
            clearInterval(Alarm.interval);
            Alarm.osc = null;
        }
    };

    // 7. UI HELPERS
    window.fakeClean = function(el) {
        const text = el.innerText;
        el.innerText = "Cleaning...";
        setTimeout(() => { el.innerText = "Optimized! ✨"; setTimeout(() => el.innerText = text, 1000); }, 1500);
    };

    window.sendCheckIn = function() {
        if (AppState.timerInterval) clearInterval(AppState.timerInterval);
        document.getElementById('journey-countdown').style.display = 'none';
        document.getElementById('success-card').classList.add('show');
        if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]);
    };

    function startHashing() {
        const log = document.getElementById('hash-display');
        let i = 0;
        const interval = setInterval(() => {
            log.innerText = "SHA-256: " + Math.random().toString(16).slice(2, 16);
            if (i++ > 20) { clearInterval(interval); log.innerText = "SHA-256: 8f92b... ENCRYPTED"; }
        }, 50);
    }
})();