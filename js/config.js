const SITE_CONFIG = {
  phone: "7542947959",
  phoneDisplay: "(754) 294-7959",
  phoneLink: "tel:+17542947959",
  email: "waterdamageexpertshollywoodfl@gmail.com",
  businessName: "Hollywood Water Damage Experts",
  address: "2027 Pembroke Rd, Hollywood, FL 33020",
  domain: "https://hollywoodwaterdamageexperts.com"
};

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".phone-number").forEach(el => {
    el.textContent = SITE_CONFIG.phoneDisplay;
  });
  document.querySelectorAll(".phone-link").forEach(el => {
    el.href = SITE_CONFIG.phoneLink;
  });
  document.querySelectorAll(".email-address").forEach(el => {
    el.textContent = SITE_CONFIG.email;
    if (el.tagName === "A") el.href = "mailto:" + SITE_CONFIG.email;
  });
});

// Mobile nav: tap a dropdown parent once to expand its submenu, tap again to follow the link
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".nav-item > a").forEach(function(link) {
    link.setAttribute("aria-expanded", "false");
    link.setAttribute("aria-haspopup", "true");
    link.addEventListener("click", function(e) {
      if (window.innerWidth <= 1100) {
        var item = link.parentElement;
        if (!item.classList.contains("open")) {
          e.preventDefault();
          document.querySelectorAll(".nav-item.open").forEach(function(o) {
            o.classList.remove("open");
            var a = o.querySelector(":scope > a");
            if (a) a.setAttribute("aria-expanded", "false");
          });
          item.classList.add("open");
          link.setAttribute("aria-expanded", "true");
        }
      }
    });
  });
});

/* ===== Sticky mobile call bar + working contact form ===== */
document.addEventListener("DOMContentLoaded", function () {
  var bar = document.createElement("div");
  bar.className = "mobile-call-bar";
  bar.innerHTML = '<a href="' + SITE_CONFIG.phoneLink + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Call ' + SITE_CONFIG.phoneDisplay + ' <span class="call-bar-247">· 24/7</span></a>';
  document.body.appendChild(bar);

  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var idm = form.action.match(/\/f\/([A-Za-z0-9]+)\/?$/);
    if (!idm) {
      status.textContent = "Our contact form is being set up — please call " + SITE_CONFIG.phoneDisplay + " for immediate help.";
      status.className = "error"; return;
    }
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = "Sending…"; status.className = "";
    fetch("https://formspree.io/f/" + idm[1], {
      method: "POST", body: new FormData(form),
      headers: { "Accept": "application/json" }
    }).then(function (r) {
      if (!r.ok) throw new Error("send failed");
      status.textContent = "Thank you! We've received your message and will contact you shortly. For emergencies, please call " + SITE_CONFIG.phoneDisplay + ".";
      status.className = "success"; form.reset();
    }).catch(function () {
      status.textContent = "Something went wrong — please try again or call " + SITE_CONFIG.phoneDisplay + ".";
      status.className = "error";
    }).finally(function () { btn.disabled = false; });
  });
});

// FAQ accordion: tap a question to open/close its answer.
// CSS hides .faq-item p until the item has class "open".
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".faq-item h3").forEach(function (q) {
    q.addEventListener("click", function () {
      q.parentElement.classList.toggle("open");
    });
  });
});
