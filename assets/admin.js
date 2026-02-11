// assets/admin.js

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));
}

function adminCard(title, rows) {
  return `
    <div class="card" style="background: rgba(255,255,255,0.04); margin-bottom:10px;">
      <div style="font-weight:900; margin-bottom:8px;">${esc(title)}</div>
      ${rows.map(r => `<div class="muted" style="margin:4px 0;">${r}</div>`).join("")}
    </div>
  `;
}

async function loadAdminData() {
  const sb = getSupabase();

  // Enrollments
  const { data: enrollments, error: eErr } = await sb
    .from("enrollments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  const enrollBox = document.querySelector("#enrollmentsBox");
  if (eErr) {
    enrollBox.innerHTML = `<div class="empty">Failed to load enrollments. Check RLS policy.</div>`;
  } else if (!enrollments?.length) {
    enrollBox.innerHTML = `<div class="empty">No enrollments yet.</div>`;
  } else {
    enrollBox.innerHTML = enrollments.map((x) => adminCard(x.course_title, [
      `Name: <b>${esc(x.full_name)}</b>`,
      `Country: ${esc(x.country)} • Phone: ${esc(x.phone)}`,
      `Email: ${esc(x.email)}`,
      `Payment: ${esc(x.payment_method)} ${x.transaction_id ? `• TX: ${esc(x.transaction_id)}` : ""}`,
      x.screenshot_url ? `Screenshot: <a class="chip" href="${esc(x.screenshot_url)}" target="_blank" rel="noopener">Open</a>` : "Screenshot: —",
      `Price: <span style="text-decoration:line-through; opacity:.7;">৳${esc(x.price_original)}</span> <b>৳${esc(x.price_discount)}</b>`,
      `Status: ${esc(x.status)} • Time: ${esc(new Date(x.created_at).toLocaleString())}`,
    ])).join("");
  }

  // Messages
  const { data: messages, error: mErr } = await sb
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  const msgBox = document.querySelector("#messagesBox");
  if (mErr) {
    msgBox.innerHTML = `<div class="empty">Failed to load messages. Check RLS policy.</div>`;
  } else if (!messages?.length) {
    msgBox.innerHTML = `<div class="empty">No messages yet.</div>`;
  } else {
    msgBox.innerHTML = messages.map((x) => adminCard(x.subject, [
      `From: <b>${esc(x.full_name)}</b> (${esc(x.email)})`,
      `Message: ${esc(x.message)}`,
      `Time: ${esc(new Date(x.created_at).toLocaleString())}`,
    ])).join("");
  }
}

async function ensureAdminUI() {
  const sb = getSupabase();
  const loginPanel = document.querySelector("#loginPanel");
  const dashPanel = document.querySelector("#dashPanel");
  const logoutBtn = document.querySelector("#logoutBtn");

  async function refresh() {
    const { data } = await sb.auth.getSession();
    const loggedIn = !!data.session;

    loginPanel.style.display = loggedIn ? "none" : "block";
    dashPanel.style.display = loggedIn ? "block" : "none";
    logoutBtn.style.display = loggedIn ? "inline-flex" : "none";

    if (loggedIn) {
      await loadAdminData();
    }
  }

  document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.querySelector("#loginStatus");
    status.textContent = "Logging in...";

    const email = document.querySelector("#adminEmail").value.trim();
    const password = document.querySelector("#adminPassword").value;

    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      status.textContent = "❌ Login failed. Check email/password.";
      return;
    }
    status.textContent = "✅ Logged in.";
    await refresh();
  });

  logoutBtn.addEventListener("click", async () => {
    await sb.auth.signOut();
    await refresh();
  });

  await refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#loginPanel")) ensureAdminUI();
});
