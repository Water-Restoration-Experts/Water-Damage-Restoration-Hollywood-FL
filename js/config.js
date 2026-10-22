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
  bar.innerHTML = '<a href="' + SITE_CONFIG.phoneLink + '">📞 Call ' + SITE_CONFIG.phoneDisplay + ' — 24/7</a>';
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
