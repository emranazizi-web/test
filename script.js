/* =========================
   Matrix Background
========================= */

const canvas = document.getElementById("code");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const letters = "01 DATA AI CODE".split("");

const fontSize = 13;

let columns = Math.floor(canvas.width / fontSize);

let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.03)";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0,247,255,0.20)";

  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 80);

/* =========================
        EmailJS
========================= */

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("hhxgoyeEfEqFF-TxH");

  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs
        .send("service_emran", "template_y6hwt0b", {
          name: this.name.value,

          email: this.email.value,

          message: this.message.value,
        })

        .then(() => {
          alert("Message sent successfully!");

          this.reset();
        })

        .catch((error) => {
          console.log(error);

          alert("Failed to send message.");
        });
    });
  }
});

/* =========================
       Welcome Screen
========================= */

window.addEventListener("load", function () {
  const screen = document.getElementById("welcome-screen");

  const typingEl = document.getElementById("typing-text");

  if (!screen || !typingEl) return;

  const text = "Welcome to Emran Azizi Portfolio";

  let index = 0;

  function typeText() {
    if (index < text.length) {
      typingEl.innerHTML += text.charAt(index);

      index++;

      setTimeout(typeText, 55);
    }
  }

  typeText();

  setTimeout(() => {
    typingEl.classList.add("glitch");
  }, 1200);

  setTimeout(() => {
    typingEl.classList.remove("glitch");

    typingEl.innerHTML = "System Ready";
  }, 2500);

  setTimeout(() => {
    screen.style.opacity = "0";

    setTimeout(() => {
      screen.style.display = "none";

      document.body.classList.add("loaded");
    }, 800);
  }, 3800);
});

/* ==========================================
   PROJECT FULL SCREEN SLIDE CONTROL
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.getElementById("projects-trigger");

  const projectScreen = document.getElementById("projects-screen");

  if (!trigger || !projectScreen) return;

  let opened = false;

  function openProjects() {
    if (opened) return;

    projectScreen.classList.add("show");

    opened = true;
  }

  function closeProjects() {
    if (!opened) return;

    projectScreen.classList.remove("show");

    opened = false;
  }

  /*
       Detect when Projects section arrives
  */

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {

      if (entry.isIntersecting) {
        openProjects();
      } else {
        closeProjects();
      }

    });
  },
  {
    threshold: 0.2,
  }
);
  observer.observe(trigger);

  /*
       PC Mouse Wheel Control
  */

  projectScreen.addEventListener("wheel", function (event) {
    const atTop = projectScreen.scrollTop <= 0;

    const atBottom =
      projectScreen.scrollTop + projectScreen.clientHeight >=
      projectScreen.scrollHeight - 5;

    // Scroll up from top

    if (event.deltaY < 0 && atTop) {
      closeProjects();

      return;
    }

    // Scroll down from bottom

    if (event.deltaY > 0 && atBottom) {
      closeProjects();

      setTimeout(function () {
        document.getElementById("contact").scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    }
  });

  /*
       iPhone / iPad Touch Control
  */

  let touchStartY = 0;

  projectScreen.addEventListener(
    "touchstart",
    function (event) {
      touchStartY = event.touches[0].clientY;
    },
    { passive: true },
  );

  projectScreen.addEventListener(
    "touchmove",
    function (event) {
      event.stopPropagation();

      const touchEndY = event.touches[0].clientY;

      const atTop = projectScreen.scrollTop <= 0;

      const atBottom =
        projectScreen.scrollTop + projectScreen.clientHeight >=
        projectScreen.scrollHeight - 5;

      // Swipe down from top

      if (touchEndY > touchStartY && atTop) {
        closeProjects();
      }

      // Swipe up from bottom

      if (touchEndY < touchStartY && atBottom) {
        closeProjects();

        setTimeout(function () {
          document.getElementById("contact").scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
      }
    },
    { passive: true },
  );
});
/* ==========================================
   MOBILE VIEWPORT FIX
   iPHONE / iPAD / ANDROID
========================================== */

function updateViewportHeight() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`,
  );
}

updateViewportHeight();

window.addEventListener("resize", updateViewportHeight);

/* ==========================================
   PREVENT DOUBLE TAP ZOOM ON BUTTONS/LINKS
========================================== */

document.querySelectorAll("a,button").forEach(function (element) {
  element.style.touchAction = "manipulation";
});

/* ==========================================
   PROJECT MENU CLICK SUPPORT
========================================== */

const projectScreen = document.getElementById("projects-screen");

if (projectScreen) {
  projectScreen.addEventListener("touchstart", function () {
    projectScreen.style.pointerEvents = "auto";
  });
}
