document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".grid");
  var start = 15;
  let msnry = new Masonry(grid, {
    itemSelector: "none",
    columnWidth: ".grid-sizer",
    percentPosition: true,
  });

  imagesLoaded(grid, function () {
    msnry.options.itemSelector = ".grid-item";
    let items = grid.querySelectorAll(".grid-item");
    msnry.appended(items);
  });

  var loadMoreButton = document.querySelector(".load-more-button");
  loadMoreButton.addEventListener("click", async function () {
    var posts = [];
    var fragment = document.createDocumentFragment();

    let x = await fetch("/fetch_post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start: start }),
    });

    let y = await x.json();
    if (JSON.stringify(y) == "{}") {
      loadMoreButton.style.display = "none";
      document.querySelector(".end").style.display = "block";
    } else {
      for (let i = 0; i < Object.keys(y).length; i++) {
        var post = document.createElement("div");
        post.className = "grid-item";
        post.innerHTML =
          `<img src="${y[i].image}" data-id="${y[i].id}" data-bs-toggle="modal" data-bs-target="#postModal"` +
          ` data-body="${y[i].body}" data-user="${y[i].username}" >`;

        fragment.appendChild(post);
        posts.push(post);
      }

      grid.appendChild(fragment);
      // msnry.appended(posts);
      start += 15;
      // msnry.reloadItems();

      imagesLoaded(grid, function () {
        msnry.options.itemSelector = ".grid-item";
        let items = grid.querySelectorAll(".grid-item");
        msnry.appended(posts);
      });
    }
  });
  const copyButton = document.querySelector(".copy-btn");
  const postModal = document.getElementById("postModal");
  postModal.addEventListener("show.bs.modal", function (event) {
    var post = event.relatedTarget;
    var image = post.getAttribute("src");
    var body = post.getAttribute("data-body");
    var username = post.getAttribute("data-user");
    copyButton.innerHTML = "Copy to clipboard";

    postModal.querySelector(".modal-user").innerText = username;
    postModal.querySelector(".modal-prompt").innerText = body;
    postModal.querySelector(".modal-image").setAttribute("src", image);
  });

  copyButton.addEventListener("click", function () {
    var copyText = document.querySelector(".modal-prompt");

    navigator.clipboard.writeText(copyText.innerText);

    copyButton.innerHTML = "Copied!";
  });

  const userButton = document.querySelector(".user-btn");
  userButton.addEventListener("click", function () {
    var user = document.querySelector(".modal-user").innerText;
    window.location.href = `/profile/${user}`;
  });
});
