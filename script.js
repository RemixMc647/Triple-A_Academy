/* ==========================================
   EDIT YOUR SCHOOL DETAILS HERE
   ========================================== */

const SCHOOL = {
  phone: "0817 275 1100, 0810 587 7337",
  email: "triplealegacyinternationalsch@yahoo.com",
  address: "Asese-Wazobia, 7 Adebisi Usman Street, Oloke"
};

/* Events shown on the Home page.
   date format: "day|month", for example "12|Dec" */
const EVENTS = [
  {
    date: "--|TBA",
    title: "Admission open day",
    info: "Admission is in progress. Date to be announced. Meet our teachers and tour the school."
  },
  {
    date: "--|TBA",
    title: "Primary Graduation ceremony",
    info: "Certificates presented to our graduating pupils."
  },
  {
    date: "--|TBA",
    title: "After School Club showcase",
    info: "Pupils show what they have created."
  }
];

/* ==========================================
   SHORTCUT HELPERS
   ========================================== */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];


/* ==========================================
   FILL IN PHONE, EMAIL AND ADDRESS
   ========================================== */

$$("[data-fill]").forEach(el => {
  const value = SCHOOL[el.dataset.fill];

  if (!value) {
    el.textContent = "Coming soon";
    return;
  }

  if (el.dataset.fill === "email") {
    el.innerHTML = `<a href="mailto:${value}">${value}</a>`;
  } else if (el.dataset.fill === "phone") {
    el.innerHTML = value.split(",").map(n => n.trim())
      .map(n => `<a href="tel:${n.replace(/\s/g, "")}">${n}</a>`).join(", ");
  } else {
    el.textContent = value;
  }
});

$("#year").textContent = new Date().getFullYear();


/* ==========================================
   PAGE LOADER
   ========================================== */

// Hide the loader as soon as the page structure is ready,
// instead of waiting for every image and font to finish.
function hideLoader() {
  $("#load").classList.add("done");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hideLoader);
} else {
  hideLoader();
}

// Safety: never let the loader stay longer than 1.5 seconds
setTimeout(hideLoader, 1500);


/* ==========================================
   DARK MODE (remembers the visitor's choice)
   ========================================== */

const root = document.documentElement;
root.dataset.theme = localStorage.getItem("theme") || "light";

function updateThemeIcon() {
  $("#theme").textContent = root.dataset.theme === "dark" ? "☀️" : "🌙";
}

$("#theme").onclick = () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
  updateThemeIcon();
};

updateThemeIcon();


/* ==========================================
   MOBILE MENU
   ========================================== */

$("#menu").onclick = event => {
  const isOpen = $("#nav").classList.toggle("open");
  event.target.setAttribute("aria-expanded", isOpen);
};


/* ==========================================
   SCROLL PROGRESS BAR AND BACK-TO-TOP BUTTON
   ========================================== */

addEventListener("scroll", () => {
  const pageHeight = document.body.scrollHeight - innerHeight;

  $("#prog").style.width = (scrollY / pageHeight * 100) + "%";
  $("#top").classList.toggle("show", scrollY > 400);
});

$("#top").onclick = () => {
  scrollTo({ top: 0, behavior: "smooth" });
};


/* ==========================================
   REVEAL ON SCROLL AND COUNTING NUMBERS
   ========================================== */

function countUp(el) {
  const target = +el.dataset.count;
  let current = 0;

  const timer = setInterval(() => {
    current++;
    el.textContent = current;

    if (current >= target) {
      clearInterval(timer);
    }
  }, 900 / target);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("in");
    observer.unobserve(entry.target);

    if (entry.target.dataset.count) {
      countUp(entry.target);
    }
  });
}, { threshold: 0.15 });

$$(".rv, [data-count]").forEach((el, index) => {
  if (el.classList.contains("rv")) {
    el.style.transitionDelay = (index % 4) * 0.1 + "s";
  }

  observer.observe(el);
});


/* ==========================================
   FLOATING BUBBLES (hero and call-to-action bands)
   ========================================== */

const bubbleColours = ["#e5242b", "#e8b83a", "#3db4bd", "#e8368f", "#14a65a"];

$$(".hero, .band").forEach(area => {
  for (let i = 0; i < 14; i++) {
    const bubble = document.createElement("i");
    const size = 8 + Math.random() * 26;

    bubble.className = "bub";

    Object.assign(bubble.style, {
      width: size + "px",
      height: size + "px",
      left: Math.random() * 100 + "%",
      bottom: "-40px",
      background: bubbleColours[i % 5],
      animationDuration: 8 + Math.random() * 12 + "s",
      animationDelay: -Math.random() * 15 + "s",
      borderRadius: i % 3 ? "50%" : "4px"
    });

    area.prepend(bubble);
  }
});


/* ==========================================
   TYPEWRITER TEXT (Home page hero)
   ========================================== */

