const facts = [
    "Cats sleep a lot, often up to 16 hours a day.",
    "A group of cats is called a clowder.",
    "Cats have retractable claws, which they use for hunting and climbing.",
    "Cats have a third eyelid, for extra blinking.",
    "Cats are known for their agility and can jump up to six times their body length.",
    "Cats have a strong sense of smell, which is about 14 times stronger than humans.",
    "A cat's whiskers are roughly as wide as its body, so it always knows if it fits.",
    "Cats can make over 100 different sounds, while dogs can only make about 10.",
    "Cats can sense small earthquakes minutes before they happen.",
    "Cats blink slowly to say 'I love you.' They also use this on empty boxes.",
    "Cats can't taste sweetness.",
    "Cats have been domesticated for over 4,000 years.",
    "Cats can rotate their ears 180 degrees.",
    "Cats have a unique grooming behavior called 'allogrooming,' where they groom each other to strengthen social bonds.",
    "Cats are crepuscular, meaning they are most active during dawn and dusk.",
    "Your cat can hear you get up before your feet touch the floor.",
    "Cats have a specialized collarbone that allows them to always land on their feet.",
    "Cats dream, just like you do. You can tell when they are dreaming because their paws twitch and their eyes move. But no one knows what they dream about. Catnip, perhaps?",

]


const card = document.getElementById('card');
const counterEl = document.getElementById('counter');
const dotsEl = document.getElementById('dots');
const nextBtn = document.getElementById('nextBtn');
const sky = document.getElementById('sky');
const root = document.documentElement;
const pawIcon = 'images/paw-icon.svg';

let i = 0;
const palette = [
    {
        bg1: '#fff0f5',
        bg2: '#ffe4ec',
        card: '#fffaf9',
        pink: '#ff9ebb',
        deep: '#ff6f9c',
        lav: '#d9c6f0',
        text: '#6b4a5a',
        soft: '#9c7b8a'
    },
    {
        bg1: '#f5eeff',
        bg2: '#ece0ff',
        card: '#fbf7ff',
        pink: '#c9a6f2',
        deep: '#a874e8',
        lav: '#9fb6ff',
        text: '#5c4a70',
        soft: '#8a7a9c'
    },
    {
        bg1: '#e8f0ff',
        bg2: '#d6e4ff',
        card: '#f4f8ff',
        pink: '#8fb0f2',
        deep: '#5c7fe0',
        lav: '#7a6ad9',
        text: '#3f4a6b',
        soft: '#6c7699'
    },
    {
        bg1: '#e4e2f5',
        bg2: '#c9c4ea',
        card: '#f0eefb',
        pink: '#8577c9',
        deep: '#5b4ab0',
        lav: '#3d3266',
        text: '#2c2440',
        soft: '#5c5478'
    }
];

function lerp(a,b,t) {
    return a +(b - a) * t;
}

function hexToRgb(hex) {
    const v = parseInt(hex.slice(1), 16);
    return {
        r: (v >> 16) & 255,
        g: (v >> 8) & 255,
        b: v & 255
    };
    

}
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
}

function mixHex(hexA, hexB, t) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    return rgbToHex(lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t))
}

function applyPalette(progress) {
    const se = palette.length - 1;
    const scaled = progress * se;
    const idx = Math.min(se - 1, Math.floor(scaled));
    const t = scaled - idx;
    const a = palette[idx];
    const keys = [
        'bg1', 'bg2', 'card', 'pink', 'deep', 'lav', 'text', 'soft'
    ];
    const cssVars = {
        bg1: '--bg-1', 
        bg2: '--bg-2', 
        card: '--card', 
        pink: '--pink', 
        deep: '--pink-deep', 
        lav: '--lavender', 
        text: '--text', 
        soft: '--text-soft'
    };
    keys.forEach(k => {
        root.style.setProperty(cssVars[k], mixHex(a[k], b[k], t));
    });
    root.style.setProperty('--glow', progress.toFixed(2));
    const tilt = (Math.sin(i * 1.7) * progress * 2.5).toFixed(2);
    root.style.setProperty('--tilt', tilt + 'deg');
}

function spawnPaws() {
    sky.innerHTML = '';
    const count = 6 + Math.floor((i / facts.length) * 6);
    for (let p =0; p < count; p++) {
        const el = document.createElement('img');
        el.className = 'paw';
        el.src = pawIcon;
        el.alt = '';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.setProperty('--r', (Math.random() * 40 - 20) + 'deg');
        el.style.animationDelay = (Math.random() * 4) + 's';
        el.style.animationDuration = (6 + Math.random() * 6) + 's';
        sky.appendChild(el);
    }
}

function renderDots() {
    dotsEl.innerHTML = '';
    facts.forEach((_, idx) => {
        const d = document.createElement('div');
        d.className = 'dot' + (idx === i ? ' active' : '');
        dotsEl.appendChild(d);
    });
}

function render () {
    const progress = i / (facts.length - 1);
    FontFaceSetLoadEvent.textContent = facts[i];
    counterEl.textContent = `fact ${i + 1} of ${facts.length}`;
    applyPalette(progress);
    renderDots();
    spawnDots();
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    if (i === facts.length - 1) {
        counterEl.classList.add('it knew you would get here');
        counterEl.textContent = "they're always watching";

    }
    else {
        nextBtn.textContent = 'next fact';
    }

}

function next() {
    i = (i + 1) % facts.length;
    render();
}
document.addEventListener('keydown', e => {
    if (e.key === 'Space') {
        e.preventDefault();
        next();
    }
});
nextBtn.addEventListener('click', next);
const catbox = document.getElementById('catbox');
const catimg = document.getElementById('catimg');
const meowBubble = document.getElementById('meowBubble');
const meows = [
    'meow!',
    'mrrrp',
    'purr...',
    'mrraeow',
    'mreow?',
    'hisssss....',
    'meow meow',
]
let meowTimeout;
function doMeow() {
    meowBubble.textContent = meows[Math.floor(Math.random() * meows.length)];
    meowBubble.classList.remove('show');
    void meowBubble.offsetWidth;
    meowBubble.classList.add('show');
    meowBubble.classList.remove('bounce');
    void catimg.offsetWidth;
    catimg.classList.add('bounce');
    clearTimeout (meowTimeout);
    meowTimeout = setTimeout(() => {
        meowBubble.classList.remove('show');
    }, 1400);


}
catbox.addEventListener('click', doMeow);
render()