# CS50w Capstone Project

Imagine is a web application that allows users to create, share and view AI generated art. The art is generated using the stable diffusion model by Stability AI hosted on [replicate](https://replicate.com/stability-ai/stable-diffusion). Custom art and prompts used for demonstration purposes are retrieved from [Lexica](https://lexica.art/). Features of the web application includes:

1. Generation of AI art with specific prompts.
2. Gallery page to view creations of other people.
3. Prompts page with a search functionality to get more specific prompts that will produce a better image.
4. Profile page to view details of a specific user such as their biography as well as their creations.

# Distinctiveness and Complexity

Distinctiveness: This project was inspired by the release of the stable diffusion v2 release by Stability AI and is my attempt to create a web application that allows you to create and share AI generated art. This web application is heavily focused on the media, in particular images which is not the main focus of other projects in the course. Hence, the concept of this web application makes it distinct from the other CS50w projects and in particular is not an e-commerce site or social network

Complexity: I believe this project is sufficiently distinct as it incorporates most of the concepts taught during the course. This project uses Django in the backend with 4 models. The frontend uses vanilla HTML/CSS/Javascript. Bootstrap is also used to aid in styling. This project is mobile-responsive as well.

# Structure Overview

- `static\imagine`
  - `darkMode.js`
  - `gallery.js`
  - `generate.js`
  - `login.js`
  - `profile.js`
  - `prompts.js`
  - `styles.css`
- `templates\imgaine`
  - `edit_profile.html`
  - `gallery.html`
  - `generate.html`
  - `index.html`
  - `layout.html`
  - `login.html`
  - `profile.html`
  - `register.html`
- `models.py`
  - `User`
  - `Profile`
  - `Post`
  - `Prompt`
- `views.py`

# File Specifics

- `darkMode.js`
  - Responsible for the behavior of the website upon the toggling of the dark mode button located on the top right corner of the website. This will alter the appearance of elements like icons, navbar and background according whether light mode or dark mode is on.
- `gallery.js`

  - Responsible for the behavior of the `gallery` page. This utilizes two external javascript packages via CDN, which are. [Masonry](https://masonry.desandro.com/) and [imagesLoaded](https://imagesloaded.desandro.com/). This results in a responsive image gallery arranged in a masonry grid with 4 columns initially.

  - The gallery page will display 15 images initially. Upon clicking the "Load more" button at the end of the page, a fetch request will be sent to retrieve more posts.

  - Each image in the gallery can be clicked to open a modal containing the picture in full resolution, prompt used to generate the picture, user that generated the picture. There are three buttons as well, which will allow for the user to either download the image, view the user that generated the image or copy the prompt used to clipboard for use.

- `generate.js`

  - Responsible for the behavior of the `generate` page. Form validation is done to ensure that input entered is valid (valid dimensions, prompt field not left empty etc). If valid, the input will then be sent to the backend which will be used to generate an image. The resulting image will then be sent back to the frontend and displayed on the same page.

  - "Get random prompt" button can be used to fill the form with a randomly chosen prompt from the database.

- `login.js`

  - Responsible for the behavior of the `login` and `register` page. Implements custom form validation provided by [Bootstrap 5](https://getbootstrap.com/docs/5.3/forms/validation/).

- `profile.js`

  - Responsible for the behavior of the `profile` page. Similar to `gallery.js` but without the "load more" button.

- `prompts.js`

  - Responsible for the behavior of the `prompts` page. When the "Search" button is clicked, the input in the search box will be used to find prompts in the database that match the search term. The matches will then be displayed on the page.

- `models.py`

  - `User`
    - User model provided by Django.
  - `Profile`
    - Extends `User`, contains information like user bio and profile picture.
  - `Post`
    - Contains information of the generated images. Fields include upload user, image url, prompt used and time created.
  - `Prompt`
    - Contains information of prompts that can be used. Fields include upload user and prompt text. Comes with 1000 prompts by default and allows for users to upload their own prompts.

- `views.py`
  - API
    - `load_prompts`
      - Backend api for `prompts.js`
    - `random_prompt`
      - Backend API for `generate.js`.
    - `fetch_post`
      - Backend API for `gallery.js`.
    - `generate_prompt`
      - Backend API for `generate.js`.
  - Website URLS
    - `login`
      - Renders the `login` page.
    - `logout`
      - Logs the user out and redirects to the `index` page.
    - `register`
      - Renders the `registration` page.
    - `gallery`
      - Renders the `gallery` page.
    - `generate`
      - Sends an api request to a stable diffusion model hosted on [replicate](https://replicate.com/stability-ai/stable-diffusion). Response is sent to the frontend end to be displayed
    - `prompts`
      - Renders the `prompts` page.
    - `profile`
      - Renders the `profile` page.
    - `edit_profile`
      - Allows the user to edit their profile information.

# Installations and how to run

1. Install require packages using:

   `pip install -r requirements.txt`

2. Start the server using:

   `python manage.py runserver`
