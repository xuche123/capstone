document.addEventListener("DOMContentLoaded", function () {

  var grid = document.querySelector('.grid');

  let msnry = new Masonry(grid, {
    itemSelector: 'none',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    stagger: 30,
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
  });

  imagesLoaded(grid, function () {
    grid.classList.remove('are-images-unloaded');
    msnry.options.itemSelector = '.grid-item';
    let items = grid.querySelectorAll('.grid-item');
    msnry.appended(items);
  });


  // function renderPost(start) {
  //   fetch("/fetch_post", {
  //     // Fetch request
  //     method: "POST",
  //     body: JSON.stringify({
  //       start: start,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result["posts"][0] == undefined) {
  //         console.log("No more posts");
  //         let end = document.createElement("h1");
  //         end.innerHTML = "No more posts";
  //         grid.appendChild(end);
  //         ending = true;
  //       } else {
  //         for (let i = 0; i < 15; i++) {
  //           let img = document.createElement("img");
  //           img.src = "/media/" + result["posts"][i]["image"];
  //           let item = document.createElement("div");
  //           item.className = "grid-item";
  //           item.appendChild(img);
  //           grid.appendChild(item);
  //         }
  //       }
  //     });
  // }

  // window.onscroll = () => {
  //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   if (clientHeight + scrollTop + 1 >= scrollHeight) {
  //     if (!ending) {
  //       renderPost(num);
  //       num += 15;
  //     }
  //   }
  // };
});
