document.addEventListener("DOMContentLoaded", function () {
  let darkModeState = false;

  const button = document.getElementById("darkModeBtn");
  const html = document.querySelector("html");

  const useDark = window.matchMedia("(prefers-color-scheme: dark)");

  function toggleDarkMode(state) {
    if (state) {
      html.setAttribute("data-bs-theme", "dark");
      button.classList.add("bi-moon-stars-fill")
      button.classList.remove("bi-sun-fill")
    } else {
      html.setAttribute("data-bs-theme", "light");
      button.classList.remove("bi-moon-stars-fill")
      button.classList.add("bi-sun-fill")
    }

    darkModeState = state;
  }

  function setDarkModeLocalStorage(state) {
    localStorage.setItem("dark-mode", state);
  }

  toggleDarkMode(localStorage.getItem("dark-mode") == "true");

  button.addEventListener("click", () => {
    darkModeState = !darkModeState;

    toggleDarkMode(darkModeState);
    setDarkModeLocalStorage(darkModeState);
  });
});
