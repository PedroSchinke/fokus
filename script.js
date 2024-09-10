const html = document.querySelector('html');
const focusBtn = document.querySelector('.app__card-button--focus');
const shortRestBtn = document.querySelector('.app__card-button--short');
const longRestBtn = document.querySelector('.app__card-button--long');
const buttons = document.querySelectorAll('.app__card-button');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const focusMusicInput = document.getElementById('alter-music');
const music = new Audio('audios/luna-rise-part-one.mp3');
music.loop = true;

focusMusicInput.addEventListener('change', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
})

focusBtn.addEventListener('click', () => {
    changeContext('focus');
    focusBtn.classList.add('active');
})

shortRestBtn.addEventListener('click', () => {
    changeContext('short-rest');
    shortRestBtn.classList.add('active');
})

longRestBtn.addEventListener('click', () => {
    changeContext('long-rest');
    longRestBtn.classList.add('active');
})

function changeContext(context) {
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