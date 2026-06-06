/* ===== FORMWORKS - site interactions ===== */
(function () {
  "use strict";

  // --- Project data (driven by the portfolio) ---
  const PROJECTS = [
    {
      slug: "pollachi-house",
      name: "House in Pollachi",
      meta: "Residence · Pollachi",
      desc: "A calm, grounded residence responding to its climatic context through material honesty and spatial simplicity. The façade combines textured concrete, vertical wooden louvers and integrated greenery - adding depth while acting as passive shading that reduces heat gain and invites filtered light and ventilation inside.",
      photos: 6,
      size: "lg",
    },
    {
      slug: "office-pollachi",
      name: "Office in Pollachi",
      meta: "Workspace · Pollachi",
      desc: "A contemporary workspace layered with warm wood, textured neutrals and rhythmic lattice details.",
      photos: 3,
      size: "sm",
    },
    {
      slug: "bungalow-annur",
      name: "Bungalow in Annur",
      meta: "Renovation · Annur",
      desc: "A thoughtful renovation of a 20-year-old lavish bungalow spanning approximately 7,500 sq.ft., reimagined with a refined, contemporary sensibility.",
      photos: 3,
      size: "sm",
    },
    {
      slug: "terra-living",
      name: "Project Terra",
      meta: "Residence · Bangalore",
      desc: "A 4,000 sq.ft residence in Bangalore for a young family of four - thoughtfully planned to balance comfort and practicality within budget constraints, creating a warm, functional nest tailored to everyday living.",
      photos: 5,
      size: "lg",
    },
    {
      slug: "reddy-residence",
      name: "Reddy Residence",
      meta: "Interiors · Bangalore",
      desc: "An opulent, one-of-a-kind bedroom within a 15,000 sq.ft residence in Bangalore - envisioned as a deeply personal sanctuary where luxury, material richness and spatial elegance come together in a refined composition.",
      photos: 3,
      size: "sm",
    },
    {
      slug: "fabrication-factory",
      name: "Fabrication Factory",
      meta: "Industrial · Façade",
      desc: "A bold industrial façade defined by angular roofs, brick and metal lattice screens. Layered materials and greenery add depth, light filtration and a distinctive contemporary character to the facility.",
      photos: 1,
      size: "full",
    },
  ];

  const img = (slug, n) => `assets/img/${slug}-${String(n).padStart(2, "0")}.jpg`;

  // --- Render project cards ---
  const grid = document.getElementById("projectGrid");
  PROJECTS.forEach((p) => {
    const card = document.createElement("article");
    card.className = `card card--${p.size} reveal`;
    card.innerHTML = `
      <img class="card__img" src="${img(p.slug, 1)}" alt="${p.name}" loading="lazy" />
      <div class="card__overlay">
        <span class="card__meta">${p.meta}</span>
        <span class="card__name">${p.name}</span>
        <span class="card__count">${p.photos} ${p.photos > 1 ? "images" : "image"}</span>
      </div>`;
    card.addEventListener("click", () => openLightbox(p, 0));
    grid.appendChild(card);
  });

  // --- Lightbox gallery ---
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCaption");
  let current = null, idx = 0;

  function show() {
    lbImg.src = img(current.slug, idx + 1);
    lbImg.alt = `${current.name} - ${idx + 1} of ${current.photos}`;
    lbCap.textContent = `${current.name} · ${idx + 1} / ${current.photos}`;
  }
  function openLightbox(p, i) {
    current = p; idx = i;
    show();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(d) {
    if (!current) return;
    idx = (idx + d + current.photos) % current.photos;
    show();
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbNext").addEventListener("click", () => step(1));
  document.getElementById("lbPrev").addEventListener("click", () => step(-1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  // --- Nav: scroll state + mobile toggle ---
  const nav = document.getElementById("nav");
  const links = document.getElementById("navLinks");
  const toggle = document.getElementById("navToggle");
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 60);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // --- Scroll reveal ---
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal, .studio__inner, .work__head, .contact__inner").forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });

  // --- Footer year ---
  document.getElementById("year").textContent = new Date().getFullYear();
})();
