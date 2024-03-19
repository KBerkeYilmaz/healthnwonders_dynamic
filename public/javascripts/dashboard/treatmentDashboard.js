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

  // let activeForm = dataTR; // Assume TR is the default active form
  // activeForm.style.display = "block"; // Show default active form

  // // Function to switch forms based on selected language
  // function switchLanguage(newActiveForm) {
  //   $(activeForm).fadeOut("fast", () => {
  //     $(newActiveForm).fadeIn("fast");
  //     activeForm = newActiveForm; // Update the active form
  //   });
  // }


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

  // $("#submitForm").on("click", function (event) {
  //   event.preventDefault(); // Prevent default form submission

  //   // Initialize an empty object to store form data
  //   let formData = {
  //     name: {
  //       tr: "",
  //       en: "",
  //       fr: "",
  //       de: "",
  //     },
  //     subTitle: {
  //       tr: "",
  //       en: "",
  //       fr: "",
  //       de: "",
  //     },
  //     abstract: {
  //       tr: "",
  //       en: "",
  //       fr: "",
  //       de: "",
  //     },
  //     description: [
  //       {
  //         tr: "",
  //         en: "",
  //         fr: "",
  //         de: "",
  //       },
  //     ],
  //     youtubeLink: $("#youtubeLink").val(), // Assuming youtubeLink has the same ID across all languages
  //   };

  //   // Assuming you have an array or object to iterate over languages
  //   let languages = ["tr", "en", "fr", "de"];

  //   languages.forEach((lang) => {
  //     // Collect values for each language
  //     formData.name[lang] = $(`input[name='name[${lang}]']`).val();
  //     formData.subTitle[lang] = $(`textarea[name='subTitle[${lang}]']`).val();
  //     formData.abstract[lang] = $(`textarea[name='abstract[${lang}]']`).val();

  //     // Handle descriptions (assuming you have multiple descriptions per language)
  //     $(`.description-${lang}`).each(function (index) {
  //       if (!formData.description[index]) {
  //         formData.description.push({ tr: "", en: "", fr: "", de: "" }); // Initialize if doesn't exist
  //       }
  //       formData.description[index][lang] = $(this).val(); // Assuming class names like description-tr, description-en, etc.
  //     });
  //   });




  // Optional: Handle form submission
  // $('#submitForm').click(function(e) {
  //   e.preventDefault();
  //   // Gather form data and submit it
  //   console.log('Form submitted');
  //   // Implement form submission logic here
  // });



  // AJAX request
  // $.ajax({
  //   url: "/api/treatments", // Your endpoint
  //   type: "POST",
  //   contentType: "application/json", // Make sure your server expects JSON body
  //   data: JSON.stringify(formData), // Convert formData object to JSON string
  //   success: function (response) {
  //     // Handle success
  //     console.log("Form submitted successfully", response);
  //     // Redirect or update UI as needed
  //   },
  //   error: function (xhr, status, error) {
  //     // Handle error
  //     console.error("Form submission failed", xhr, status, error);
  //     // Show error to user or log
  //   },
  // });
});
