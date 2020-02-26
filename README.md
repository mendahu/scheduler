# Interview Scheduler

Interview Scheduler is a demonstration single page app to showcase skills in React as well as testing workflows using Jest and Cypress. A continuous deployment pipeline was also setup with a persistent db at Heroku and auto-deploy through CircleCI and Netlify.

You can view an interactive demo [here](https://silly-wright-d157d6.netlify.com) (please allow time for Heroku server to boot if visiting for the first time or after a period of inactivity).

## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

## Features

This single page app uses React to store state for selected days, spots remaining, displayed appointments, and the visual state of the form depending on the user flow.

### View appointments by day

![view appointments](https://github.com/mendahu/scheduler/blob/master/docs/full.png?raw=true)

Interview Scheduler can display appointments for one day, and users can toggle different days to view dynamically.

Individual appointments show an interviewee and interviewer and a time.

## Add or Edit Appointments

![add or edit appointments](https://github.com/mendahu/scheduler/blob/master/docs/new.png?raw=true)

Users can add a new appointment by clicking the Add button and entering a name and selecting an interviewer.

Edit functionality uses the same form structuree.

## Delete Appoitments

![delete appointments](https://github.com/mendahu/scheduler/blob/master/docs/del.png?raw=true)

Users can delete appointments. A cancel confirmation ensures users don't make mistakes.

