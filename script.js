// Importing json-server library into this project
// const jsonServer = require("json-server");
// const server = jsonServer.create(); // Create a new server
// const router = jsonServer.router("db.json"); // Create a router using the JSON file
// const middlewares = jsonServer.defaults(); // Add default middlewares
// const port = process.env.PORT || 8080;
// server.use(middlewares);
// server.use(router);
// server.listen(port);
// // , () => {
// //   console.log(`JSON Server is running on port ${port}`);
// // });

// Adding event listeners to the document to fire after loading html content
document.addEventListener("DOMContentLoaded", () => {
  // Fetch suspects data and display them to the screen for user to take action
  fetchSuspects();

  // Function to fetch suspects data from the server
  function fetchSuspects() {
    fetch("https://exposed-6wql.onrender.com/suspectsKe") // Make a GET request to the server
      .then((response) => response.json()) // Parse the JSON from the response
      .then((suspects) => displaySuspects(suspects)) // Call displaySuspects with the parsed data
      .catch((error) => console.error("Error fetching suspects:", error)); // Handles fetch-related errors
  }

  // Function to display the suspects data on the page
  function displaySuspects(suspects) {
    const card_wrapper = document.querySelector(".card-wrapper"); // Select the card-wrapper element
    card_wrapper.innerHTML = ""; // Clear any existing content

    suspects.forEach((suspect) => {
      const suspectCard = document.createElement("div"); // Create a new div element for each suspect
      suspectCard.className = "suspect-card"; // Assign the class "suspect-card" to the div

      // Set the inner HTML of the suspectCard with the suspect's data
      suspectCard.innerHTML = `
      <div class="image-container">
        <img class="poster" src="${suspect.poster}" alt="suspectKe Poster">
      </div>
      <label for="suspect-name">Name:</label>
      <strong> <em><span class="name">${suspect.name}</span><br></em></strong>
      <label for="suspect-role-rank">Role/Rank:</label>
      <strong> <span class="role_rank">${suspect.role_rank}</span><br></strong>
      <label for="suspect-phonenumber">Phone Number:</label>
      <span class="phonenumber">${suspect.phonenumber}</span><br>
      <label for="suspect-reasonForExpose">Reason for Expose:</label>
      <em><span class="reasonForExpose">${suspect.reasonForExpose}</span><br></em>
      <button class="report-button">Report</button>
      <select class="action-select">
        <option value="" disabled selected>DCI Action</option>
        <option value="apprehended">Apprehended</option>
        <option value="under_investigation">Under Investigation</option>
        <option value="incarcerated">Incarcerated</option>
      </select>
    `;

      card_wrapper.appendChild(suspectCard); // Add the suspectCard to the card-wrapper

      const reportButton = suspectCard.querySelector(".report-button"); // Select the report button within the suspectCard
      const actionSelect = suspectCard.querySelector(".action-select"); // Select the action select element within the suspectCard

      // Add a click event listener to the report button
      reportButton.addEventListener("click", () => {
        alert("Reported Ama Asalimiwe"); // Display an alert message saying "Reported"
        reportButton.innerText = "Already Reported!"; // Change the button text to "Reported"
        reportButton.style.backgroundColor = "gold"; // Change the button color to yellow once clicked.
        reportButton.style.color = "green"; // Change the font color to green
        actionSelect.disabled = false; // Enable the select element
      });

      // Add a change event listener to the action select element
      actionSelect.addEventListener("change", (event) => {
        actionSelect.style.backgroundColor = "red"; // Change the background color to red
        alert(
          `Suspect has been marked as ${event.target.value.replace("_", " ")}`
        ); // Show an alert with the selected action
      });
    });
  }
  // Adding the submit event listener to the contact form
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting

  const ageSelect = document.getElementById("age");
  const ageValue = ageSelect.value;

  // Check if the selected age is below 16
  if (ageValue === "0-15") {
    alert("Sorry, you must be at least 16 years old to submit the form.");
    return; // Stop the form submission
  }

  // Display thank you message
  alert("Thank you, patriotic Kenyan!");

  // resetting the form after submission
  event.target.reset();
}

// // Function to return the number of suspect elements in the card-wrapper
// function getNumberOfSuspects() {
//   const card_wrapper = document.querySelector(".card-wrapper"); // Select the card-wrapper element
//   return card_wrapper.children.length; // Return the number of child elements within the card-wrapper
// }

// Fetch suspects data on initial load
fetchSuspects();
