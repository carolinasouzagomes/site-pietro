// Data especial: 29 de janeiro de 2026, à meia-noite (horário local).
const startDate = new Date(2026, 0, 29, 0, 0, 0);
const $ = (id) => document.getElementById(id);

function updateCounter() {
  const now = new Date();
  let diff = Math.max(0, now - startDate);
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  $('days').textContent = String(days).padStart(3, '0');
  $('hours').textContent = String(hours).padStart(2, '0');
  $('minutes').textContent = String(minutes).padStart(2, '0');
  $('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);

const menuToggle = $('menuToggle');
const nav = $('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const envelope = $('openLetter');
const modal = $('letterModal');
envelope.addEventListener('click', () => {
  envelope.classList.add('open');
  window.setTimeout(() => {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }, 450);
});
function closeLetter() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  envelope.classList.remove('open');
}
$('closeLetter').addEventListener('click', closeLetter);
modal.addEventListener('click', (event) => { if (event.target === modal) closeLetter(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLetter(); });

$('surpriseButton').addEventListener('click', () => {
  $('surpriseResult').classList.add('show');
  $('surpriseButton').textContent = 'Presente desbloqueado! 💜';
  $('surpriseButton').disabled = true;
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement('span');
    heart.textContent = ['💜', '✨', '♥'][i % 3];
    heart.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-30px;z-index:50;font-size:${16+Math.random()*20}px;pointer-events:none;transition:transform 2.5s ease-in,opacity 2.5s;`;
    document.body.appendChild(heart);
    requestAnimationFrame(() => { heart.style.transform = `translateY(${window.innerHeight+80}px) rotate(${Math.random()*360}deg)`; heart.style.opacity = '0'; });
    setTimeout(() => heart.remove(), 2600);
  }
});

const music = $('bgMusic');
const musicButton = $('musicToggle');
musicButton.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add('playing');
      musicButton.setAttribute('aria-label', 'Pausar música ambiente');
    } catch {
      alert('Adicione um arquivo chamado musica.mp3 na pasta assets para ativar a música.');
    }
  } else {
    music.pause();
    musicButton.classList.remove('playing');
    musicButton.setAttribute('aria-label', 'Ativar música ambiente');
  }
});
