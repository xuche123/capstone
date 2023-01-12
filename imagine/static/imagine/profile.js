document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".grid");
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

  const copyButton = document.querySelector(".copy-btn");
  const postModal = document.getElementById("postModal1");
  postModal.addEventListener("show.bs.modal", function (event) {
    var post = event.relatedTarget;
    var image = post.getAttribute("src");
    var body = post.getAttribute("data-body");
    var timestamp = post.getAttribute("data-timestamp");
    var username = post.getAttribute("data-user");
    copyButton.innerHTML = "Copy to clipboard";

    postModal.querySelector(".modal-user").innerText = username;
    postModal.querySelector(".modal-timestamp").innerText = timestamp;
    postModal.querySelector(".modal-prompt").innerText = body;
    postModal.querySelector(".modal-image").setAttribute("src", image);
  });

  copyButton.addEventListener("click", function () {
    var copyText = document.querySelector(".modal-prompt");

    navigator.clipboard.writeText(copyText.innerText);

    copyButton.innerHTML = "Copied!";
  });
});
