// script.js - Last updated: 2025-04-07
// Feature: Add date idea with optional image preview (text left, image right)

const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const imageInput = document.getElementById("imageInput");
const fileLabel = document.querySelector(".file-label");

function addTask() {
    const text = inputBox.value.trim();
    const image = imageInput.files[0];

    // Prevent empty submission
    if (text === "" && !image) {
        alert("You must enter a date idea or select a photo!");
        return;
    }

    const li = document.createElement("li");

    // [Update 2025-04-07] Create a flex container to hold text (left) and image (right)
    const contentWrapper = document.createElement("div");
    contentWrapper.style.display = "flex";
    contentWrapper.style.flexDirection = "row"; // 👈 enforce horizontal row
    contentWrapper.style.alignItems = "center";
    contentWrapper.style.justifyContent = "space-between";
    contentWrapper.style.gap = "4px";
    contentWrapper.style.width = "100%";
    contentWrapper.style.background = "#ffeff5";
    contentWrapper.style.padding = "12px 16px";
    contentWrapper.style.borderRadius = "12px";
    contentWrapper.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";

    // Create and append the text (always on the left)
    const textContainer = document.createElement("div");
    textContainer.textContent = text || "No text";
    textContainer.style.flex = "1";
    textContainer.style.fontSize = "12px";
    textContainer.style.color = "#333";
    textContainer.style.wordBreak = "break-word";

    contentWrapper.appendChild(textContainer); // Append text FIRST

    // If an image is selected, create and append it (always on the right)
    if (image) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "110px";
            img.style.height = "110px";
            img.style.borderRadius = "10px";
            img.style.objectFit = "cover";
            img.style.flexShrink = "0";

            contentWrapper.appendChild(img); // Image goes to the right
            finalizeTask(); // Continue after image is loaded
        };
        reader.readAsDataURL(image);
    } else {
        finalizeTask();
    }

    // Finalize and insert the complete task item
    function finalizeTask() {
        li.appendChild(contentWrapper);

        const deleteBtn = document.createElement("span"); // Add delete (×) button
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.style.marginLeft = "12px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.fontSize = "12px";
        li.appendChild(deleteBtn);

        listContainer.appendChild(li); // Insert list item

        inputBox.value = ""; // Reset inputs
        imageInput.value = "";
        fileLabel.textContent = "Choose Photo📸";

        saveData();
    }
}


// Toggle checked state or delete task
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

// [Update 2025-04-07] Change file label when user selects an image
imageInput.addEventListener("change", function () {
    if (imageInput.files.length > 0) {
        fileLabel.textContent = imageInput.files[0].name + " 😝";
    } else {
        fileLabel.textContent = "Choose Photo📸";
    }
});

// Save current list to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load saved tasks from local storage on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
