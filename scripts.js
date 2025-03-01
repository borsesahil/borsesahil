document.addEventListener("DOMContentLoaded", function () {
    const numPeopleInput = document.getElementById("numPeople");
    const numAnimalsInput = document.getElementById("numAnimals");
    const individualInfoContainer = document.getElementById("individualInfoContainer");
    const animalInfoContainer = document.getElementById("animalInfoContainer");
    const sections = document.querySelectorAll(".section");
    let currentSection = 0; // Track the current section

    // Function to show the specified section and hide others
    function showSection(sectionIndex) {
        sections.forEach((section, index) => {
            if (index === sectionIndex) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
        currentSection = sectionIndex;
    }

    // Event listeners for "Next" and "Previous" buttons
    const nextButtons = document.querySelectorAll(".section button[id^='nextSection']");
    const prevButtons = document.querySelectorAll(".section button[id^='prevSection']");

    nextButtons.forEach((nextButton, index) => {
        nextButton.addEventListener("click", function () {
            if (index === currentSection && validateCurrentSection()) {
                showSection(index + 1);
            }
        });
    });

    prevButtons.forEach((prevButton, index) => {
        prevButton.addEventListener("click", function () {
            if (index === currentSection) {
                showSection(index - 1);
            }
        });
    });

    // Function to validate the current section's inputs
    function validateCurrentSection() {
        const currentSectionDiv = sections[currentSection];
        const inputs = currentSectionDiv.querySelectorAll("input[type='text'], input[type='number'], select");
        for (const input of inputs) {
            if (input.hasAttribute("required") && !input.value.trim()) {
                alert("Please fill in all fields.");
                return false;
            }
        }
        return true;
    }

    // // Event listener for the "Submit" button (for demonstration purposes)
    // const submitButton = document.querySelector("button[type='submit']");
    // submitButton.addEventListener("click", function (event) {
    //     event.preventDefault(); // Prevent actual form submission (for demonstration)
    //     alert("Form submitted successfully!");
    // });

    // Function to generate individual information fields
    function generateIndividualFields() {
        const numPeople = parseInt(numPeopleInput.value);
        individualInfoContainer.innerHTML = ""; // Clear previous fields

        for (let i = 1; i <= numPeople; i++) {
            const individualDiv = document.createElement("div");
            individualDiv.classList.add("individual-info");

            individualDiv.innerHTML = `
                <h3>Person ${i} Information</h3>
                <label for="givenName${i}">Given Name:</label>
                <input type="text" id="givenName${i}" name="givenName${i}" required>

                <label for="familyName${i}">Family Name:</label>
                <input type="text" id="familyName${i}" name="familyName${i}" required>

                <label for="gender${i}">Gender:</label>
                <select id="gender${i}" name="gender${i}" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label for="dob${i}">Date of Birth:</label>
                <input type="date" id="dob${i}" name="dob${i}" required>

                <label for="countryOfBirth${i}">Country of Birth:</label>
                <input type="text" id="countryOfBirth${i}" name="countryOfBirth${i}" required>
            `;

            individualInfoContainer.appendChild(individualDiv);
        }

        // Show the Next button for the first individual
        document.querySelector('.section#section2 button').style.display = 'block';
    }

    // Event listener for "Next" button in Section 1
    document.getElementById("nextSection1").addEventListener("click", function () {
        const numPeople = parseInt(numPeopleInput.value);

        if (!isNaN(numPeople) && numPeople >= 1) {
            generateIndividualFields();
            showSection(1); // Show Section 2
        } else {
            alert("Please enter a valid number of people.");
        }
    });

    // Function to generate animal information fields
    function generateAnimalFields() {
        const numAnimals = parseInt(numAnimalsInput.value);
        animalInfoContainer.innerHTML = ""; // Clear previous fields

        for (let i = 1; i <= numAnimals; i++) {
            const animalDiv = document.createElement("div");
            animalDiv.classList.add("animal-info");

            animalDiv.innerHTML = `
                <h3>Animal ${i} Information</h3>
                <label for="animalType${i}">Type of Animal:</label>
                <input type="text" id="animalType${i}" name="animalType${i}" required>

                <label for="numOfAnimals${i}">Number of Animals:</label>
                <input type="number" id="numOfAnimals${i}" name="numOfAnimals${i}" min="1" required>
            `;

            animalInfoContainer.appendChild(animalDiv);
        }

        // Show the Next button for Section 3
        document.querySelector('.section#section3 button').style.display = 'block';
    }

    // Event listener for "Next" button in Section 2
    document.getElementById("nextSection2").addEventListener("click", function () {
        const numAnimals = parseInt(numAnimalsInput.value);

        if (!isNaN(numAnimals) && numAnimals >= 1) {
            generateAnimalFields();
            showSection(2); // Show Section 3
        } else {
            alert("Please enter a valid number of animal types.");
        }
    });
});
