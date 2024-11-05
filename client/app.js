var LOGLIST;
var ONDISPLAY = null;
var EDITING;

let coasterReviewWrapper = document.querySelector("section");

const apiURL =
  window.location.protocol === "file:"
    ? "http://localhost:8080" //Local API server during deployment
    : ""; // Production API

function getLogs() {
  fetch(apiURL + "/logs").then(function (response) {
    response.json().then(function (data) {
      LOGLIST = data;
      LOGLIST.sort((a, b) => {
        // First compare the date
        const dateComparison = new Date(b.date) - new Date(a.date);

        if (dateComparison !== 0) {
          return dateComparison; // If dates are different, return the comparison result
        } else {
          // If dates are the same, compare the time
          return b.time.localeCompare(a.time);
        }
      });
      LOGLIST.forEach(addLog);
      setDisplayLog(LOGLIST[0]["id"]);
      // ONDISPLAY = LOGLIST[0]["id"];
      console.log(LOGLIST);
    });
  });
}

function addLog(log) {
  const section = document.querySelector("#grid-column");

  let logDiv = document.createElement("div");
  logDiv.classList.add("log");
  logDiv.id = log["id"];

  let logDate = document.createElement("div");
  logDate.classList.add("log-date");

  let date = document.createElement("div");
  date.classList.add("date");
  date.textContent = log["date"];
  logDate.appendChild(date);
  let time = document.createElement("div");
  time.classList.add("time");
  time.textContent = log["time"];
  logDate.appendChild(time);

  let logTitle = document.createElement("div");
  logTitle.classList.add("log-title");
  logTitle.textContent = log["title"];

  logDiv.appendChild(logDate);
  logDiv.appendChild(logTitle);

  logDiv.addEventListener("click", function () {
    setDisplayLog(logDiv.id);
    ONDISPLAY = logDiv.id;
  });

  section.appendChild(logDiv);
}

function deleteLog(id) {
  let gridColumn = document.querySelector("#grid-column");
  fetch(apiURL + "/logs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("Entry Deleted");
    console.log(response);
    gridColumn.innerHTML = "";
    getLogs();
  });
}

function startEdit(index) {
  console.log(index);
  var log = LOGLIST[index];
  if (!log) {
    alert("Journal Entry not Found!");
    return;
  }

  EDITING = index;

  toggleModal();
  // Show update button but remove entry button
  // Entry button is automatically shown from toggle modal
  // Edit button is automatically removed in toggle modal
  var entryButton = document.querySelector("#entry-button");
  var updateButton = document.querySelector("#update-button");
  var entryType = document.querySelector("#entry-type");

  entryButton.classList.add("hidden");
  updateButton.classList.remove("hidden");
  entryType.innerHTML = "Edit Entry";

  let title = document.querySelector("#title-input");
  let summary = document.querySelector("#summary-input");
  let todo = document.querySelector("#todo-input");
  let questions = document.querySelector("#questions-input");
  let ideas = document.querySelector("#ideas-input");

  title.value = log.title;
  summary.value = log.summary;
  todo.value = log.todo;
  questions.value = log.questions;
  ideas.value = log.ideas;
}

function updateLog() {
  if (!LOGLIST[EDITING]) {
    alert("Invalid Update Request!");
    return;
  }

  var id = LOGLIST[EDITING].id;
  var log = LOGLIST[EDITING];

  let gridDisplay = document.querySelector("#grid-display");
  let gridColumn = document.querySelector("#grid-column");

  let title = document.querySelector("#title-input");
  let summary = document.querySelector("#summary-input");
  let todo = document.querySelector("#todo-input");
  let questions = document.querySelector("#questions-input");
  let ideas = document.querySelector("#ideas-input");

  let data =
    "date=" +
    encodeURIComponent(log.date) +
    "&time=" +
    encodeURIComponent(log.time) +
    "&title=" +
    encodeURIComponent(title.value) +
    "&summary=" +
    encodeURIComponent(summary.value) +
    "&todo=" +
    encodeURIComponent(todo.value) +
    "&questions=" +
    encodeURIComponent(questions.value) +
    "&ideas=" +
    encodeURIComponent(ideas.value);

  fetch(apiURL + "/logs/" + id, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("Entry Updated");
    console.log(response);
    gridColumn.innerHTML = "";
    getLogs();
  });
}

function setDisplayLog(logId) {
  let currentLog = null;
  for (let i = 0; i < LOGLIST.length; i++) {
    if (LOGLIST[i]["id"] == logId) {
      let oldDisplay = document.getElementById(ONDISPLAY);
      if (ONDISPLAY && oldDisplay) {
        oldDisplay.classList.remove("selected");
      }
      ONDISPLAY = logId;
      currentLog = LOGLIST[i];
      let newDisplay = document.getElementById(logId);
      newDisplay.classList.add("selected");
    }
  }
  if (!currentLog) {
    return;
  }
  let display = document.querySelector("#grid-display");

  let displayTitle = document.querySelector(".display-title");
  let summary = document.querySelector(".summary");
  let todo = document.querySelector(".todo");
  let questions = document.querySelector(".questions");
  let ideas = document.querySelector(".ideas");

  displayTitle.textContent = currentLog["title"];
  summary.textContent = currentLog["summary"];
  todo.textContent = currentLog["todo"];
  questions.textContent = currentLog["questions"];
  ideas.textContent = currentLog["ideas"];
}

