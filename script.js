document.addEventListener("DOMContentLoaded", () => {
      const navMenu = document.getElementById("navMenu");
      const menuBtn = document.getElementById("menuBtn");
      const navLinks = document.querySelectorAll("[data-page]");
      const pages = document.querySelectorAll(".page");
      const tabButtons = document.querySelectorAll(".tab-btn");
      const productItems = document.querySelectorAll("#productGrid .filter-item");
      const form = document.getElementById("contactForm");
      const successBox = document.getElementById("formSuccess");

      function showPage(pageId) {
        pages.forEach(page => page.classList.remove("active"));
        document.getElementById(`page-${pageId}`).classList.add("active");

        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle("active", link.dataset.page === pageId);
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
        navMenu.classList.remove("show");
      }

      navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          showPage(link.dataset.page);
        });
      });

      menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
      });

      tabButtons.forEach(button => {
        button.addEventListener("click", () => {
          tabButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          const filter = button.dataset.filter;
          productItems.forEach(item => {
            const match = filter === "all" || item.classList.contains(filter);
            item.style.display = match ? "flex" : "none";
          });
        });
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("studentName");
        const email = document.getElementById("studentEmail");
        const category = document.getElementById("itemCategory");
        const desc = document.getElementById("itemDescription");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const categoryError = document.getElementById("categoryError");
        const descError = document.getElementById("descError");

        let valid = true;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function setError(input, errorBox, show) {
          errorBox.style.display = show ? "block" : "none";
          input.style.borderColor = show ? "#dc2626" : "#e5e7eb";
        }

        if (name.value.trim() === "") {
          setError(name, nameError, true);
          valid = false;
        } else {
          setError(name, nameError, false);
        }

        if (!emailPattern.test(email.value.trim())) {
          setError(email, emailError, true);
          valid = false;
        } else {
          setError(email, emailError, false);
        }

        if (category.value === "") {
          setError(category, categoryError, true);
          valid = false;
        } else {
          setError(category, categoryError, false);
        }

        if (desc.value.trim().length < 10) {
          setError(desc, descError, true);
          valid = false;
        } else {
          setError(desc, descError, false);
        }

        if (valid) {
          successBox.style.display = "block";
          form.reset();

          setTimeout(() => {
            successBox.style.display = "none";
          }, 5000);
        }
      });

      showPage("home");
    });