document.addEventListener('DOMContentLoaded', () => {
    // Get the login form element by its ID
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button'); // Get the logout button element

    // Check if the login form exists
    if (loginForm) {
        // Add a submit event listener to the login form
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission
            const email = document.getElementById('email').value; // Get the email value
            const password = document.getElementById('password').value; // Get the password value
            await loginUser(email, password); // Call the loginUser function
        });
    }
    

    // Add a click event listener to the logout button
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logoutUser();
        });
    }

    checkAuthentication(); // Check the authentication status on page load
});

// Function to handle user login
async function loginUser(email, password) {
    // Send a POST request to the login endpoint
    const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Send email and password as JSON
    });

    // If the login is successful
    if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        document.cookie = `token=${data.access_token}; path=/`; // Set a cookie with the access token
        window.location.href = 'index.html'; // Redirect to the index page
    } else {
        alert('Login failed: ' + response.statusText); // Show an alert if login fails
    }
}

// Function to handle user logout
function logoutUser() {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear the token cookie
    window.location.href = 'index.html'; // Redirect to the index page
}

// Function to check if the user is authenticated
function checkAuthentication() {
    const token = getCookie('token'); // Get the token from cookies
    const loginLink = document.getElementById('login-link'); // Get the login link element
    const logoutButton = document.getElementById('logout-button'); // Get the logout button element

    // If no token is found, display the login link
    if (!token) {
        if (loginLink) loginLink.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
    } else {
        if (loginLink) loginLink.style.display = 'none'; // Hide the login link if the user is authenticated
        if (logoutButton) logoutButton.style.display = 'block'; // Show the logout button if the user is authenticated
        fetchPlaces(token); // Fetch places data if the user is authenticated
    }
}

// Function to get a cookie value by its name
function getCookie(name) {
    const value = `; ${document.cookie}`; // Get all cookies
    const parts = value.split(`; ${name}=`); // Split cookies to find the target one
    if (parts.length === 2) return parts.pop().split(';').shift(); // Return the cookie value if found
}

// Function to fetch places data from the server
async function fetchPlaces(token) {
    try {
        // Send a GET request to the places endpoint with the token in the header
        const response = await fetch('http://127.0.0.1:5000/places', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // If the request is successful
        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            console.log('Fetched places:', data); // Log the fetched places data
            displayPlaces(data); // Display the places data
        } else {
            console.error('Failed to fetch places:', response.statusText); // Log an error if fetching fails
        }
    } catch (error) {
        console.error('Error fetching places:', error); // Log any caught errors
    }
}

// Function to display places data in the DOM
function displayPlaces(places) {
    const placesList = document.getElementById('places-list'); // Get the places list element
    placesList.innerHTML = ''; // Clear the current list content

    // Iterate over each place and create its HTML structure
    places.forEach(place => {
        const placeElement = document.createElement('div'); // Create a div for each place
        placeElement.classList.add('place'); // Add a class to the place div

        // Set the inner HTML of the place div
        placeElement.innerHTML = `
            <h3>${place.description}</h3>
            <p><strong>Price per night:</strong> $${place.price_per_night}</p>
            <p><strong>Location:</strong> ${place.city_name}, ${place.country_name}</p>
            <button class="details-button">View Details</button>
        `;
        placesList.appendChild(placeElement); // Append the place div to the places list
    });
}

// Implement client-side filtering for places by country
document.getElementById('country-filter').addEventListener('change', (event) => {
    const selectedCountry = event.target.value; // Get the selected country value
    const places = document.querySelectorAll('.place'); // Get all place elements

    // Iterate over each place element and filter based on the selected country
    places.forEach(place => {
        const countryName = place.querySelector('p:nth-of-type(3)').textContent.split(', ')[1]; // Extract the country name
        if (selectedCountry === 'all' || countryName === selectedCountry) {
            place.style.display = 'block'; // Show the place if it matches the filter
        } else {
            place.style.display = 'none'; // Hide the place if it doesn't match the filter
        }
    });
});
