# Quick-lend

The express server for quick-lend. Allows users to put up requests for day-to-day utilities (like chargers, and other electronic devices) to quickly borrow/lend items within a small community.

Built using ExpressJS & Mongoose (take a look at src/models to see the schemas used and the collections you should set up).

## Installation

- Clone the repository
- Install the dependencies listed in package.json using `npm install`
- Run the app using `npm start`

## Using Docker

- Clone the repo
- Build the image using `docker build -t <image_name>`.
- Create a file containing the following environment variables: `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET` & `DATABASE_URI` (and perhaps `PORT` as well) with suitable values assigned to them, separated by newlines.
- Run the container using `docker run -d -p <any_open_port>:4000 --env-file <the_env_variable_file_you_just_created> <image_name>` (-d to run it in detached mode).
- The server should now be running on `http://localhost:<the_open_port_you_used_above>/`.