const typeBox = $("#type");

if (typeBox) {
  const words = ["Creche", "Early Years", "Nursery", "Primary", "After School Club", "College"];
  let wordIndex = 0;
  let letterIndex = 0;
  let deleting = false;

  function typeStep() {
    const word = words[wordIndex];
    typeBox.textContent = word.slice(0, letterIndex);

    // Finished typing a word: pause, then start deleting
    if (!deleting && letterIndex === word.length) {
      deleting = true;
      return setTimeout(typeStep, 1300);
    }

    // Finished deleting: move to the next word
    if (deleting && letterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    letterIndex += deleting ? -1 : 1;
    setTimeout(typeStep, deleting ? 50 : 100);
  }

  typeStep();
}


/* ==========================================
   3D TILT ON CARDS
   ========================================== */

$$(".card").forEach(card => {
  card.addEventListener("mousemove", event => {
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;

    card.style.transform =
      `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


/* ==========================================
   CURSOR SPARKLES
   ========================================== */

let lastSparkle = 0;

addEventListener("mousemove", event => {
  if (Date.now() - lastSparkle < 45) return;
  lastSparkle = Date.now();

  const sparkle = document.createElement("i");
  sparkle.className = "spark";
  sparkle.style.left = event.clientX + "px";
  sparkle.style.top = event.clientY + "px";
  sparkle.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;

  document.body.append(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});


/* ==========================================
   CONFETTI
   ========================================== */

function confetti() {
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("i");
    piece.className = "conf";

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
    piece.style.animationDuration = 2 + Math.random() * 2.5 + "s";
    piece.style.animationDelay = Math.random() * 0.6 + "s";

    document.body.append(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}

$$("[data-confetti]").forEach(button => {
  button.addEventListener("click", confetti);
});


/* ==========================================
   "WHAT WE BELIEVE" SLIDER
   ========================================== */

const slides = $$(".slide");

if (slides.length) {
  const dotsBox = $(".dots");
  let current = 0;

  function showSlide(index) {
    current = index;

    slides.forEach((slide, i) => slide.classList.toggle("on", i === index));
    $$("i", dotsBox).forEach((dot, i) => dot.classList.toggle("on", i === index));
  }

  slides.forEach((_, index) => {
    const dot = document.createElement("i");
    dot.onclick = () => showSlide(index);
    dotsBox.append(dot);
  });

  showSlide(0);
  setInterval(() => showSlide((current + 1) % slides.length), 4500);
}


/* ==========================================
   UPCOMING EVENTS LIST
   ========================================== */

const eventsBox = $("#events");

if (eventsBox) {
  eventsBox.innerHTML = EVENTS.map(event => {
    const [day, month] = event.date.split("|");

    return `
      <div class="ev rv">
        <div class="d">${day}<br>${month}</div>
        <div><b>${event.title}</b><br>${event.info}</div>
      </div>
    `;
  }).join("");

  $$("#events .rv").forEach(el => observer.observe(el));
}


/* ==========================================
   CERTIFICATE LIGHTBOX (tap to enlarge)
   ========================================== */

$$("[data-zoom]").forEach(box => {
  box.onclick = () => {
    $("#lb img").src = box.querySelector("img").src;
    $("#lb").classList.add("on");
  };
});

$("#lb").onclick = () => $("#lb").classList.remove("on");


/* ==========================================
   ACADEMICS TABS
   ========================================== */

const tabButtons = $$(".tabs button");

tabButtons.forEach(tab => {
  tab.onclick = () => {
    tabButtons.forEach(button => {
      button.setAttribute("aria-selected", button === tab);
    });

    $$(".panel").forEach(panel => {
      panel.hidden = panel.id !== tab.dataset.panel;
    });
  };
});


/* ==========================================
   CONTACT FORM
   ========================================== */

const form = $("#contact-form");

if (form) {
  const message = $("textarea", form);
  const counter = $("#cnt");

  message.oninput = () => {
    counter.textContent = message.value.length + "/500";
  };

  form.onsubmit = async event => {
    event.preventDefault();
    let hasError = false;

    // Check every required field
    $$("[required]", form).forEach(field => {
      const errorBox = field.parentElement.querySelector(".err");
      let error = "";

      if (!field.value.trim()) {
        error = "This field is required.";
      } else if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(field.value)) {
        error = "Enter a valid email address.";
      }

      errorBox.textContent = error;
      if (error) hasError = true;
    });

    if (hasError) return;

    // Send the message to the school's email through Resend (see api/contact.js)
    const data = Object.fromEntries(new FormData(form));
    const button = $("button[type=submit]", form);
    const failBox = $("#fail");

    failBox.hidden = true;
    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Send failed");

      form.hidden = true;
      $("#sent").hidden = false;
      confetti();
    } catch (error) {
      failBox.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = "Send message";
    }
  };
}
