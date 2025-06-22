
// // menu functionality
// const openMenu = document.getElementById("open-menu");
// const navBox = document.getElementById("nav-Box");

// openMenu.addEventListener("click", () => {
//   navBox.classList.toggle("menu-hidden");
// });



// Navigation logic
const mainSection = document.getElementById("mainSection");
const detailsSection = document.getElementById("detailsSection");
const detailsTitle = document.getElementById("detailsTitle");
const detailsDescription = document.getElementById("detailsDescription");
const benefitsList = document.getElementById("benefitsList");
const usageInfo = document.getElementById("usageInfo");
const backBtn = document.getElementById("backBtn");

// Add click event to all explore buttons
document.querySelectorAll(".explore-btn").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Get data from button attributes
    const title = this.getAttribute("data-title");
    const detail = this.getAttribute("data-detail");
    const benefits = this.getAttribute("data-benefits");
    const usage = this.getAttribute("data-usage");

    // Update details page content
    detailsTitle.textContent = title;
    detailsDescription.textContent = detail;

    // Format benefits as bullet points
    const benefitsArray = benefits.split(", ");
    benefitsList.innerHTML = benefitsArray.map(benefit => `• ${benefit}`).join("<br>");

    usageInfo.textContent = usage;

    // Show details page and hide main section
    mainSection.style.display = "none";
    detailsSection.style.display = "block";

    // Scroll to top of page
    window.scrollTo(0, 0);
  });
});

// Back button functionality
backBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Show main section and hide details page
  detailsSection.style.display = "none";
  mainSection.style.display = "block";

  // Scroll to top of page
  window.scrollTo(0, 0);
});

// Handle browser back button
window.addEventListener('popstate', function () {
  detailsSection.style.display = "none";
  mainSection.style.display = "block";
});

// menu functionality
const openMenu = document.getElementById("open-menu");
const navBox = document.getElementById("nav-Box");

openMenu.addEventListener("click", () => {
  navBox.classList.toggle("menu-hidden");
});

// Optimized contact form submission
document.getElementById("req-btn").addEventListener("click", async () => {
  const firstName = document.getElementById("fName").value.trim();
  const lastName = document.getElementById("lName").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const message = document.getElementById("message").value.trim();
  const error = document.getElementById("signup-error");

  // Clear previous errors
  error.style.display = "none";

  // Validate inputs
  if (!firstName || !lastName || !email || !message) {
    error.textContent = "All fields are required!";
    error.style.display = "block";
    return;
  }

  // Simple email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "Please enter a valid email address!";
    error.style.display = "block";
    return;
  }

  // Show loading state
  const submitBtn = document.getElementById("req-btn");
  submitBtn.disabled = true;
  submitBtn.value = "Sending...";

  try {
    const response = await fetch("https://al-jawdah-backend-1.onrender.com/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });

    if (response.ok) {
      // Show success message
      alert("Your message has been sent successfully!");

      // Reset form
      document.getElementById("fName").value = "";
      document.getElementById("lName").value = "";
      document.getElementById("email-input").value = "";
      document.getElementById("message").value = "";
    } else {
      const data = await response.json();
      error.textContent = data.message || "Failed to send message. Please try again.";
      error.style.display = "block";
    }
  } catch (err) {
    error.textContent = "Network error. Please check your connection and try again.";
    error.style.display = "block";
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.value = "Send Message";
  }
});