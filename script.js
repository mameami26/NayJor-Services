function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}
function submitForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name && email && message) {
    alert("Form submitted successfully!");
    closeForm();
  } else {
    alert("Please fill in all fields.");
  }
}
// Testimonial Form Logic
document.getElementById("testimonialForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reviewer").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const rating = document.getElementById("rating").value;

  if (!name || !text || !rating) return;

  const newTestimonial = document.createElement("div");
  newTestimonial.className = "testimonial";
  newTestimonial.innerHTML = `<p>"${text}"</p><h4>- ${name} ${rating}</h4>`;

  document.getElementById("testimonialList").appendChild(newTestimonial);

  document.getElementById("testimonialForm").reset();
});
