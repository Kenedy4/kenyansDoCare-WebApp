// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Fetch suspects data and display them
  fetchSuspects();
});

// Function to fetch suspects data from the server
function fetchSuspects() {
  fetch("http://localhost:3000/suspectsKe") // Make a GET request to the server
    .then((response) => response.json()) // Parse the JSON from the response
    .then((suspects) => displaySuspects(suspects)) // Call displaySuspects with the parsed data
    .catch((error) => console.error("Error fetching suspects:", error)); // Handle any errors that occur during the fetch
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
        <div id="image-container">
          <img id="poster" src="${suspect.poster}" alt="suspectKe Poster">
        </div>
        <label for="suspect-name">Name:</label>
        <strong> <em><span id="name">${suspect.name}</span><br></em></strong>
        <label for="suspect-role-rank">Role/Rank:</label>
        <strong> <span id="role_rank">${suspect.role_rank}</span><br></strong>
        <label for="suspect-phonenumber">Phone Number:</label>
        <span id="phonenumber">${suspect.phonenumber}</span><br>
        <label for="suspect-reasonForExpose">Reason for Expose:</label>
        <em><span id="reasonForExpose">${suspect.reasonForExpose}</span><br></em>
        <button class="report-button">Report</button>
        <select id="action">
          <option value="" disabled selected placeholder"DCI Action">DCI Action</option>
          <option value="apprehended">Apprehended</option>
          <option value="under_investigation">Under Investigation</option>
          <option value="incarcerated">Incarcerated</option>
        </select>
      `;

    card_wrapper.appendChild(suspectCard); // Add the suspectCard to the card-wrapper

    const reportButton = suspectCard.querySelector(".report-button"); // Select the report button within the suspectCard
    const actionSelect = suspectCard.querySelector("#action"); // Select the action select element within the suspectCard

    // Add a click event listener to the report button
    reportButton.addEventListener("click", () => {
      alert("Reported Ama Asalimiwe"); // Display an alert message saying "Reported"
      reportButton.innerText = "Already Reported!"; // Change the button text to "Reported"
      reportButton.style.backgroundColor = "gold"; // Change the button color to yellow
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

// Function to return the number of suspect elements in the card-wrapper
function getNumberOfSuspects() {
  const card_wrapper = document.querySelector(".card-wrapper"); // Select the card-wrapper element
  return card_wrapper.children.length; // Return the number of child elements within the card-wrapper
}

// Fetch suspects data on initial load
fetchSuspects();
