let counter = 0;

document.addEventListener('DOMContentLoaded', load);

function load() {
    const start = counter;
    const end = start + 10;
    counter = end + 1;

    setTimeout(() => {
        fetch(`/load_prompts?start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => {
                console.log(data['prompts']);
                data['prompts'].forEach(add_post);
            })
    }, 750);
};

function add_post(contents) {

    const prompt = document.createElement('div');
    prompt.className = 'card';

    const card = document.createElement('div');
    card.className = 'card-body';

    const text = document.createElement('p');
    text.className = 'card-text';
    text.innerHTML = contents;

    const use = document.createElement('button');
    use.className = 'btn btn-dark';
    use.innerHTML = 'Use';

    const favorite = document.createElement('button');
    favorite.className = 'btn btn-dark';
    favorite.innerHTML = 'Favorite';

    card.append(text);
    card.append(use);
    card.append(favorite);
    
    prompt.append(card);



    document.querySelector('#prompts').append(prompt);
};

window.onscroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop + 5 >= scrollHeight) {
        load()
    }
}