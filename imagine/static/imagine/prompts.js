let counter = 0;

document.addEventListener("DOMContentLoaded", load);

function load() {
  const start = counter;
  const end = start + 10;
  counter = end + 1;

  setTimeout(() => {
    fetch(`/load_prompts?start=${start}&end=${end}`)
      .then((response) => response.json())
      .then((data) => {
        data["prompts"].forEach(add_post);
      });
  }, 250);
}

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

window.onscroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop + 5 >= scrollHeight) {
    load();
  }
};
