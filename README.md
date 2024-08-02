# HBnB Evolution Project: Part 3 - Front-end Web Development

In this phase, you’ll focus on developing the front-end of the HBnB application using HTML5, CSS3, and JavaScript ES6. The goal is to design and implement an interactive user interface that connects with the back-end services developed in previous phases.

## Objectives

- Develop a user-friendly interface following provided design specifications.
- Implement client-side functionality to interact with the back-end API.
- Ensure secure and efficient data handling using JavaScript.
- Apply modern web development practices to create a dynamic web application.

## Learning Goals

- Understand and apply HTML5, CSS3, and JavaScript ES6 in a real-world project.
- Learn to interact with back-end services using AJAX/Fetch API.
- Implement authentication mechanisms and manage user sessions.
- Use client-side scripting to enhance user experience without page reloads.

## Tasks Breakdown

### Task 1: Design

- Complete provided HTML and CSS files to match the given design specifications.
- Create pages for **Login**, **List of Places**, **Place Details**, and **Add Review**.

### Task 2: Login

- Implement login functionality using the back-end API.
- Store the JWT token returned by the API in a cookie for session management.

### Task 3: List of Places

- Implement the main page to display a list of all places.
- Fetch places data from the API and implement client-side filtering based on country selection.
- Ensure the page redirects to the login page if the user is not authenticated.

### Task 4: Place Details

- Implement the detailed view of a place.
- Fetch place details from the API using the place ID.
- Provide access to the add review form if the user is authenticated.

### Task 5: Add Review

- Implement the form to add a review for a place.
- Ensure the form is accessible only to authenticated users, redirecting others to the index page.

## Resources

- [HTML5 Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3 Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript ES6 Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Handling Cookies in JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Client-Side Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

## Tasks

### Task 0: Design (Mandatory)

#### Objectives

- Complete the provided HTML and CSS files to match the design specifications.
- Create the following pages:
  - Login Form
  - List of Places
  - Place Details
  - Add Review Form

#### Instructions

1. **Download the Provided Files**:
   - Obtain the HTML and CSS files provided as the starting point for this task.

2. **Complete the HTML Structure**:
   - Use semantic HTML5 elements to structure the content of each page.
   - Ensure the structure matches the design specifications provided.

3. **Apply CSS Styles**:
   - Use the provided CSS file and add necessary styles to achieve the desired design.

#### Important Structure

- **Header**:
  - Must include the application logo (`logo.png`) with the class `logo`.
  - Must include the login button or link with the class `login-button`.

- **Footer**:
  - Must include text indicating all rights reserved.

- **Navigation Bar**:
  - Must include relevant navigation links (e.g., `index.html` and `login.html`).

### Task 1: Implementation - Login (Mandatory)

#### Objectives

- Implement login functionality using the back-end API.
- Store the JWT token returned by the API in a cookie for session management.

#### Requirements

- Use the existing login form provided in `login.html`.
- Make an AJAX request to the login endpoint of your API when the user submits the login form.
- Store the JWT token in a cookie and redirect the user to the main page upon successful login.

### Task 2: Implementation - Index (List of Places) (Mandatory)

#### Objectives

- Implement the main page to display a list of all places.
- Fetch places data from the API and implement client-side filtering based on country selection.

### Task 3: Implementation - Place Details (Mandatory)

#### Objectives

- Implement the detailed view of a place.
- Fetch place details from the API using the place ID.

### Task 4: Implementation - Add Review (Mandatory)

#### Objectives

- Implement the form to add a review for a place.
- Ensure only authenticated users can submit reviews.

## Repository

- GitHub repository: [holbertonschool-hbnb-client](https://github.com/yourusername/holbertonschool-hbnb-client)

## Testing the Frontend

To test your frontend with the backend, you can use a Mock API if the one from part 2 doesn’t work. This Mock API should allow you to make API calls and test all the frontend functionalities that you will implement in this project.

---

This project aims to enhance your understanding of modern web development techniques while creating a functional application.
