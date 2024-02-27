document.addEventListener("DOMContentLoaded", () => {
  const addParagraphBtn = document.getElementById("addParagraphBtn");
  let descriptionItemIndex = 1; // To keep track of the description items

  addParagraphBtn.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add("form-group", "mb-2", "col-md-12");
    newPane.style.display = "none"; // Hide for fadeIn
    newPane.innerHTML = `
        <label for="description${descriptionItemIndex}">İçerik Paragrafı ${descriptionItemIndex}:</label>
        <textarea class="form-control" name="description[${descriptionItemIndex}][title]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
      `;
    descriptionItemIndex++;
    // Insert the new pane before the addParagraphBtn
    $(newPane).insertBefore(addParagraphBtn).fadeIn("fast");
  });

  // Note: Assuming you have a toggle form button in your new blog form, otherwise, remove this part
  const toggleFormButton = document.getElementById("toggleFormButton");
  const newTreatmentForm = document.getElementById("newBlogForm");

  toggleFormButton.addEventListener("click", () => {
    // Toggle visibility of the treatment form
    if (newTreatmentForm.style.display === "none") {
      newTreatmentForm.style.display = "block";
    } else {
      newTreatmentForm.style.display = "none";
    }
  });

});
