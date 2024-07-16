## News and Users Application
This project is a web application that integrates two main modules: News and Users. It allows to create, edit, delete users and view news articles fetched from an external API and manage user data locally.

## Overview
The application consists of two main modules:

News Module:

Fetches news articles from an external API (NewsAPI).
Displays a list of news articles with pagination support.
Each news article includes a title, description, source, image and published date.

Users Module:

Manages user data locally.
Supports operations such as creating, editing, and deleting user profiles.
Validation ensures data integrity before submission.

## Installation

Clone the repository:

git clone https://github.com/your/repository.git
cd repository-name

Install dependencies:
npm run install

## Running

Run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
News Module:

- Upon loading, the application fetches the latest news articles.
- Navigate through pages using the pagination component at the bottom.
- Click on a news card to view the full article.

Users Module:

- Access the Users section via the navigation bar.
- Add new users by clicking on the "Create User" button.
- Edit or delete existing users from the list.
- Validate user input fields to ensure data correctness.

## Technologies Used
Frontend:

- React.js with Next.js framework for server-side rendering.
- Redux for state management.
- React-Redux toolkit for Redux simplification.
- Sass for styling and responsiveness.

Backend:

- Utilizes Next.js API routes for server-side logic.
- Integrates with external APIs for fetching news data.
- Manages local user data with Redux.
