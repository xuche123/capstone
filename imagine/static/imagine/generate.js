document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#generate").onclick = function () {
    var spinner = document.querySelector(".spinner-border");
    var img = document.querySelector("#image");
    img.style.display = "none";
    spinner.style.display = "block";
    var text = document.querySelector("#prompt").value;
    console.log(text);

    fetch("/generate_prompt", {
      // Fetch request
      method: "POST",
      body: JSON.stringify({
        prompt: text,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Print result
        spinner.style.display = "none";
        // const img = document.querySelector("#image");
        img.style.display = "block";
        img.src = result.url;
      });
  };
});
