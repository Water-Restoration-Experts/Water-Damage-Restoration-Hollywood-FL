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
