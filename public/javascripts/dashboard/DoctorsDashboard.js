document.addEventListener("DOMContentLoaded", () => {
  const addExperienceBtn = document.getElementById("addExperienceBtn");
  const addEducationBtn = document.getElementById("addEducationBtn");
  const addInterestBtn = document.getElementById("addInterestBtn");
  const toggleFormButton = document.getElementById("toggleFormButton");
  const newDoctorForm = document.getElementById("newDoctorForm");

  let experienceItemIndex = 1; // To keep track of the experience items
  let interestsItemIndex = 1; // To keep track of the interest items
  let educationItemIndex = 1; // To keep track of the education items

  addExperienceBtn.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add(
      "experience-pane",
      "d-flex",
      "flex-row",
      "align-items-baseline",
      "mb-2"
    );
    newPane.style.display = "none"; // Hide for fadeIn
    newPane.innerHTML = `
    <div class="form-group col-md-2">
      <label>Başlangıç Yılı:</label>
      <input class="form-control " style='border-radius:5px;!important' type="text" name="experiences[${experienceItemIndex}][startDate]" required>
    </div>
    <div class="form-group col-md-2">
      <label>Bitiş Yılı:</label>
      <input class="form-control " style='border-radius:5px;!important' type="text" name="experiences[${experienceItemIndex}][endDate]" required>
    </div>
    <div class="form-group col-md-7">
      <label>Deneyim Başlığı:</label>
      <input class="form-control" style='border-radius:5px;!important' type="text" name="experiences[${experienceItemIndex}][title]" required>
    </div>
`;
    experienceItemIndex++;
    // Insert the new pane before the addExperienceBtn
    $(newPane).insertBefore(addExperienceBtn).fadeIn("fast");
  });

  addEducationBtn.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add(
      "education-pane",
      "d-flex",
      "flex-column",
      "mb-2",
      "col-md-8"
    );
    newPane.style.display = "none"; // Hide for fadeIn
    newPane.innerHTML = `
      <div class="form-group col-md-8">
        <label for="educationTitle">Eğitim Başlığı:</label>
        <input class="form-control" type="text" name="education[${educationItemIndex}][title]" required>
      </div>
    `;
    educationItemIndex++;
    // Insert the new pane before the addExperienceBtn
    $(newPane).insertBefore(addEducationBtn).fadeIn("fast");
  });

  addInterestBtn.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add(
      "interest-pane",
      "d-flex",
      "flex-column",
      "mb-2",
      "col-md-8"
    );
    newPane.style.display = "none"; // Hide for fadeIn
    newPane.innerHTML = `
      <div class="form-group col-md-8">
        <label for="interestsTitle">Uzmanlık Başlığı:</label>
        <input class="form-control" type="text" name="interests[${interestsItemIndex}][title]" required>
      </div>
    `;
    interestsItemIndex++;
    // Insert the new pane before the addExperienceBtn
    $(newPane).insertBefore(addInterestBtn).fadeIn("fast");
  });

  toggleFormButton.addEventListener("click", () => {
    // Toggle visibility
    if (newDoctorForm.style.display === "none") {
      newDoctorForm.style.display = "block";
    } else {
      newDoctorForm.style.display = "none";
    }
  });

  // document.querySelectorAll(".delete-btn").forEach((button) => {
  //   button.addEventListener("click", function (e) {
  //     e.preventDefault();
  //     const doctorId = this.getAttribute("data-id");
  //     console.log("Deleting doctor with id:", doctorId);
  //     fetch(`/dashboard/doctors/delete/${doctorId}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Delete successful", data);
  //         // Optionally refresh the page or remove the deleted item from the DOM
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   });
  // });
});
