# Social-Network-API

## Description
An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list that uses MongoDB as the database.

## Table of Contents
* [Walkthrough Video](#walkthroughvideo)
* [Installation](#installation)
* [Usage](#usage)
* [Techologies Used](#technologiesused)
* [User Story](#userstory)
* [Acceptance Criteria](#acceptancecriteria)
* [Contributing](#contributing)

## Walkthrough Video
https://drive.google.com/file/d/1VWLY19l4qo320iYkR2UpRLtjKHt5yqf-/view?usp=sharing

## Installation
1. Make sure you have MongoDB and Insomnia or Postman installed.
2. Clone this repo using ssh on your local machine.
```
git clone 
```
3. Open terminal and make sure to cd to the root of the repo.
4. Open the repo in your text editor.
5. Install all the dependencies.
```
npm install
```
6. Run the server using the below command.
```
node server.js
```

## Usage
1. Open Insomnia or Postman
2. Test the various endpoints at http://localhost:3001/

## Technologies
* ExpressJS
* MongoDB database
* Mongoose ODM
* Date-fns

## User Story
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
## Contributing
1. Fork the repo.
2. Add feature or make changes.
3. Make a pull request for review.
