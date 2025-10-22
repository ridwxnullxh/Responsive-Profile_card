// Live clock only - upload and toggle logic removed
const timeEl = document.getElementById("userTime");
function updateTime() {
  if (!timeEl) return;
  timeEl.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);

// Contact form validation (if contact form exists)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const subjectEl = document.getElementById("subject");
  const messageEl = document.getElementById("message");

  const errors = {
    name: document.getElementById("error-name"),
    email: document.getElementById("error-email"),
    subject: document.getElementById("error-subject"),
    message: document.getElementById("error-message"),
  };

  const successEl = document.getElementById("form-success");

  function showError(field, msg) {
    const el = errors[field];
    if (!el) return;
    el.textContent = msg;
    const input = {
      name: nameEl,
      email: emailEl,
      subject: subjectEl,
      message: messageEl,
    }[field];
    if (input) input.setAttribute("aria-describedby", el.id);
  }

  function clearErrors() {
    Object.values(errors).forEach((e) => {
      if (e) e.textContent = "";
    });
    [nameEl, emailEl, subjectEl, messageEl].forEach((inp) => {
      if (inp) inp.removeAttribute("aria-describedby");
    });
    if (successEl) {
      successEl.textContent = "";
      successEl.hidden = true;
    }
  }

  function validateEmail(email) {
    // simple RFC-like check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    if (!nameEl.value.trim()) {
      showError("name", "Full name is required.");
      valid = false;
    }
    if (!emailEl.value.trim()) {
      showError("email", "Email is required.");
      valid = false;
    } else if (!validateEmail(emailEl.value.trim())) {
      showError("email", "Enter a valid email (name@example.com).");
      valid = false;
    }
    if (!subjectEl.value.trim()) {
      showError("subject", "Subject is required.");
      valid = false;
    }
    if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
      showError("message", "Message must be at least 10 characters.");
      valid = false;
    }

    if (!valid) {
      const firstErr = Object.keys(errors).find(
        (k) => errors[k] && errors[k].textContent
      );
      if (firstErr) {
        const field = {
          name: nameEl,
          email: emailEl,
          subject: subjectEl,
          message: messageEl,
        }[firstErr];
        if (field) field.focus();
      }
      return;
    }

    // On success, show confirmation (no network call here)
    if (successEl) {
      successEl.textContent = "Thanks — your message has been sent.";
      successEl.hidden = false;
    }
    form.reset();
  });
});
