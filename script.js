const html = document.querySelector('html');
const focusBtn = document.querySelector('.app__card-button--focus');
const shortRestBtn = document.querySelector('.app__card-button--short');
const longRestBtn = document.querySelector('.app__card-button--long');
const buttons = document.querySelectorAll('.app__card-button');
const screenTimer = document.getElementById('timer');
const startPauseBtn = document.getElementById('start-pause');
const startPauseBtnText = document.querySelector('#start-pause span');
const startPauseBtnIcon = document.querySelector('.app__card-primary-button-icon');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const focusMusicInput = document.getElementById('alter-music');
const music = new Audio('audios/luna-rise-part-one.mp3');
music.loop = true;

let seconds = 1500;
let idInterval = null;

focusMusicInput.addEventListener('change', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
})

focusBtn.addEventListener('click', () => {
    seconds = 1500;
    changeContext('focus');
    focusBtn.classList.add('active');
})

shortRestBtn.addEventListener('click', () => {
    seconds = 300;
    changeContext('short-rest');
    shortRestBtn.classList.add('active');
})

longRestBtn.addEventListener('click', () => {
    seconds = 900;
    changeContext('long-rest');
    longRestBtn.classList.add('active');
})

function changeContext(context) {
    showTimer();

    buttons.forEach(function(context) {
        context.classList.remove('active');
    });

    html.setAttribute('data-context', context);
    banner.setAttribute('src', `/images/${context}.png`);

    switch (context) {
        case "focus":
            title.innerHTML = `
                Optimize your productivity,<br>
                    <strong class="app__title-strong">immerse yourself in what matters.</strong>
            `;
            break;
        case "short-rest":
            title.innerHTML = `
                How about taking a breath? <strong class="app__title-strong">Take a short break!</strong>
            `;
            break;
        case "long-rest": 
            title.innerHTML = `
                Time to return to the surface.<strong class="app__title-strong"> Take a long break.</strong>
            `;
            break;
        default:
            break;
    }
}

const timer = () => {
    if (seconds <= 0) {
        alert('Time is up!');
        const activeFocus = html.getAttribute('data-context') === 'focus';
        if (activeFocus) {
            const event = new CustomEvent('CompletedFocus');
            document.dispatchEvent(event);
        }
        stop();
        return
    }

    seconds -= 1;
    showTimer();
}

startPauseBtn.addEventListener('click', startOrPause);

function startOrPause() {
    if (idInterval) {
        stop();
        return
    }

    idInterval = setInterval(timer, 1000);
    startPauseBtnText.textContent = "Pause";
    startPauseBtnIcon.src = "./images/pause.png";
}

function stop() {
    clearInterval(idInterval);
    idInterval = null;
    startPauseBtnText.textContent = "Restart";
    startPauseBtnIcon.src = "./images/play_arrow.png";
}

function showTimer() {
    const time = new Date(seconds * 1000); 
    const formattedTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    screenTimer.innerHTML = `${formattedTime}`;
}

showTimer();