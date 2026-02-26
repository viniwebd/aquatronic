import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

console.log('Aquatronic Main Script Loading...');

// Swiper initialization
document.addEventListener('DOMContentLoaded', () => {
  try {
    const swiperEl = document.querySelector('.logo-swiper');
    if (swiperEl) {
      new Swiper('.logo-swiper', {
        modules: [Autoplay],
        slidesPerView: 2,
        spaceBetween: 50,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 7000,
        breakpoints: {
          768: { slidesPerView: 4, spaceBetween: 43 },
          1024: { slidesPerView: 4, spaceBetween: 77 }
        }
      });
      console.log('Swiper initialized');
    }
  } catch (e) {
    console.error('Swiper error:', e);
  }

  try {
    const clientsSwiperEl = document.querySelector('.logo-swiper-clients');
    if (clientsSwiperEl) {
      new Swiper('.logo-swiper-clients', {
        modules: [Autoplay],
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 6000,
        breakpoints: {
          640: { slidesPerView: 4, spaceBetween: 40 },
          1024: { slidesPerView: 5, spaceBetween: 60 }
        }
      });
      console.log('Clients swiper initialized');
    }
  } catch (e) {
    console.error('Clients swiper error:', e);
  }

  // Accordion Logic
  console.log('Setting up accordions...');
  const accordions = document.querySelectorAll('.accordion-header');
  
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item?.querySelector('.accordion-content');
      if (!content) return;

      const isActive = content.classList.contains('active');

      // Close other items in the SAME accordion container
      const container = item?.parentElement;
      container?.querySelectorAll('.accordion-content').forEach(otherContent => {
        if (otherContent !== content) {
          otherContent.classList.remove('active');
          const otherIcon = otherContent.parentElement?.querySelector('.accordion-header i');
          if (otherIcon) {
            otherIcon.classList.remove('fa-minus', 'fa-chevron-up');
            if (otherIcon.classList.contains('fa-chevron-down')) {
              // already down
            } else if (otherIcon.classList.contains('fa-plus')) {
              // already plus
            } else {
              // heuristic
              if (otherIcon.parentElement?.innerHTML.includes('chevron')) {
                otherIcon.classList.add('fa-chevron-down');
              } else {
                otherIcon.classList.add('fa-plus');
              }
            }
          }
        }
      });

      // Toggle current
      content.classList.toggle('active');
      const icon = header.querySelector('i');
      if (icon) {
        if (icon.classList.contains('fa-plus') || icon.classList.contains('fa-minus')) {
          icon.classList.toggle('fa-plus', isActive);
          icon.classList.toggle('fa-minus', !isActive);
        } else {
          icon.classList.toggle('fa-chevron-down', isActive);
          icon.classList.toggle('fa-chevron-up', !isActive);
        }
      }
      console.log('Toggled accordion:', header.textContent?.trim());
    });
  });

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        if (entry.target.id === 'water-counter') {
          animateCounter('water-counter', 10);
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.mission-card, .hero-tag-container, h1, h3, p, .btn-special, .tech-section h2, .stats-content h4, .counter-number').forEach(el => {
    observer.observe(el);
  });
});

// Counter Animation
function animateCounter(id: string, target: number, speed: number = 200) {
  const element = document.getElementById(id);
  if (!element || element.dataset.animated === 'true') return;
  element.dataset.animated = 'true';

  let current = 0;
  const increment = target / speed;
  const update = () => {
    current += increment;
    if (current < target) {
      element.innerText = `+${Math.ceil(current)}`;
      requestAnimationFrame(update);
    } else {
      element.innerText = `+${target}`;
    }
  };
  update();
}

