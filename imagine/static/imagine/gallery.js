document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".grid");
  var start = 15;
  let msnry = new Masonry(grid, {
    itemSelector: "none",
    columnWidth: ".grid-sizer",
    percentPosition: true,
    stagger: 30,
    visibleStyle: { transform: "translateY(0)", opacity: 1 },
    hiddenStyle: { transform: "translateY(100px)", opacity: 0 },
  });

  imagesLoaded(grid, function () {
    grid.classList.remove("are-images-unloaded");
    msnry.options.itemSelector = ".grid-item";
    let items = grid.querySelectorAll(".grid-item");
    msnry.appended(items);
  });

  var loadMoreButton = document.querySelector(".load-more-button");
  loadMoreButton.addEventListener("click", async function () {
    var elems = [];
    var fragment = document.createDocumentFragment();

    let x = await fetch("/fetch_post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start: start }),
    });

    let y = await x.json();
    // console.log(y);
    if (JSON.stringify(y) == "{}") {
      loadMoreButton.style.display = "none";
      document.querySelector(".end").style.display = "block";
    } else {
      for (let i = 0; i < Object.keys(y).length; i++) {
        // create DOM element for the item
        // console.log(y[i]);
        var elem = document.createElement("div");
        elem.className = "grid-item";
        elem.innerHTML =
          `<img src="${y[i].image}" data-id="${y[i].id}" data-bs-toggle="modal" data-bs-target="#postModal"` +
          ` data-body="${y[i].body}" data-timestamp="${y[i].timestamp}" data-username="${y[i].username}" >`;

        fragment.appendChild(elem);
        elems.push(elem);
      }

      grid.appendChild(fragment);
      msnry.appended(elems);
      start += 15;
    }
  });

  const postModal = document.getElementById("postModal");
  postModal.addEventListener("show.bs.modal", function (event) {
    // Button that triggered the modal
    var post = event.relatedTarget;
    // Extract info from data-* attributes
    var image = post.getAttribute("src");
    var id = post.getAttribute("data-id");
    var body = post.getAttribute("data-body");
    var timestamp = post.getAttribute("data-timestamp");
    var username = post.getAttribute("data-user");
    // Update the modal's content.

    postModal.querySelector(".modal-user").innerText = username;
    postModal.querySelector(".modal-timestamp").innerText = timestamp;
    postModal.querySelector(".modal-prompt").innerText = body;
    // postModal.querySelector(".modal-image").src = image;
    postModal.querySelector(".modal-image").setAttribute("src", image);

    // modalBody.innerHTML = `<img src="${image}" class="modal-image">`;
  });
});