let addReviewButton = document.querySelector("#add-review-button");
function addNewReview() {
  let inputCoasterName = document.querySelector("#input-coaster-name");

  // Prepare data to send to server
  let data = "name=" + encodeURIComponent(inputCoasterName.value);
  // If sending more data:
  //    name=Tatsu&review=Best%20Flying%20Coaster
  //    EX: data += "&review=" + encodeURIComponent(input.value)
  // Send new review to the server
  fetch(apiURL + "/rollercoasters", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("New Review Created");
    console.log(response);
    coasterReviewWrapper.innerHTML = "";
    getCoasters();
  });
}

function addNewLog() {
  // TODO
  // Reformat to handle edit as well
  // Change the modal and its code to handle edit as well
  let gridDisplay = document.querySelector("#grid-display");
  let gridColumn = document.querySelector("#grid-column");
  let date = getFormattedDate();
  let time = getMilitaryTime();

  let title = document.querySelector("#title-input");
  let summary = document.querySelector("#summary-input");
  let todo = document.querySelector("#todo-input");
  let questions = document.querySelector("#questions-input");
  let ideas = document.querySelector("#ideas-input");

  let data =
    "date=" +
    encodeURIComponent(date) +
    "&time=" +
    encodeURIComponent(time) +
    "&title=" +
    encodeURIComponent(title.value) +
    "&summary=" +
    encodeURIComponent(summary.value) +
    "&todo=" +
    encodeURIComponent(todo.value) +
    "&questions=" +
    encodeURIComponent(questions.value) +
    "&ideas=" +
    encodeURIComponent(ideas.value);

  fetch(apiURL + "/logs", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(function (response) {
    console.log("New Review Created");
    console.log(response);
    gridColumn.innerHTML = "";
    getLogs();
  });
}

function getFormattedDate() {
  const today = new Date(); // Get the current date

  const month = String(today.getMonth() + 1).padStart(2, "0"); // Get month (0-11), add 1, and pad with zero if needed
  const day = String(today.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
  const year = today.getFullYear(); // Get the full year (e.g., 2024)

  return `${month}/${day}/${year}`; // Return formatted date
}

function getMilitaryTime() {
  const now = new Date(); // Get the current date and time

  const hours = String(now.getHours()).padStart(2, "0"); // Get hours in 24-hour format (0-23) and pad with zero
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Get minutes and pad with zero if needed

  return `${hours}:${minutes}`; // Return formatted time
}

// Rotating SVG
//
const button = document.querySelector("#add-button");
const svg = document.querySelector(".add-icon");

// When the mouse enters, apply the rotation
button.addEventListener("mouseenter", () => {
  svg.classList.add("rotated");
});

// When the mouse leaves, rotate it back to the initial state
button.addEventListener("mouseleave", () => {
  svg.classList.remove("rotated");
});
//
//

const cancelButton = document.querySelector("#cancel-button");
const addButton = document.querySelector("#add-button");
const modal = document.querySelector("#modal");
cancelButton.addEventListener("click", () => {
  toggleModal();
});

addButton.addEventListener("click", () => {
  toggleModal();
});

deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", () => {
  index = findAndReturnEntryIndex(ONDISPLAY);
  deleteLog(LOGLIST[index].id);
});

editButton = document.querySelector("#edit-button");
editButton.addEventListener("click", () => {
  var index = findAndReturnEntryIndex(ONDISPLAY);
  startEdit(index);
});

function toggleModal() {
  var entryType = document.querySelector("#entry-type");
  var entryButton = document.querySelector("#entry-button");
  var updateButton = document.querySelector("#update-button");
  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
  } else {
    modal.classList.add("hidden");
  }
  // Show entry button, remove update button
  entryType.innerHTML = "New Entry";
  if (entryButton.classList.contains("hidden")) {
    entryButton.classList.remove("hidden");
  }
  if (!updateButton.classList.contains("hidden")) {
    updateButton.classList.add("hidden");
  }
  let inputs = document.querySelectorAll(".input-area"); // Select all textareas
  inputs.forEach((input) => {
    input.value = "";
  });
}

const entryButton = document.querySelector("#entry-button");
entryButton.addEventListener("click", () => {
  addNewLog();
  toggleModal();
});

const updateButton = document.querySelector("#update-button");
updateButton.addEventListener("click", () => {
  updateLog();
  toggleModal();
});

function findAndReturnEntryIndex(paramID) {
  for (let i = 0; i < LOGLIST.length; i++) {
    if (LOGLIST[i].id == paramID) {
      return i;
    }
  }
}

getLogs();
