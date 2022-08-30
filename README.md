# MovieMania 2
Refactoring some of my earlier work, that can be seen [here](https://github.com/Griffmatt/MovieMania)

[Live Site](https://darling-truffle-b03a99.netlify.app/)

## Table of contents
* [Overview](#overview)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Author](#author)

## Overview
I have learned a lot since complting the original application, so i am going back to see how and hwere i can make improvments. Some of the main things i am focusing on are making the code more maintanable, readable, reusable, and accessible. You can view the [Plan](#plan) below to see how i plan to do these certain things, aswell as features i will be workign on in the future and different ways i have already improved the application.


## Plan
Things to Improve
* Performance
  - [x] Add a debounce to the movie search to limit the amount of fetch requests, and rerenders
  - [ ] look for places to limit rerenders, mainly with useState and useEffect
* Readability and Reusability
  - [x] Add typescript and eslint to improve development
  - [ ] Update the folder and file structure to better seperate components and css to where they are being used
  - [ ] Create a context and util folder to seperate out repeated functions and state being used in multiple components
  - [ ] Look over code to look for possible extra blocks being used in multiple components
  - [ ] better seperate state to make code easier to follow
  - [ ] add css modules

Future Features
* Profile page- hwere you can see your rated, favorited, and need to see movies
* Login and registration forms
* Allow users to follow each other to view eachothers movie reviews

## Technologies
Project is created with:
* React
* HTML5
* Scss
* GitHub

## Features
- Movie Filter
- Multiple Pages
- Add to Favourites
- Movie Search

## Setup
To run this project, download Zip file, extract it and open the Terminal to locate the folder...

```
$ npm install
$ npm run dev
```

## Author
Griffin Matthews - [Linkedin](https://www.linkedin.com/in/griffin-matthews/) - griffinmmatthews@gmail.com - [Project Portfolio](https://luminous-valkyrie-8034e6.netlify.app/)
