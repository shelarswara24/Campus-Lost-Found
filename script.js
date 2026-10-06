// Show a particular section
function showSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth"
    });
}


// Search for an item
function searchItems() {

    let searchText = document.getElementById("searchInput").value.toLowerCase();

    let cards = document.getElementsByClassName("item-card");

    let foundItem = false;

    for (let i = 0; i < cards.length; i++) {

        let itemName = cards[i].getElementsByTagName("h3")[0]
            .innerText.toLowerCase();

        if (itemName.includes(searchText)) {
            cards[i].style.display = "block";
            foundItem = true;
        } else {
            cards[i].style.display = "none";
        }
    }

    if (searchText === "") {

        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = "block";
        }

    } else if (!foundItem) {
        alert("No matching item found.");
    }
}


// Mark a lost item as found
function markFound(button) {

    let card = button.parentElement;

    let status = card.getElementsByClassName("not-found")[0];

    if (status) {

        status.innerText = "✅ Found";
        status.className = "found";

        button.innerText = "Item Found";

        button.disabled = true;

        alert("Item status updated successfully!");
    }
}


// View item details
function viewDetails(itemName) {

    alert(
        "Item Details\n\n" +
        "Item: " + itemName +
        "\n\nPlease use the website report system for further communication."
    );
}


// Preview uploaded photo
function previewPhoto(event) {

    let file = event.target.files[0];

    let preview = document.getElementById("photoPreview");

    if (file) {

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please select an image smaller than 2 MB.");
            event.target.value = "";
            return;
        }

        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
}


// Add a new report
function addItem(event) {

    event.preventDefault();

    let reportType = document.getElementById("reportType").value;
    let itemName = document.getElementById("itemName").value;
    let category = document.getElementById("category").value;
    let location = document.getElementById("location").value;
    let itemDate = document.getElementById("itemDate").value;
    let description = document.getElementById("description").value;

    if (
        reportType === "" ||
        itemName === "" ||
        category === "" ||
        location === "" ||
        itemDate === "" ||
        description === ""
    ) {
        alert("Please fill all the required fields.");
        return;
    }

    let reportBox = document.getElementById("myReports");

    let newReport = document.createElement("div");

    newReport.className = "item-card";

    newReport.innerHTML = `
        <h3>${itemName}</h3>
        <p>Report Type: ${reportType}</p>
        <p>Category: ${category}</p>
        <p>Location: ${location}</p>
        <p>Date: ${itemDate}</p>
        <p>Description: ${description}</p>
        <p>
            Status:
            <span class="not-found">❌ Not Found</span>
        </p>
    `;

    reportBox.appendChild(newReport);

    alert("Report submitted successfully!");

    document.getElementById("reportForm").reset();

    document.getElementById("photoPreview").style.display = "none";
}