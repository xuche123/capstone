document.addEventListener("DOMContentLoaded", function () {
    var num = 15;
    const post = document.querySelector(".post");
    const gallery = document.querySelector(".gallery");
    var ending = false;

    function renderPost(start) {
        fetch("/fetch_post", {
            // Fetch request
            method: "POST",
            body: JSON.stringify({
            start: start,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
            
            if (result["posts"][0] == undefined) {
                console.log("No more posts")
                let end = document.createElement('h1')
                end.innerHTML = "No more posts"
                gallery.appendChild(end)
                ending = true;
            }
            else {
                for (let i = 0; i<15; i++) {
                    let img = document.createElement('img')
                    img.src = "/media/" + result['posts'][i]['image']
                    post.appendChild(img)
                }
            }
            
            });
    }


    window.onscroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop + 1 >= scrollHeight ) {
        console.log(ending)
        if (!ending) {
            renderPost(num);
            num += 15;

        }
        
    }
    }
});