document.addEventListener("DOMContentLoaded", () => {
  const toggleFormButton = document.getElementById("toggleFormButton");
  const newTreatmentForm = document.getElementById("newTreatmentForm");
  const treatmentsTable = document.getElementById("treatmentsTable");
  const paragraphColumnTR = document.getElementById("paragraph-column-tr");
  const paragraphColumnEN = document.getElementById("paragraph-column-en");
  const paragraphColumnDE = document.getElementById("paragraph-column-de");
  const paragraphColumnFR = document.getElementById("paragraph-column-fr");
  const toggleBackButton = document.getElementById("toggleBackButton");
  const changeLanguageTitle = document.getElementById("change-language-title");


  const addParagraphBtnTR = document.getElementById("addParagraphBtn_tr");
  const removeParagraphBtnTR = document.getElementById("removeParagraphBtn_tr");

  const addParagraphBtnEN = document.getElementById("addParagraphBtn_en");
  const removeParagraphBtnEN = document.getElementById("removeParagraphBtn_en");

  const addParagraphBtnDE = document.getElementById("addParagraphBtn_de");
  const removeParagraphBtnDE = document.getElementById("removeParagraphBtn_de");

  const addParagraphBtnFR = document.getElementById("addParagraphBtn_fr");
  const removeParagraphBtnFR = document.getElementById("removeParagraphBtn_fr");



  let descriptionItemIndexTR = 1; // To keep track of the description items
  let descriptionItemIndexEN = 1; // To keep track of the description items 
  let descriptionItemIndexDE = 1; // To keep track of the description items
  let descriptionItemIndexFR = 1; // To keep track of the description items


  addParagraphBtnTR.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add("form-row", "mb-20");
    newPane.innerHTML = `
        <div class="form-group col-md-12 mb-2"> 
          <label for="description"> Paragraf Detay (TR)</label>
          <textarea class="form-control" name="description[${descriptionItemIndexTR}][tr]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
      `;
    // Insert the new pane before the addParagraphBtn
    paragraphColumnTR.appendChild(newPane);
    descriptionItemIndexTR++;

  });

  removeParagraphBtnTR.addEventListener("click", () => {
    if (descriptionItemIndexTR > 1) {
      descriptionItemIndexTR--;
      paragraphColumnTR.removeChild(paragraphColumnTR.lastChild);
    }
  });

  addParagraphBtnEN.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add("form-row", "mb-20");
    newPane.innerHTML = `
        <div class="form-group col-md-12 mb-2"> 
          <label for="description"> Paragraf Detay (EN)</label>
          <textarea class="form-control" name="description[${descriptionItemIndexEN}][en]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
      `;
      descriptionItemIndexEN++;
    // Insert the new pane before the addParagraphBtn
    paragraphColumnEN.appendChild(newPane);
  });

  removeParagraphBtnEN.addEventListener("click", () => {
    if (descriptionItemIndexEN > 1) {
      descriptionItemIndexEN--;
      paragraphColumnEN.removeChild(paragraphColumnEN.lastChild);
    }
  });

  addParagraphBtnDE.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add("form-row", "mb-20");
    newPane.innerHTML = `
        <div class="form-group col-md-12 mb-2"> 
          <label for="description"> Paragraf Detay (DE)</label>
          <textarea class="form-control" name="description[${descriptionItemIndexDE}][de]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
      `;
      descriptionItemIndexDE++;
    // Insert the new pane before the addParagraphBtn
    paragraphColumnDE.appendChild(newPane);
  });

  removeParagraphBtnDE.addEventListener("click", () => {
    if (descriptionItemIndexDE > 1) {
      descriptionItemIndexDE--;
      paragraphColumnDE.removeChild(paragraphColumnDE.lastChild);
    }
  });

  addParagraphBtnFR.addEventListener("click", () => {
    const newPane = document.createElement("div");
    newPane.classList.add("form-row", "mb-20");
    newPane.innerHTML = `
        <div class="form-group col-md-12 mb-2"> 
          <label for="description"> Paragraf Detay (FR)</label>
          <textarea class="form-control" name="description[${descriptionItemIndexFR}][fr]" required style='border-radius:5px;!important padding: 1px 1px;!important'></textarea>
        </div>
      `;
      descriptionItemIndexFR++;
    // Insert the new pane before the addParagraphBtn
    paragraphColumnFR.appendChild(newPane);
  });

  removeParagraphBtnFR.addEventListener("click", () => {
    if (descriptionItemIndexFR > 1) {
      descriptionItemIndexFR--;
      paragraphColumnFR.removeChild(paragraphColumnFR.lastChild);
    }
  });


  toggleFormButton.addEventListener("click", () => {
    // Hide the treatments table and show the new treatment form
    $(treatmentsTable).fadeOut("fast", () => {
      $(newTreatmentForm).fadeIn("fast");
      toggleBackButton.style.display = "block"; // Gösterir Geri button
    });
  });

  toggleBackButton.addEventListener("click", () => {
    // Hide the new treatment form and show the treatments table
    $(newTreatmentForm).fadeOut("fast", () => {
      $(treatmentsTable).fadeIn("fast");
      toggleBackButton.style.display = "none"; // Gizler Geri button
    });
  });


  const dataDE = document.querySelector("form-de");
  const dataEN = document.querySelector("form-en");
  const dataFR = document.querySelector("form-fr");
  const dataTR = document.querySelector("form-tr");


  function hideAllSections() {
    $('.form-section').hide();

        // Disable all buttons
        $('.language-btn').prop('disabled', true);

        // Enable all buttons after 500 milliseconds (half a second)
        setTimeout(function() {
            $('.language-btn').prop('disabled', false);
        }, 100);
    
  }

  document.querySelector("#displayDEButton").addEventListener("click", () => {
    hideAllSections();
    $("#form-de").fadeIn("fast");
  });

  document.querySelector("#displayENButton").addEventListener("click", () => {
    hideAllSections();
    $("#form-en").fadeIn("fast");
  });

  document.querySelector("#displayFRButton").addEventListener("click", () => {
    hideAllSections();
    $("#form-fr").fadeIn("fast");
  });

  document.querySelector("#displayTRButton").addEventListener("click", () => {
    hideAllSections();
    $("#form-tr").fadeIn("fast");
  });

});
