document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".grid");

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
});
