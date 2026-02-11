// assets/app.js

function moneyBDT(n) {
  return "৳" + Number(n).toLocaleString("en-US");
}

function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setYear() {
  const y = qs("#year");
  if (y) y.textContent = new Date().getFullYear();
}

function renderSocials() {
  const wrap = qs("[data-socials]");
  if (!wrap) return;
  wrap.innerHTML = DETX.socials
    .map(
      (s) =>
        `<a class="chip" href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`
    )
    .join("");
}

function navActive() {
  const path = location.pathname.split("/").pop() || "index.html";
  qsa("[data-nav]").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
}

function getCourseById(id) {
  return DETX.courses.find((c) => c.id === id);
}

function groupByTrack(courses) {
  const map = new Map();
  for (const c of courses) {
    if (!map.has(c.track)) map.set(c.track, []);
    map.get(c.track).push(c);
  }
  return map;
}

function courseCard(c) {
  return `
  <article class="card courseCard">
    <div class="cardTop">
      <div class="badgeRow">
        <span class="badge">${c.track}</span>
        <span class="mini">${c.level} • ${c.duration}</span>
      </div>
      ${c.badge ? `<div class="tag">${c.badge}</div>` : ""}
      <h3 class="cardTitle">${c.title}</h3>
      <p class="muted">${c.outcome}</p>
    </div>

    <div class="priceRow">
      <div class="price">
        <span class="old">${moneyBDT(c.originalPrice)}</span>
        <span class="new">${moneyBDT(c.discountPrice)}</span>
      </div>
      <a class="btn" href="course.html?id=${encodeURIComponent(c.id)}">View Course</a>
    </div>
  </article>`;
}

function renderFeaturedCourses() {
  const wrap = qs("[data-featured-courses]");
  if (!wrap) return;
  const featured = DETX.courses.slice(0, 6);
  wrap.innerHTML = featured.map(courseCard).join("");
}

function renderCoursesPage() {
  const wrap = qs("[data-courses]");
  if (!wrap) return;

  const map = groupByTrack(DETX.courses);
  let html = "";
  for (const [track, items] of map.entries()) {
    html += `<section class="track">
      <div class="trackHead">
        <h2>${track}</h2>
        <p class="muted">${items.length} courses</p>
      </div>
      <div class="grid">${items.map(courseCard).join("")}</div>
    </section>`;
  }
  wrap.innerHTML = html;

  // Search
  const input = qs("#courseSearch");
  if (input) {
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      const filtered = DETX.courses.filter((c) =>
        (c.title + " " + c.track + " " + c.description).toLowerCase().includes(q)
      );
      const map2 = groupByTrack(filtered);
      let html2 = "";
      for (const [track, items] of map2.entries()) {
        html2 += `<section class="track">
          <div class="trackHead">
            <h2>${track}</h2>
            <p class="muted">${items.length} courses</p>
          </div>
          <div class="grid">${items.map(courseCard).join("")}</div>
        </section>`;
      }
      wrap.innerHTML = html2 || `<div class="empty">No courses found.</div>`;
    });
  }
}

function renderCourseDetails() {
  const root = qs("[data-course-detail]");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const c = getCourseById(id);

  if (!c) {
    root.innerHTML = `<div class="empty">Course not found.</div>`;
    return;
  }

  qs("[data-course-title]").textContent = c.title;
  qs("[data-course-track]").textContent = c.track;
  qs("[data-course-level]").textContent = c.level;
  qs("[data-course-duration]").textContent = c.duration;
  qs("[data-course-desc]").textContent = c.description;
  qs("[data-course-outcome]").textContent = c.outcome;
  qs("[data-course-old]").textContent = moneyBDT(c.originalPrice);
  qs("[data-course-new]").textContent = moneyBDT(c.discountPrice);

  const inc = qs("[data-course-includes]");
  inc.innerHTML = c.includes.map((x) => `<li>${x}</li>`).join("");

  const enrollBtn = qs("#enrollBtn");
  enrollBtn.addEventListener("click", () => openEnrollModal(c));
}

function openEnrollModal(course) {
  const modal = qs("#enrollModal");
  modal.classList.add("open");
  qs("#modalCourseTitle").textContent = course.title;
  qs("#modalPriceOld").textContent = moneyBDT(course.originalPrice);
  qs("#modalPriceNew").textContent = moneyBDT(course.discountPrice);

  const form = qs("#enrollForm");
  form.dataset.courseId = course.id;
  form.dataset.courseTitle = course.title;
  form.dataset.priceOriginal = String(course.originalPrice);
  form.dataset.priceDiscount = String(course.discountPrice);

  // reset
  form.reset();
  qs("#enrollStatus").textContent = "";
}

function closeEnrollModal() {
  const modal = qs("#enrollModal");
  modal.classList.remove("open");
}

function wireModal() {
  const modal = qs("#enrollModal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeEnrollModal();
  });

  const closeBtn = qs("[data-modal-close]");
  if (closeBtn) closeBtn.addEventListener("click", closeEnrollModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEnrollModal();
  });
}

