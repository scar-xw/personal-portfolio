/* ===== TRANSLATIONS (EN / PT-BR) =====
   Add or edit text here. In index.html, an element's text is controlled by data-i18n="key";
   placeholders by data-i18n-ph, aria-labels by data-i18n-aria, button values by data-i18n-value. */
const I18N = {
  en: {
    roles: ["Software developer", "Fullstack developer", "Frontend developer"],
    "nav.home": "Home", "nav.projects": "Projects", "nav.skills": "Skills", "nav.about": "About", "nav.contact": "Contact",
    "nav.top": "Back to top",
    "hero.phrase": "Software Engineering student that loves cats and new ideas!",
    "hero.contact": "Contact Me",
    "projects.title": "Projects",
    "project.desc": "Small cute desktop app to pomodoro time your studies, with a little buddy panda to warn you and play some lofi while you concentrate!",
    "project.cta": "Check it out",
    "skills.title": "Tech Stack",
    "skills.exp1": "0-1+ years of experience",
    "skills.exp2": "2+ years of experience",
    "about.title": "Who's behind the code?",
    "about.p1": "I’m a 20 year old Software Engineering student who’s been exploring tech and art for as long as I can remember. I used to work as a digital illustrator, but my priority now is building a career in tech. I’m a big believer that computer science and artistic creativity make the ultimate combo!",
    "about.p2": "In my spare time, you can usually find me playing horror and competitive video games or working on a new painting.",
    "contact.title": "Contact Me",
    "contact.text": "Interested in my work? Please don’t hesitate to get in touch, I’d be thrilled to discuss how I can contribute!",
    "form.name": "Name *", "form.email": "Email *", "form.message": "Message *",
    "form.name.label": "Name", "form.email.label": "Email", "form.message.label": "Message",
    "form.send": "Send",
    "footer.tagline": "*// Creative solutions for creative initiatives //*",
    "footer.contact": "Contact", "footer.socials": "Socials",
    "footer.rights": "©\u00a02026\u00a0Rebecca McDonnell. All rights reserved.",
    "lang.switch": "Mudar para português",
    "theme.toDark": "Switch to dark mode", "theme.toLight": "Switch to light mode",
  },
  pt: {
    roles: ["Desenvolvimento de software", "Desenvolvimento fullstack", "Desenvolvimento frontend"],
    "nav.home": "Início", "nav.projects": "Projetos", "nav.skills": "Skills", "nav.about": "Sobre", "nav.contact": "Contato",
    "nav.top": "Voltar ao topo",
    "hero.phrase": "Estudante de Engenharia de Software que ama gatos e ideias novas!",
    "hero.contact": "Fale comigo",
    "projects.title": "Projetos",
    "project.desc": "Um app de desktop fofinho para cronometrar seus estudos com pomodoro, com um pandinha parceiro que te avisa e toca lofi enquanto você se concentra!",
    "project.cta": "Confira",
    "skills.title": "Tech Stack",
    "skills.exp1": "0-1+ anos de experiência",
    "skills.exp2": "2+ anos de experiência",
    "about.title": "Quem está por trás do código?",
    "about.p1": "Tenho 20 anos e estudo Engenharia de Software. Explorar tecnologia e arte faz parte da minha vida desde que me lembro. Já trabalhei com ilustração digital, mas minha prioridade agora é construir uma carreira em tecnologia. Acredito muito que a ciência da computação e a criatividade artística formam a combinação perfeita!",
    "about.p2": "No meu tempo livre, geralmente estou jogando videogames de terror e competitivos ou trabalhando em uma nova pintura.",
    "contact.title": "Fale comigo",
    "contact.text": "Quer conhecer meu trabalho? Entre em contato, ficarei muito feliz em conversar sobre como posso contribuir!",
    "form.name": "Nome *", "form.email": "E-mail *", "form.message": "Mensagem *",
    "form.name.label": "Nome", "form.email.label": "E-mail", "form.message.label": "Mensagem",
    "form.send": "Enviar",
    "footer.tagline": "*// Soluções criativas para iniciativas criativas //*",
    "footer.contact": "Contato", "footer.socials": "Redes",
    "footer.rights": "©\u00a02026\u00a0Rebecca McDonnell. Todos os direitos reservados.",
    "lang.switch": "Switch to English",
    "theme.toDark": "Ativar modo escuro", "theme.toLight": "Ativar modo claro",
  },
};

const root = document.documentElement;
let lang = root.lang === "pt-BR" ? "pt" : "en";

/* ===== TYPEWRITTEN ROLE TITLE ===== */
const TYPE_SPEED = 140;
const DELETE_SPEED = 45;
const HOLD_TIME = 1400;
const GAP_TIME = 400;
const MAIN_TITLE = document.querySelector("#title");

let typeToken = 0; // bumped on language change so the old animation stops

