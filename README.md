# Movie Recommender App

## To run locally:

### Prerequisites
Install npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Commands
`npm install`\
Installs necessary dependencies.

`npm start`\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Movie Recommendation Systems

### Genre Recommender (System 1)
This recommender implements the IMDb movie popularity formula per movie genre. The user can provide a genre and measure of the popularity importance (0-5) when receiving movie recommendations.

### Ratings Recommender (System 2)
In this page, the user is encouraged to rate as many movies as possible according to their preferences. Then, based on these ratings, the user can receive relevant movie recommendations. Recommendations are computed via user-based collaborative filtering using a weighted average of k-nearest-neighbor ratings of their respective amplified pearson correlations to the user's input ratings.

## App URL (may or may not be active)
https://master.d3947hszdljker.amplifyapp.com