async function handleEnrollSubmit() {
  const form = qs("#enrollForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = qs("#enrollStatus");
    status.textContent = "Submitting...";

    try {
      const sb = getSupabase();

      const course_id = form.dataset.courseId;
      const course_title = form.dataset.courseTitle;
      const price_original = parseInt(form.dataset.priceOriginal, 10);
      const price_discount = parseInt(form.dataset.priceDiscount, 10);

      const full_name = qs("#fullName").value.trim();
      const country = qs("#country").value.trim();
      const email = qs("#email").value.trim();
      const phone = qs("#phone").value.trim();
      const payment_method = qs("#paymentMethod").value;
      const transaction_id = qs("#transactionId").value.trim() || null;

      // optional upload
      let screenshot_url = null;
      const file = qs("#paymentScreenshot").files[0];
      if (file) {
        const ext = file.name.split(".").pop().toLowerCase();
        const safeName = `${Date.now()}_${Math.random().toString(16).slice(2)}.${ext}`;
        const path = `${course_id}/${safeName}`;

        const { error: upErr } = await sb.storage
          .from("payment_screenshots")
          .upload(path, file, { upsert: false });

        if (upErr) throw upErr;

        const { data: pub } = sb.storage.from("payment_screenshots").getPublicUrl(path);
        screenshot_url = pub.publicUrl;
      }

      const payload = {
        course_id,
        course_title,
        full_name,
        country,
        email,
        phone,
        payment_method,
        transaction_id,
        screenshot_url,
        price_original,
        price_discount,
        status: "pending",
      };

      const { error } = await sb.from("enrollments").insert(payload);
      if (error) throw error;

      status.textContent = "✅ Submitted! Redirecting...";
setTimeout(() => {
  window.location.href = "success.html";
}, 500);


    } catch (err) {
      console.error(err);
      qs("#enrollStatus").textContent =
        "❌ Failed. Please try again or contact us directly.";
    }
  });
}

async function handleContactSubmit() {
  const form = qs("#contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = qs("#contactStatus");
    status.textContent = "Sending...";

    try {
      const sb = getSupabase();
      const payload = {
        full_name: qs("#cName").value.trim(),
        email: qs("#cEmail").value.trim(),
        subject: qs("#cSubject").value.trim(),
        message: qs("#cMessage").value.trim(),
      };
      const { error } = await sb.from("messages").insert(payload);
      if (error) throw error;

      status.textContent = "✅ Sent! We’ll reply soon.";
      form.reset();
    } catch (err) {
      console.error(err);
      qs("#contactStatus").textContent = "❌ Failed. Please try again.";
    }
  });
}

function youtubeEmbed(playlistId) {
  if (!playlistId || playlistId.includes("PASTE")) {
    return `<div class="empty">Add your playlist ID in <b>assets/data.js</b> to show videos here.</div>`;
  }
  return `
  <div class="videoWrap">
    <iframe
      src="https://www.youtube.com/embed/videoseries?list=${playlistId}"
      title="YouTube playlist"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  </div>`;
}

function renderWatchPage() {
  const root = qs("[data-watch]");
  if (!root) return;

  qs("#ytFeatured").innerHTML = youtubeEmbed(DETX.youtube.featuredPlaylistId);
  qs("#ytHighlights").innerHTML = youtubeEmbed(DETX.youtube.highlightsPlaylistId);
  qs("#ytShorts").innerHTML = youtubeEmbed(DETX.youtube.shortsPlaylistId);
  qs("#ytLive").innerHTML = youtubeEmbed(DETX.youtube.livePlaylistId);
}

function renderShopPage() {
  const root = qs("[data-shop]");
  if (!root) return;

  qs("#affiliateNote").textContent = DETX.shop.affiliateNote;

  const html = DETX.shop.categories.map((cat) => {
    const items = cat.items.map((it) => `
      <div class="shopItem">
        <div>
          <div class="shopName">${it.name}</div>
          <div class="muted">${it.note}</div>
        </div>
        <a class="btn ghost" href="${it.link}" target="_blank" rel="noopener">Open</a>
      </div>
    `).join("");

    return `
      <section class="track">
        <div class="trackHead">
          <h2>${cat.title}</h2>
          <p class="muted">Curated picks</p>
        </div>
        <div class="shopGrid">${items}</div>
      </section>
    `;
  }).join("");

  root.innerHTML = html;
}

function boot() {
  setYear();
  renderSocials();
  navActive();
  renderFeaturedCourses();
  renderCoursesPage();
  renderCourseDetails();
  renderWatchPage();
  renderShopPage();

  wireModal();
  handleEnrollSubmit();
  handleContactSubmit();

  // Inject brand name
  qsa("[data-brand]").forEach((el) => (el.textContent = DETX.brand.name));
  qsa("[data-tagline]").forEach((el) => (el.textContent = DETX.brand.tagline));
}

document.addEventListener("DOMContentLoaded", boot);

