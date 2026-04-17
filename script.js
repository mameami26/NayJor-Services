// =========================
// POPUP FORM CONTROL
// =========================
function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}


// =========================
// CONTACT FORM (EMAIL)
// =========================
function submitForm(event) {
  event.preventDefault();

  const form = document.querySelector("#popupForm form");

  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.textContent = "Sending...";

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => {
    submitBtn.textContent = "Send";

    if (response.ok) {
      alert("Message sent successfully!");
      form.reset();
      closeForm();
    } else {
      alert("Error sending message. Try again.");
    }
  })
  .catch(() => {
    submitBtn.textContent = "Send";
    alert("Network error. Try again.");
  });
}


// =========================
// TESTIMONIALS (SAVE + LOAD)
// =========================
const testimonialForm = document.getElementById("testimonialForm");
const testimonialList = document.getElementById("testimonialList");

// Load saved reviews on page load
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("reviews")) || [];
  saved.forEach(addReviewToDOM);
});

// Submit new review
testimonialForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reviewer").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const rating = document.getElementById("rating").value;

  if (!name || !text || !rating) {
    alert("Please complete all review fields.");
    return;
  }

  const review = { name, text, rating };

  // Save to localStorage
  const saved = JSON.parse(localStorage.getItem("reviews")) || [];
  saved.push(review);
  localStorage.setItem("reviews", JSON.stringify(saved));

  addReviewToDOM(review);
  testimonialForm.reset();
});


// Display review
function addReviewToDOM(review) {
  const newTestimonial = document.createElement("div");
  newTestimonial.className = "testimonial";
  newTestimonial.innerHTML = `
    <p>"${review.text}"</p>
    <h4>- ${review.name} ${review.rating}</h4>
  `;
  testimonialList.appendChild(newTestimonial);
}