function typewrittenAnimation(element, text, i = 0, deleting = false, onComplete, token = typeToken) {
  if (token !== typeToken) return;
  if (i === 0 && !deleting) {
    element.innerHTML = "";
  }

  if (!deleting) {
    element.innerHTML = text.substring(0, i + 1);
    if (i >= text.length - 1) {
      setTimeout(() => typewrittenAnimation(element, text, i, true, onComplete, token), HOLD_TIME);
      return;
    }
    setTimeout(() => typewrittenAnimation(element, text, i + 1, false, onComplete, token), TYPE_SPEED);
  } else {
    element.innerHTML = text.substring(0, i);
    if (i <= 0) {
      if (onComplete) onComplete();
      return;
    }
    setTimeout(() => typewrittenAnimation(element, text, i - 1, true, onComplete, token), DELETE_SPEED);
  }
}

let roleIndex = 0;

function cycleRoles() {
  const token = typeToken;
  const roles = I18N[lang].roles;
  typewrittenAnimation(MAIN_TITLE, roles[roleIndex % roles.length], 0, false, () => {
    if (token !== typeToken) return;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(cycleRoles, GAP_TIME);
  });
}

cycleRoles(); // started before anything else, so an error further down can never stop it

/* ===== THEME (light / dark) =====
   The initial theme and language are set by a tiny inline script in index.html <head>
   (saved choice, else the system/browser preference) so the page never flashes. */
const themeBtn = document.querySelector("#theme-toggle");
const langBtn = document.querySelector("#lang-toggle");

function labelButtons() {
  const t = I18N[lang];
  const dark = root.dataset.theme === "dark";
  themeBtn?.setAttribute("aria-label", dark ? t["theme.toLight"] : t["theme.toDark"]);
  themeBtn?.setAttribute("aria-pressed", String(dark));
  langBtn?.setAttribute("aria-label", t["lang.switch"]);
}

themeBtn?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
  labelButtons();
});

/* ===== NAVBAR: sliding indicator + scroll-spy ===== */
const tags = document.querySelector("#tags");
const indicator = document.querySelector("#nav-indicator");
const links = [...tags.querySelectorAll(".headerTag")];
const sections = links.map((l) => document.querySelector(l.getAttribute("href")));
let current = links[0];

function moveTo(link) {
  links.forEach((l) => l.classList.toggle("on", l === link));
  indicator.style.width = link.offsetWidth + "px";
  indicator.style.transform = `translateX(${link.offsetLeft}px)`;
}

function setCurrent(link) {
  current = link;
  links.forEach((l) => (l === link ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current")));
  moveTo(link);
  // On narrow screens the tabs scroll sideways: center the active one by scrolling
  // ONLY the tabs strip. (scrollIntoView on the sticky nav can drag the whole page back up.)
  if (tags.scrollWidth > tags.clientWidth) {
    tags.scrollTo({ left: link.offsetLeft - (tags.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
  }
}

links.forEach((l) => {
  l.addEventListener("mouseenter", () => moveTo(l));
  l.addEventListener("focus", () => moveTo(l));
});
tags.addEventListener("mouseleave", () => moveTo(current));
tags.addEventListener("focusout", () => moveTo(current));

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setCurrent(links[sections.indexOf(e.target)]);
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => s && spy.observe(s));

indicator.style.transition = "none"; // no slide on first placement
moveTo(current);
requestAnimationFrame(() => (indicator.style.transition = ""));
window.addEventListener("resize", () => moveTo(current));
if (document.fonts) document.fonts.ready.then(() => moveTo(current));

/* ===== LANGUAGE ===== */
function applyLanguage() {
  const t = I18N[lang];
  root.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t[el.dataset.i18n]));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t[el.dataset.i18nPh]));
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t[el.dataset.i18nAria]));
  document.querySelectorAll("[data-i18n-value]").forEach((el) => (el.value = t[el.dataset.i18nValue]));
  labelButtons();
  moveTo(current); // tab widths change with the text
}

langBtn?.addEventListener("click", () => {
  lang = lang === "pt" ? "en" : "pt";
  try { localStorage.setItem("lang", lang); } catch {}
  applyLanguage();
  typeToken++; // restart the typewriter in the new language
  MAIN_TITLE.innerHTML = "";
  cycleRoles();
});

applyLanguage();

/* ===== HERO "Contact Me" button ===== */
document.querySelector("#contactMeButton")?.addEventListener("click", () => {
  document.querySelector("#contact-me")?.scrollIntoView({ behavior: "smooth" });
});

/* ===== TECH STACK: clone icons once so the marquee loops seamlessly ===== */
document.querySelectorAll(".techStack").forEach((track) => {
  [...track.children].forEach((img) => {
    const clone = img.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.alt = "";
    track.appendChild(clone);
  });
});