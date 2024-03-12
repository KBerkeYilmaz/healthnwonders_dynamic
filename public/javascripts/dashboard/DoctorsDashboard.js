document.addEventListener("DOMContentLoaded", () => {
  const addExperienceBtn = document.getElementById("addExperienceBtn");
  const addEducationBtn = document.getElementById("addEducationBtn");
  const addInterestBtn = document.getElementById("addInterestBtn");
  const toggleFormButton = document.getElementById("toggleFormButton");
  const toggleBackButton = document.getElementById("toggleBackButton");
  const newDoctorForm = document.getElementById("newDoctorForm");
  const doctorsTable = document.querySelector("#doctorsTable");

  let experienceItemIndex = 1; // To keep track of the experience items
  let interestsItemIndex = 1; // To keep track of the interest items
  let educationItemIndex = 1; // To keep track of the education items

  // Attach click event to delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      currentDoctorId = this.getAttribute("data-doctorid"); // Get the doctor's ID
      $("#deleteConfirmationModal").modal("show"); // Show the confirmation modal
    });
  });

  // Attach click event to the confirmation button in the modal
  document
    .getElementById("confirmDelete")
    .addEventListener("click", function () {
      if (currentDoctorId) {
        fetch(`/api/doctors/${currentDoctorId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message); // Log the success message
            window.location.reload(); // Reload the page to reflect the changes
          })
          .catch((error) => console.error("Error:", error));
      }
    });

  addExperienceBtn.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add("d-flex", "flex-column");
    newPane.innerHTML = `
    <div class="form-row mb-2 d-inline-flex align-items-center"> 
      <div class="form-group col-md-1">
        <label>Başlangıç Yılı:</label>
        <input class="form-control " style='border-radius:5px;!important' type="number" name="experiences[${experienceItemIndex}][startDate]" required>
      </div>
      <div class="form-group col-md-1">
        <label>Bitiş Yılı:</label>
        <input class="form-control " style='border-radius:5px;!important' type="number" name="experiences[${experienceItemIndex}][endDate]">
      </div>
    </div>
    <div class="form-row mb-2 d-inline-flex align-items-center"> 
      <div class="form-group col-md-3">
        <label>Deneyim Başlığı (TR):</label>
        <input class="form-control" type="text" name="experiences[${experienceItemIndex}][title][tr]" required style='border-radius:5px;!important'>
      </div>
      <div class="form-group col-md-3">
        <label>Deneyim Başlığı (EN):</label>
        <input class="form-control" type="text" name="experiences[${experienceItemIndex}][title][en]" required style='border-radius:5px;!important'>
      </div>
      <div class="form-group col-md-3">
        <label>Deneyim Başlığı (FR):</label>
        <input class="form-control" type="text" name="experiences[${experienceItemIndex}][title][fr]" required style='border-radius:5px;!important'>
      </div>
      <div class="form-group col-md-3">
        <label>Deneyim Başlığı (DE):</label>
        <input class="form-control" type="text" name="experiences[${experienceItemIndex}][title][de]" required style='border-radius:5px;!important'>
      </div>
  </div>



`;
    experienceItemIndex++;
    const experienceContainer = document.querySelector(".experience-column");
    experienceContainer.appendChild(newPane);
  });

  addEducationBtn.addEventListener("click", () => {
    const newEducationInput = document.createElement("div");
    newEducationInput.classList.add(
      "form-row",
      "mb-2",
      "d-inline-flex",
      "align-items-center"
    );

    newEducationInput.innerHTML = `
        <div class="form-group col-md-3">
            <label for="educationTitle">Eğitim Başlığı (TR):</label>
            <input class="form-control" style='border-radius:5px;!important' type="text" name="education[${educationItemIndex}][title][tr]" required>
        </div>
        <div class="form-group col-md-3">
          <label for="educationTitle">Eğitim Başlığı (EN):</label>
          <input class="form-control" style='border-radius:5px;!important' type="text" name="education[${educationItemIndex}][title][en]" required>
        </div>
        <div class="form-group col-md-3">
          <label for="educationTitle">Eğitim Başlığı (FR):</label>
          <input class="form-control" style='border-radius:5px;!important' type="text" name="education[${educationItemIndex}][title][fr]" required>
        </div>
        <div class="form-group col-md-3">
          <label for="educationTitle">Eğitim Başlığı (DE):</label>
          <input class="form-control" style='border-radius:5px;!important' type="text" name="education[${educationItemIndex}][title][de]" required>
        </div>
    `;

    const educationContainer = document.querySelector(".education-column");
    educationContainer.appendChild(newEducationInput);
    educationItemIndex++;
  });

  addInterestBtn.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add(
      "form-row",
      "mb-2",
      "d-inline-flex",
      "align-items-center"
    );
    newPane.innerHTML = `
      <div class="form-group col-md-3">
        <label for="interestsTitle">Uzmanlık Başlığı (TR):</label>
        <input class="form-control" style='border-radius:5px;!important' type="text" name="interests[${interestsItemIndex}][title][tr]" required>
      </div>
      <div class="form-group col-md-3">
        <label for="interestsTitle">Uzmanlık Başlığı (EN):</label>
        <input class="form-control" style='border-radius:5px;!important' type="text" name="interests[${interestsItemIndex}][title][en]" required>
      </div>
      <div class="form-group col-md-3">
        <label for="interestsTitle">Uzmanlık Başlığı (FR):</label>
        <input class="form-control" style='border-radius:5px;!important' type="text" name="interests[${interestsItemIndex}][title][fr]" required>
      </div>
      <div class="form-group col-md-3">
        <label for="interestsTitle">Uzmanlık Başlığı (DE):</label>
        <input class="form-control" style='border-radius:5px;!important' type="text" name="interests[${interestsItemIndex}][title][de]" required>
      </div>
    `;
    interestsItemIndex++;
    const interestContainer = document.querySelector(".interest-column");

    // Insert the new pane before the addExperienceBtn
    interestContainer.appendChild(newPane);
  });

  toggleFormButton.addEventListener("click", () => {
    // Hide the doctors table and show the new doctor form
    $(doctorsTable).fadeOut("fast", () => {
      $(newDoctorForm).fadeIn("fast");
      toggleBackButton.style.display = "block"; // Show the Geri button
      toggleFormButton.style.display = "none"; // Hide the Yeni Doktor Ekle button
    });
  });

  toggleBackButton.addEventListener("click", () => {
    // Hide the new doctor form and show the doctors table
    $(newDoctorForm).fadeOut("fast", () => {
      $(doctorsTable).fadeIn("fast");
      toggleBackButton.style.display = "none"; // Hide the Geri button
      toggleFormButton.style.display = "block"; // Show the Yeni Doktor Ekle button
    });
  });
});
