document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#generate").onclick = function () {
    var text = document.querySelector("#prompt").value;
    console.log(text);
    fetch("/generate_prompt", {
      // Fetch request
      method: "POST",
      body: JSON.stringify({
        prompt: text,
      }),
    }) // Fetch response to JSON object
      .then((response) => response.json())
      .then((result) => {
        // Print result
        const img = document.querySelector("#image");
        img.src = result.url;
      });
  };
});
