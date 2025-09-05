/* Menu toggle (mobile) */
const menuToggle=document.getElementById('menuToggle');
const nav=document.querySelector('.nav');
menuToggle?.addEventListener('click',()=>{
  nav?.classList.toggle('open');
  menuToggle?.classList.toggle('active');
});
/* Fermer menu en cliquant sur un lien */
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.classList.remove('active');
  });
});
/* Preloader fade */
window.addEventListener('load',()=>{const p=document.getElementById('preloader');if(p){p.style.opacity='0';setTimeout(()=>p.remove(),600);}});
/* Hero swiper */
const heroSwiper=new Swiper('.hero-swiper',{effect:'fade',loop:true,speed:1200,autoplay:{delay:4000,disableOnInteraction:false},pagination:{el:'.hero .swiper-pagination',clickable:true},allowTouchMove:false});

/* Typewriter effect for hero title */
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      let currentText = text.substring(0, i + 1);
      
      // Vérifier si on a écrit "Climat" (même partiellement)
      if (currentText.toLowerCase().includes('climat')) {
        // Trouver la position du mot "Climat" dans le texte
        const climatIndex = text.toLowerCase().indexOf('climat');
        if (i >= climatIndex + 5) { // Si on a écrit tout le mot "Climat"
          const beforeClimat = text.substring(0, climatIndex);
          const afterClimat = text.substring(climatIndex + 6);
          const writtenAfter = afterClimat.substring(0, i - climatIndex - 5);
          currentText = beforeClimat + '<span class="climat-highlight">Climat</span>' + writtenAfter;
        }
      }
      
      element.innerHTML = currentText;
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

/* Initialize typewriter on page load */
window.addEventListener('DOMContentLoaded', () => {
  const headline = document.querySelector('.typewriter-title');
  
  if (headline) {
    const originalTitle = headline.getAttribute('data-text');
    headline.style.opacity = '0.95';
    typeWriter(headline, originalTitle, 80);
  }
});
/* Portraits swiper */
const portraitsSwiper=new Swiper('.portraits-swiper',{slidesPerView:1.2,spaceBetween:16,centeredSlides:true,loop:true,autoplay:{delay:2500,disableOnInteraction:false},breakpoints:{640:{slidesPerView:2.2},1024:{slidesPerView:3.2}},pagination:{el:'.portraits-swiper .swiper-pagination',clickable:true}});
/* Scroll reveal (IntersectionObserver + GSAP for finesse) */
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');if(window.gsap){gsap.fromTo(entry.target,{y:18,opacity:0},{y:0,opacity:1,duration:.7,ease:'power2.out'});}io.unobserve(entry.target);}});},{threshold:.2});
reveals.forEach(el=>io.observe(el));
/* Parallax media */
document.querySelectorAll('.parallax').forEach(el=>{const onScroll=()=>{const rect=el.getBoundingClientRect();const seen=Math.min(1,Math.max(0,1-Math.abs(rect.top+rect.height/2-window.innerHeight/2)/(window.innerHeight/2)));el.style.transform=`translateY(${(1-seen)*-14}px)`;};window.addEventListener('scroll',onScroll,{passive:true});onScroll();});
/* Smooth anchor scrolling */
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();const top=target.getBoundingClientRect().top+window.scrollY-70;window.scrollTo({top,behavior:'smooth'});}});});
/* Form client‑side niceties */
const form=document.querySelector('form[name="candidature"]');
form?.addEventListener('submit',()=>{const btn=form.querySelector('button[type="submit"]');if(btn){btn.disabled=true;btn.textContent='Envoi…';}});
/* Respect reduced motion */
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){if(heroSwiper?.autoplay)heroSwiper.autoplay.stop();if(portraitsSwiper?.autoplay)portraitsSwiper.autoplay.stop();}
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const setSafeTop = () => {
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--safeTop', h + 'px');
  };
  setSafeTop();
  window.addEventListener('resize', setSafeTop);
});
