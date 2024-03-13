document.addEventListener("DOMContentLoaded", () => {
  const addParagraphBtn = document.getElementById("addParagraphBtn");
  const toggleFormButton = document.getElementById("toggleFormButton");
  const newTreatmentForm = document.getElementById("newTreatmentForm");
  const treatmentsTable = document.getElementById("treatmentsTable");
  const removeParagraphBtn = document.getElementById("removeParagraphBtn");
  const paragraphColumn = document.getElementById("paragraph-column");

  let descriptionItemIndex = 1; // To keep track of the description items

  addParagraphBtn.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add("form-row", "mb-20");
    newPane.innerHTML = `
        <div class="form-group col-md-3 mb-2"> 
          <label for="description"> Paragraf Detay (TR)</label>
          <textarea class="form-control" name="description[${descriptionItemIndex}][tr]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
        <div class="form-group col-md-3 mb-2"> 
          <label for="description"> Paragraf Detay (EN)</label>
          <textarea class="form-control" name="description[${descriptionItemIndex}][en]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
        <div class="form-group col-md-3 mb-2"> 
          <label for="description"> Paragraf Detay (FR)</label>
          <textarea class="form-control" name="description[${descriptionItemIndex}][fr]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
        <div class="form-group col-md-3 mb-2"> 
          <label for="description"> Paragraf Detay (DE)</label>
          <textarea class="form-control" name="description[${descriptionItemIndex}][de]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
      `;
    descriptionItemIndex++;
    // Insert the new pane before the addParagraphBtn
    paragraphColumn.appendChild(newPane);
  });

  toggleFormButton.addEventListener("click", () => {
    // Hide the treatments table and show the new treatment form
    $(treatmentsTable).fadeOut("fast", () => {
      $(newTreatmentForm).fadeIn("fast");
      toggleBackButton.style.display = "block"; // Show the Geri button
      toggleFormButton.style.display = "none"; // Hide the Yeni Tedavi Ekle button
    });
  });

  toggleBackButton.addEventListener("click", () => {
    // Hide the new treatment form and show the treatments table
    $(newTreatmentForm).fadeOut("fast", () => {
      $(treatmentsTable).fadeIn("fast");
      toggleBackButton.style.display = "none"; // Hide the Geri button
      toggleFormButton.style.display = "block"; // Show the Yeni Tedavi Ekle button
    });
  });

  removeParagraphBtn.addEventListener("click", () => {
    if (descriptionItemIndex > 1) {
      descriptionItemIndex--;
      paragraphColumn.removeChild(paragraphColumn.lastChild);
    }
  });

});
