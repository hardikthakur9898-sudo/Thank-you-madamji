/* =========================================================
   FOR SHRADDHA — "MADAM JI"
   script.js — all interactions & animations
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Preloader sequence ---------------- */
  const preloader = document.getElementById('preloader');
  const line1 = document.getElementById('pre-line-1');
  const line2 = document.getElementById('pre-line-2');
  const line3 = document.getElementById('pre-line-3');
  const preBooklet = document.getElementById('pre-booklet');
  const bookletCover = preBooklet ? preBooklet.querySelector('.booklet-cover') : null;
  const skipBtn = document.getElementById('pre-skip');

  function fadeIn(el, delay = 0){
    if(!el) return;
    setTimeout(() => { el.style.transition = 'opacity 1.1s ease'; el.style.opacity = '1'; }, delay);
  }
  function fadeOut(el, delay = 0){
    if(!el) return;
    setTimeout(() => { el.style.transition = 'opacity .8s ease'; el.style.opacity = '0'; }, delay);
  }

  let introFinished = false;
  function finishIntro(){
    if(introFinished) return;
    introFinished = true;
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    startAmbient();
  }

  function runIntroSequence(){
    document.body.style.overflow = 'hidden';
    fadeIn(line1, 300);
    fadeOut(line1, 2400);
    fadeIn(line2, 3000);
    fadeOut(line2, 5200);
    fadeIn(line3, 5800);
    setTimeout(() => {
      fadeOut(line3, 0);
      fadeIn(preBooklet, 500);
    }, 7600);
    setTimeout(() => {
      if(bookletCover) bookletCover.classList.add('turn');
    }, 9600);
    setTimeout(finishIntro, 11600);
  }

  if(skipBtn) skipBtn.addEventListener('click', finishIntro);
  runIntroSequence();

  /* ---------------- Progress bar ---------------- */
  const progressBar = document.getElementById('progress-bar');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if(progressBar) progressBar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateProgress);

  /* ---------------- Cursor glow ---------------- */
  const cursorGlow = document.getElementById('cursor-glow');
  window.addEventListener('mousemove', (e) => {
    if(!cursorGlow) return;
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ---------------- Ambient petals + sparks ---------------- */
  function startAmbient(){
    const petalLayer = document.getElementById('petal-layer');
    if(petalLayer && petalLayer.children.length === 0){
      for(let i=0;i<18;i++){
        const p = document.createElement('div');
        p.className = 'petal';
        p.style.left = Math.random()*100 + 'vw';
        p.style.setProperty('--drift', (Math.random()*120-60)+'px');
        p.style.animationDuration = (9 + Math.random()*10) + 's';
        p.style.animationDelay = (Math.random()*12) + 's';
        p.style.width = p.style.height = (8 + Math.random()*10) + 'px';
        petalLayer.appendChild(p);
      }
    }
    const sparkLayer = document.getElementById('spark-layer');
    if(sparkLayer && sparkLayer.children.length === 0){
      for(let i=0;i<26;i++){
        const s = document.createElement('div');
        s.className = 'spark';
        s.style.left = Math.random()*100 + 'vw';
        s.style.top = Math.random()*100 + 'vh';
        s.style.animationDuration = (3 + Math.random()*4) + 's';
        s.style.animationDelay = (Math.random()*5) + 's';
        sparkLayer.appendChild(s);
      }
    }
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .t-item');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  /* ---------------- Hero parallax ---------------- */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if(!heroBg) return;
    const y = window.scrollY;
    if(y < window.innerHeight){
      heroBg.style.transform = `scale(1.08) translateY(${y*0.18}px)`;
    }
  });

  /* ---------------- Hero typing animation ---------------- */
  const typeTarget = document.getElementById('hero-type');
  const typeText = "Thank you for becoming one of the most beautiful chapters of my life.";
  function typeWriter(){
    if(!typeTarget) return;
    let i = 0;
    typeTarget.textContent = '';
    const interval = setInterval(() => {
      typeTarget.textContent += typeText.charAt(i);
      i++;
      if(i >= typeText.length) clearInterval(interval);
    }, 42);
  }
  setTimeout(typeWriter, 12200);

  /* "Begin Our Story" button */
  const beginBtn = document.getElementById('begin-story');
  if(beginBtn){
    beginBtn.addEventListener('click', () => {
      document.getElementById('chapter-one').scrollIntoView({ behavior:'smooth' });
    });
  }

  /* ---------------- Booklet easter egg ---------------- */
  const bookletCard = document.getElementById('booklet-card');
  const easterMsg = document.getElementById('easter-msg');
  if(bookletCard){
    bookletCard.addEventListener('click', () => {
      if(easterMsg) easterMsg.classList.toggle('show');
      spawnHeart(bookletCard);
    });
  }

  function spawnHeart(originEl){
    const rect = originEl.getBoundingClientRect();
    const heart = document.createElement('div');
    heart.className = 'float-heart';
    heart.textContent = '♡';
    heart.style.left = (rect.left + rect.width/2) + 'px';
    heart.style.top = rect.top + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1700);
  }

  /* ---------------- Gallery Lightbox ---------------- */
  const galleryImgs = Array.from(document.querySelectorAll('.polaroid img'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  let lbIndex = 0;

  function openLightbox(index){
    lbIndex = index;
    lbImg.src = galleryImgs[lbIndex].src;
    lightbox.classList.add('open');
  }
  function closeLightbox(){ lightbox.classList.remove('open'); }
  function navLightbox(dir){
    lbIndex = (lbIndex + dir + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[lbIndex].src;
  }

  galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');
  if(lbClose) lbClose.addEventListener('click', closeLightbox);
  if(lbPrev) lbPrev.addEventListener('click', () => navLightbox(-1));
  if(lbNext) lbNext.addEventListener('click', () => navLightbox(1));
  if(lightbox){
    lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') navLightbox(1);
    if(e.key === 'ArrowLeft') navLightbox(-1);
  });

  /* ---------------- Video player ---------------- */
  const videoInner = document.getElementById('video-inner');
  const video = document.getElementById('memory-video');
  const playBtn = document.getElementById('video-play-btn');
  if(playBtn && video){
    playBtn.addEventListener('click', () => {
      video.play();
      videoInner.classList.add('playing');
    });
    video.addEventListener('pause', () => videoInner.classList.remove('playing'));
    video.addEventListener('ended', () => videoInner.classList.remove('playing'));
  }

  /* ---------------- Music player ---------------- */
  const musicBtn = document.getElementById('music-btn');
  const bgMusic = document.getElementById('bg-music');
  if(musicBtn && bgMusic){
    musicBtn.addEventListener('click', () => {
      if(bgMusic.paused){
        bgMusic.play().catch(() => {
          alert('Add your music file to assets/music/ to enable this — see README.');
        });
        musicBtn.classList.add('playing');
      } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
      }
    });
  }

  /* ---------------- Ending: stars + shooting star ---------------- */
  const starsLayer = document.getElementById('stars-layer');
  if(starsLayer){
    for(let i=0;i<90;i++){
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random()*100 + '%';
      s.style.top = Math.random()*100 + '%';
      s.style.animationDuration = (2 + Math.random()*3) + 's';
      s.style.animationDelay = (Math.random()*4) + 's';
      starsLayer.appendChild(s);
    }
    function launchShootingStar(){
      const star = document.createElement('div');
      star.className = 'shooting-star';
      const startX = Math.random()*60 + 10;
      const startY = Math.random()*40;
      star.style.left = startX + '%';
      star.style.top = startY + '%';
      starsLayer.appendChild(star);
      star.animate([
        { transform:'translate(0,0)', opacity:0 },
        { transform:'translate(-40px, 60px)', opacity:1, offset:0.15 },
        { transform:'translate(-260px, 340px)', opacity:0 }
      ], { duration: 1400, easing:'ease-in' });
      setTimeout(() => star.remove(), 1500);
    }
    setInterval(launchShootingStar, 4500);
    setTimeout(launchShootingStar, 1200);
  }

  /* ---------------- Timeline dot visibility class already handled by IO above ---------------- */

});
