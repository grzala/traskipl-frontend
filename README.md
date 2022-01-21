# Traski-pl frontend

This project is a frontend to the web application called Traski.pl - a platform for motorcyclists to share, rate and comment motorcycle routes. [More detailed information on this project can be found here.](http://mpanasiuk.me/project.php?project=18)

## Requirements

- React: this project is based on React.js and requires React >= 16
- Npm: this project uses npm >= 8
- This project uses Google maps. You need your own Google maps API key if you wish to run the project yourself.
- This project requires backend API to work correctly. [You can find the backend project under this link](https://github.com/grzala/traski-backend)


## Installation

1. Clone the project
2. Run `npm install`
3. In the root of the project, open `.env.development` and paste the following line into the file `REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY` and replace "YOUR_API_KEY" with your Google maps API key
4. If you havent done it yet,  [Set up the backend project](https://github.com/grzala/traski-backend)
5. Run `npm start`. The react app will run on localhost:3000 and API request will be forwarded to the backend which by default runs on localhost:3001