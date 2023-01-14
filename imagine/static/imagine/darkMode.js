document.addEventListener("DOMContentLoaded", function () {
  let darkMode = false;

  const button = document.getElementById("darkModeBtn");
  const html = document.querySelector("html");
  const darkLogo = document.querySelector(".dark-logo");
  const lightLogo = document.querySelector(".light-logo");
  const navbar = document.getElementById("navbar");

  if (window.matchMedia) {
    const useDark = window.matchMedia("(prefers-color-scheme: dark)");

    if (useDark.matches) {
      toggleDarkMode(true);
    }
  }

  function toggleDarkMode(state) {
    if (state) {
      html.setAttribute("data-bs-theme", "dark");
      button.classList.add("bi-moon-stars-fill");
      button.classList.remove("bi-sun-fill");
      darkLogo.classList.add("active");
      lightLogo.classList.remove("active");
      navbar.classList.add("bg-dark");
      navbar.classList.remove("bg-light");
    } else {
      html.setAttribute("data-bs-theme", "light");
      button.classList.remove("bi-moon-stars-fill");
      button.classList.add("bi-sun-fill");
      darkLogo.classList.remove("active");
      lightLogo.classList.add("active");
      navbar.classList.remove("bg-dark");
      navbar.classList.add("bg-light");
    }

    darkMode = state;
  }

  button.addEventListener("click", () => {
    darkMode = !darkMode;

    toggleDarkMode(darkMode);
  });
});
