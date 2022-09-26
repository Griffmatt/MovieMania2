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
I have learned a lot since completing the original application, so i am going back to see how and here i can make improvements. Some of the main things i am focusing on are making the code more maintainable, readable, reusable, and accessible. You can view the [Plan](#plan) below to see how i plan to do these certain things, as well as features i will be working on in the future and different ways i have already improved the application.


## Plan
Things to Improve
* Performance
  - [x] Add a debounce to the movie search to limit the amount of fetch requests, and rerenders
  - [x] look for places to limit rerenders
* Readability and Reusability
  - [x] Add typescript and eslint to improve development
  - [x] Update the folder and file structure to better separate components
  - [x] Create a context and util folder to separate out repeated functions and state being used in multiple components
  - [x] Look over code to look for possible extra blocks being used in multiple components
  - [x] better separate state to make code easier to follow
  - [ ] add tailwind
* Planned Updates
  - [ ] implement react query to cache fetch requests
  - [ ] connect with firebase for user auth and to store user data
  - [ ] update home page for better user experience and differentiate from other pages
  - [ ] add statistics for users to visualize their favorite movies and reviews

## Technologies
Project is created with:
* React
* HTML5
* Scss
* GitHub

## Features
- Movie Filter
- Multiple Pages
- Add to Watch List
- Movie Search
- add / post review to database

## Setup
To run this project, download Zip file, extract it and open the Terminal to locate the folder...

```
$ npm install
$ npm run dev
```

## Author
Griffin Matthews - [Linkedin](https://www.linkedin.com/in/griffin-matthews/) - griffinmmatthews@gmail.com - [Project Portfolio](https://luminous-valkyrie-8034e6.netlify.app/)
