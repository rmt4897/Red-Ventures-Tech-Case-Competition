    This git repository contains the project that Abhay Zala, David Lu, and I created
 to compete in Red Ventures Case Competition at UNC Chapel Hill. All three of us
 independently entered this competition and were randomly grouped together on the same team. 








# Red-Ventures-Tech-Case-Competition
### By Abhay Zala, David Lu, & Michael Tyndall

We built a web app

## Our approach:
    * Tasks were divided among the 3 of us. We would realtively split the tasks of retreival and integration of data, css/html design, and other aspects of our project amongst ourselves.
    * At first, we utilized white boards to brainstorm the design of our website. After that, we focused on the API, learning, pulling, and manipulating it so that it would be optimal for performance and user experience.
    * We put an emphasis "taking what works and making it better." With that said, we took inspiration of the layout of netflix and imdb, enabling customers to feel more relaxed with our website, since many people who use tv/movie websites are used to the layout of these two popular companies
    * We then created a back-end database that would store data collected from users of the website and created a business analytics page for solely businesses to help them understand where their customers are and "what they like."
    * Many of us worked on one individual function of the programs we wrote, and then combined all 3 to form a mega-function!


## UI/UX Features:
    * rotating/peeling slideshow that displays randomly generated movies/shows (from the API) in order from highest to lowest rating
    * structuring our website with inspirations from imbd, netflix, and the redventures website
    * allows users to filter movies or shows based on platform, and production company, or just display three random "featured" movies
    on the home page
    * displays all relevant information such as an overview, rating, etc., when the movie/show is clicked by the user

## API Usage:
    * utilized API for all displayed information, movies, shows, images, etc

## Reporting/Customer Acquisition:
    * utilized a no-sql database (Google Firebase Firestore) to log user interactions with the website - for instance, the database will dynamically generate a document in a collection in the database which stores the title, imdb, and "clickcount" of how man times that movie/show that was clicked on. (if the show/movie was clicked the first time, then it would create a new document, if the show/movie already existed, then we increase clickcount by 1)
    * implemented another page where business owners/analysts are able to visually see what is the most popular show/movie on the website (via the "clickcount" in the database) and see the location of the website users (via the heatmap)

## Scalability:
    * Stated before, we utilized dynamically created checkboxes in which enables the website simply add the new production companies or platforms to the API witout having to edit the code
    * We also dynamiclly coded the information for the movie/show overview, title, rating, etc. so that it only pulls the specific movies that match the criteria of the filter or individual movie clicked
    * Our functions were written to be able to seemlessly interpret and display any new aditions to the API
    * The database is able to store many users (the more data, the better; therefore, the more users, the more accurate data we retrieve, enabling the company to be more informed on their customer/audience)

## Presentation: 
    See you all there! :D
