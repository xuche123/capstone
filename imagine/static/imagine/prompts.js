document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const search = document.getElementById("search").value;

      if (search) {
        fetch(`/load_prompts?search=${search}`)
          .then((response) => response.json())
          .then((data) => {
            document.querySelector("#prompts").innerHTML = "";

            data["prompts"].forEach(add_post);
            console.log(data);
          });
        document
          .querySelector(".search-bottom")
          .classList.remove("visually-hidden");
      }
    });

  function add_post(contents) {
    const prompt = document.createElement("div");
    prompt.className = "card card-prompt";

    const card = document.createElement("div");
    card.className = "card-body";

    const text = document.createElement("p");
    text.className = "card-text";
    text.innerHTML = contents;

    const use = document.createElement("button");
    use.className = "btn btn-primary";
    use.innerHTML = "Use";

    card.append(text);
    card.append(use);

    prompt.append(card);

    document.querySelector("#prompts").append(prompt);
  }

  // window.onscroll = () => {
  //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   if (clientHeight + scrollTop + 5 >= scrollHeight) {
  //     load();
  //   }
  // };
});
