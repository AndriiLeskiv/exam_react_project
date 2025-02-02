# DummyJSON User & Recipe App

This project is a web application that allows users to log in and browse through a collection of users and recipes. The app interacts with the [DummyJSON API](https://dummyjson.com/docs), providing features like user authentication, searching, pagination, and detailed pages for both users and recipes.

## Features

- **Main Menu:** Displays links to pages and a logo for authenticated users. If the user is not logged in, only a link to the authentication page is available.

- **Search Functionality:** Allows searching for users or recipes based on string values or ID. This search works across different pages (users or recipes).

- **Pagination:** Data displayed on all list pages (users and recipes) is paginated to avoid overwhelming the user with too much information at once.

## Pages

### Home Page (HS)

- The home page assumes the user is not logged in by default.
- It displays a message prompting the user to authenticate, along with a link to the authentication page.

### Authentication Page (SAP)

- A login form that requires a `username` and `password` for authentication using the DummyJSON API.
- The login credentials are:
    - `username: 'emilys'`
    - `password: 'emilyspass'`

- After successful authentication, the main menu will update to show links to the recipe and user pages, as well as the user’s logo (from the DummyJSON user object).

### User Page

- Displays the main menu, search bar, and a list of users with basic information (name, age, and email).
- Clicking on a user redirects to a detailed page showing more in-depth information (up to 10 fields) and a list of their recipes.
- Each recipe is linked to its own detailed page.

### Recipe Page

- Displays the main menu, search bar, and a list of recipes (title + tags).
- Clicking on a recipe redirects to a detailed recipe page with complete information and a link to the user who created the recipe.
- Clicking on a tag will filter and show all recipes with the same tag.

## Pagination

- All list data (users and recipes) is paginated to improve the user experience.
- Pagination is implemented to split the data into smaller chunks and make it easier to navigate.

## State Management

- The app uses **Redux** for managing the state across the entire application. All state changes are done via Redux.

## Design

- The design is kept simple and functional, with no fixed requirements for aesthetics.

## Setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AndriiLeskiv/exam_react_project.git

Created by: Andrii Leskiv