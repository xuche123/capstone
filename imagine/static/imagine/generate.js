document.addEventListener("DOMContentLoaded", function () {
  btn = document.querySelector("#generate");
  btn.onclick = function () {
    var success = true;
    var spinner = document.querySelector(".spinner-border");
    var img = document.querySelector("#image-generated");
    var test = document.querySelector("#test");

    var prompt = document.querySelector("#prompt").value;
    var prompt_negative = document.querySelector("#prompt-negative").value;
    var width = document.querySelector("#width").value;
    var height = document.querySelector("#height").value;
    var upload = document.querySelector("#uploadCheck").checked;

    // remove alerts
    var prompt_alert = document.querySelector("#no-prompt");
    prompt_alert.classList.add("visually-hidden");
    var prompt_alert = document.querySelector("#wrong-size");
    prompt_alert.classList.add("visually-hidden");

    // validation
    if (prompt.length == 0) {
      var prompt_alert = document.querySelector("#no-prompt");
      prompt_alert.classList.remove("visually-hidden");
      var success = false;
    }

    if (width == "1024" && Number(height) >= "768") {
      var prompt_alert = document.querySelector("#wrong-size");
      prompt_alert.classList.remove("visually-hidden");
      var success = false;
    } else if (height == "1024" && Number(width) >= "768") {
      var prompt_alert = document.querySelector("#wrong-size");
      prompt_alert.classList.remove("visually-hidden");
      var success = false;
    }

    img.style.display = "none";
    spinner.style.display = "block";

    if (success) {
      fetch("/generate_prompt", {
        // Fetch request
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          prompt_negative: prompt_negative,
          width: width,
          height: height,
          upload: upload,
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
    }
  };
});
