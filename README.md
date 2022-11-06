# USell: Online Advertisement Board

Welcome! We are Group 14 and this is USell, our project for CS35L. This application was created using MongoDB, Express, React, and Node.js.

Team Members: 
- Johan Chiang (Project Lead)
- Wenhui Chen (Frontend)
- Jacinda J. La (Backend)
- Josh McDermott (Backend)
- Ira Throne (Backend)

## Table of Contents

- [Overview](#overview)
- [Available Scripts](#available-scripts)
- [Installation](#installation)
- [Features](#features)
- [License](#license)


## Overview: 
USell is a platform for users to buy and sell various items in an environment that makes it easy to connect. Users will be able to create listings that are uploaded to the server and other users will be able to see these listings in real time.

## Available Scripts:

- `npm install` installs all the required dependencies.
- `npm start` runs the app in development mode. Open http://localhost:3000 to view it in the browser.
- `npm run server` starts up the server.

## Installation:

1. Open terminal and clone the repository (or download the zip)
   ```sh
   git clone https://github.com/jc-boop/cs-35l-proj.git
   ```  
2. Open the app `cs-35l-proj` in your preferred code editor (such as VSCode),  
   
   or continue with terminal:
   ```sh
   cd cs-35l-proj
   ```  
3. Create a MongoDB account, generate a Cluster. Make sure that you have set up Database & Network Access correctly. You can do this in the following:
   ```Go to https://cloud.mongodb.com/
   Click "Create a New Cluster" on that page and name it
   Click on "Clusters"
   Click on "Create Database"
   Enter a database name
   Enter "listings" for the collection name
   Click on "Create"

   Click on "Database Access" under "Security" on the left-hand menu
   Click "Add new database user"
   Choose the "Password" authentication method
   Input a username and password and grant it permission to "Read and write to any database"
   Add the user

   Click on "Network Access" under "Security" on the left-hand menu
   Click "Add IP address"
   Add the IP address 0.0.0.0/0 (which sets the IP address to the current IP address)

   Return to https://cloud.mongodb.com/ and click on "Clusters"
   Click on "Connect" under your Cluster
   Click on "Connect your application"
   Copy the URL in step 2 and paste it into backend/.env, after DB_URI=
   Replace "<password>" with the password you inputted above
   Replace "myFirstDatabase" with the name of the database in that Cluster's collection that you specified in the above steps
   Save .env
   ```  
4. Open an additional terminal (in order to run both client and server simultaneously). Make sure both terminals are in the `cs-35l-proj` directory.  (To check, `pwd` should return `/path/to/cs-35l-proj`

5. In the first terminal, set up and start server  
   ```sh
   cd backend
   npm install
   npm run server
   ```  
   
6. In the second terminal, set up and start client  
   ```sh
   cd frontend
   npm install
   npm start
   ```  
7. If the app does not automatically launch, open http://localhost:3000 to view it in the browser.

## Usage:  

In order to create a listing, users will need to access http://localhost:3000/post directly, through the navigation bar, or from the hero section.
Users must then supply:  
-Title: Title that is displayed under search results  
-Price: Integer price less than $500,000  
-Category: Select a category the item best belongs to  
-Description: Use string to describe the item  
-Password: Used later to update or delete a listing  
-Image: Image of the listing  

In order to view all listings, sort through the listings, or search for a specific keyword, users will need to access http://localhost:3000/listings/ directly, through the navigation bar, or from the hero section.  
Users will need to supply a keyword in the search bar.  
-Website will search all listings in the database and return any matches found in the listing's title, category, and/or description.  

In order to edit a listing, the user must navigate to the listing's uniquelisting page http://localhost:3000/uniquelisting/:id through the listings page.  
Users will need to press the "Edit" button and make the appropriate changes. Users will need to supply the original password in order to update or delete the listing.  

In order to comment on a listing, the user must navigate to the listing's uniquelisting page http://localhost:3000/uniquelisting/:id through the listings page.  
Users will need to supply a name and comment, then press the Post button.  

## Features:

### Display Dynamic Data to the User 
Users will be able to create listings which will be saved in the server database/back-end. The website will update so other users will be able to see new listings which are created.

### Upload data from Client to Back-end
Users can create a new listing or modify an existing listing. Users can input strings to listing title/listing description, floats to set price, and upload images for the listing.

### Meaningfully search through server-side data 
Users can perform searches for valid/current listings based on string input Users can access dynamic data that changes based on available listings Available search criteria include strings that check titles/listing description/tags

### Unique Feature #1 
Users can comment on certain listings, and the server will update the comments so all users can see new comments.

### Unique Feature #2 
Users can categorize their listings with pre-specified categories so that other users will be able to search for them. (Searching for “furniture” returns all listings categorized as “furniture” even if the term “furniture” is not in the title or description)

### Unique Feature #3 
Users will be able to sort all available listings based on post date. Sort by categories, alphabetically

## License
See `LICENSE` for more information.
