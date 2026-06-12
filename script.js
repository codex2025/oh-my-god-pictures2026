const EMAILJS_PUBLIC_KEY = "edOVaRsSVkvpQ_48N";
const EMAILJS_SERVICE_ID = "service_ps35w5d";
const EMAILJS_TEMPLATE_ID = "template_sdm3il7"; // use your Contact Us template ID

if (typeof emailjs !== "undefined") {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const currentYear = document.getElementById("year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}


const validators = {
  name: (value) => value.trim().length >= 2 || "Please enter your name.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Please enter a valid email address.",
  subject: (value) => value.trim().length >= 3 || "Please enter a subject.",
  message: (value) => value.trim().length >= 10 || "Please enter at least 10 characters."
};

function setFieldState(field, message) {
  const wrapper = field.closest(".form-row");
  const errorNode = wrapper ? wrapper.querySelector(".error-message") : null;

  if (!wrapper || !errorNode) {
    return;
  }

  if (message) {
    wrapper.classList.add("is-invalid");
    errorNode.textContent = message;
  } else {
    wrapper.classList.remove("is-invalid");
    errorNode.textContent = "";
  }
}

function validateField(field) {
  const rule = validators[field.name];

  if (!rule) {
    return true;
  }

  const result = rule(field.value);

  if (result === true) {
    setFieldState(field, "");
    return true;
  }

  setFieldState(field, result);
  return false;
}

function updateStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.classList.remove("is-success", "is-error");

  if (type) {
    statusMessage.classList.add(type);
  }
}

if (form) {
  const fields = Array.from(form.querySelectorAll("input, textarea"));

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-row")?.classList.contains("is-invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const isValid = fields.every((field) => validateField(field));

    if (!isValid) {
      updateStatus("Please correct the highlighted fields and try again.", "is-error");
      return;
    }

    if (!window.emailjs) {
      updateStatus(
        "EmailJS is not loaded. Please check your internet connection and try again.",
        "is-error"
      );
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    updateStatus("Sending your message...", "");

    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name.value.trim(),
        from_email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
        reply_to: form.email.value.trim()
      });

      form.reset();
      fields.forEach((field) => setFieldState(field, ""));
      updateStatus("Message sent successfully. We’ll get back to you soon.", "is-success");
    } catch (error) {
      updateStatus("Something went wrong while sending your message. Please try again.", "is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
}

const carousel = document.querySelector('.slideshow');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slideshow-btn-prev');
const nextBtn = document.querySelector('.slideshow-btn-next');
const video = document.getElementById('hero-video');
const playBtn = document.getElementById('play-btn');

let currentIndex = 0;
let autoplayInterval;
let videoFallbackTimer;
const slideDuration = 5000;

function moveToSlide(index) {
  if (!carousel || !slides.length) {
    return;
  }

  currentIndex = index;
  if (currentIndex < 0) currentIndex = slides.length - 1;
  if (currentIndex >= slides.length) currentIndex = 0;
  
  carousel.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
  
  if (video && currentIndex !== 0) {
    video.pause();
  }

  if (video && currentIndex === 0) {
    playHeroVideo();
  } else {
    hidePlayButton();
  }
  
  startAutoplay();
}

function hidePlayButton() {
  if (playBtn) {
    playBtn.style.display = 'none';
  }
}

function showPlayButton() {
  if (playBtn) {
    playBtn.style.display = 'block';
  }
}

function playHeroVideo() {
  hidePlayButton();
  clearTimeout(videoFallbackTimer);

  video.muted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  try {
    video.currentTime = 0;
  } catch (error) {
    // Some iOS builds reject seeking until metadata is available.
  }

  const playAttempt = video.play();

  if (playAttempt && typeof playAttempt.catch === 'function') {
    playAttempt.catch(() => {
      showPlayButton();
      scheduleVideoFallback();
    });
  }

  scheduleVideoFallback();
}

function scheduleVideoFallback() {
  clearTimeout(videoFallbackTimer);
  videoFallbackTimer = setTimeout(() => {
    if (currentIndex === 0 && video && (video.paused || video.readyState < 2)) {
      nextSlide();
    }
  }, slideDuration);
}

function nextSlide() {
  moveToSlide(currentIndex + 1);
}

function prevSlide() {
  moveToSlide(currentIndex - 1);
}

function startAutoplay() {
  clearInterval(autoplayInterval);
  clearTimeout(videoFallbackTimer);

  if (video && currentIndex === 0) {
    video.onended = () => {
      nextSlide();
    };

    scheduleVideoFallback();
  } else {
    autoplayInterval = setInterval(nextSlide, slideDuration);
  }
}

// Button event listeners
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    clearInterval(autoplayInterval);
    clearTimeout(videoFallbackTimer);
    prevSlide();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    clearInterval(autoplayInterval);
    clearTimeout(videoFallbackTimer);
    nextSlide();
  });
}

// Touch support for swipe
let startX;
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
  slideshowContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  slideshowContainer.addEventListener('touchend', (e) => {
    if (!startX) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startX = null;
  }, { passive: true });
}

// Play button for video
if (playBtn && video) {
  playBtn.addEventListener('click', () => {
    hidePlayButton();
    video.play().catch(() => {
      showPlayButton();
    });
  });
}

// Initialize
if (carousel && slides.length) {
  moveToSlide(0);
}

// Gallery Slideshow - Auto-rotate every 3 seconds
const galleryContainer = document.querySelector('.gallery');
const gallerySlides = document.querySelectorAll('.gallery-slide');
let galleryIndex = 0;
let galleryAutoplayInterval;
const galleryDuration = 3000; // 3 seconds

function moveToGallerySlide(index) {
  if (!galleryContainer || !gallerySlides.length) {
    return;
  }

  galleryIndex = index;
  if (galleryIndex < 0) galleryIndex = gallerySlides.length - 1;
  if (galleryIndex >= gallerySlides.length) galleryIndex = 0;

  galleryContainer.style.transform = `translate3d(-${galleryIndex * 100}%, 0, 0)`;
}

function nextGallerySlide() {
  moveToGallerySlide(galleryIndex + 1);
  startGalleryAutoplay();
}

function startGalleryAutoplay() {
  clearInterval(galleryAutoplayInterval);
  galleryAutoplayInterval = setInterval(nextGallerySlide, galleryDuration);
}

// Initialize gallery slideshow
if (galleryContainer && gallerySlides.length) {
  moveToGallerySlide(0);
  startGalleryAutoplay();
}
