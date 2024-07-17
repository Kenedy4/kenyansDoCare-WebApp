// // This section adds Event listener to load entire DOM before running the script
// document.addEventListener("DOMContentLoaded", () => {
//      // Referencing HTML form elements through their ids.
//      const poster = document.getElementById("poster");
//      const name= document.getElementById("name");
//      const rank_role = document.getElementById("rank_role");
//      const phonenumber= document.getElementById("phonenumber");
//      const ReasonsForExpose= document.getElementById("reasonForExpose");
//      const report = document.getElementById("report");
//      const action = document.getElementById("action");

//      // variable declaration to get the suspects displayed
// )

document.addEventListener("DOMContentLoaded", () => {
  fetchSuspects();
});

function fetchSuspects() {
  fetch("http://localhost:3000/suspectsKe")
    .then((response) => response.json())
    .then((suspects) => displaySuspects(suspects))
    .catch((error) => console.error("Error fetching suspects:", error));
}

function displaySuspects(suspects) {
  const cardWrapper = document.querySelector(".card-wrapper");
  cardWrapper.innerHTML = ""; // Clear existing content

  suspects.forEach((suspect) => {
    const suspectCard = document.createElement("div");
    suspectCard.className = "suspect-card";
    suspectCard.style.width = "30%";
    suspectCard.style.margin = "1%";

    suspectCard.innerHTML = `
        <div id="image-container">
          <img id="poster" src="${suspect.poster}" alt="suspectKe Poster">
        </div>
        <label for="name" id="name">Name: ${suspect.name}</label><br>
        <label for="role_rank" id="role_rank">Role Rank: ${suspect.role_rank}</label><br>
        <label for="phonenumber" id="phonenumber">Phone Number: ${suspect.phonenumber}</label><br>
        <label for="reasonForExpose" id="reaonForExpose">Reason for Expose: ${suspect.reaonForExpose}</label><br>
        <button id="report">Reported</button>
        <select id="action">
          <option value="" disabled selected>DCI Action</option>
          <option value="apprehended">Apprehended</option>
          <option value="under_investigation">Under Investigation</option>
          <option value="incarcerated">Incarcerated</option>
        </select>
      `;

    cardWrapper.appendChild(suspectCard);

    const reportButton = suspectCard.querySelector("#report");
    const actionSelect = suspectCard.querySelector("#action");

    reportButton.addEventListener("click", () => {
      reportButton.innerText = "Reported";
      reportButton.disabled = true;
    });

    actionSelect.addEventListener("change", (event) => {
      actionSelect.style.backgroundColor = "red";
      actionSelect.disabled = true;
      alert(
        `Suspect has been marked as ${event.target.value.replace("_", " ")}`
      );
    });
  });
}
