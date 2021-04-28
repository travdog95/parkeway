import Projects from "../data/projects.js";
import { initDefaults } from "./htmlDefaults.js";
import { getProjectIdFromPath, validateEmail, validatePhone } from "./helperFunctions.js";

//Get project data
const projectId = getProjectIdFromPath(window.location.pathname);
const project = Projects.find(project => project.id === projectId);

//Load page defaults
initDefaults();

let response;
let projectHtml = "";

if (project) {
  //Add project html
  response = await fetch(`/html/project.html`);
  projectHtml = await response.text();
} else {
  response = await fetch(`/html/404.html`);
  projectHtml = await response.text();
}

document.getElementById("app").innerHTML = projectHtml;

//Load project data into html
if (project) {
  //Title
  const projectTitleElements = document.querySelectorAll('[data-project-title]');
  
  projectTitleElements.forEach(element => {
    element.innerHTML = project.title;
  });

  //Image
  // const projectImage = document.querySelector('[data-project-image]');
  // projectImage.src = project.imageUrl;
  // projectImage.alt = project.title;

  //Get all required inputs
  const requiredInputs = document.querySelectorAll('input.required');

  const phoneMask = IMask(document.getElementById('phone'), {
    mask: '(000) 000-0000'
  });
  
  //Add blur event to check required inputes
  requiredInputs.forEach(requiredInput => {
    requiredInput.addEventListener('blur', (e) => {
      const errorMessage = document.getElementById(`${requiredInput.id}ErrorMessage`);
      if (requiredInput.value === "") {
        errorMessage.innerHTML = requiredInput.dataset.errorMessage;
      } else {
        errorMessage.innerHTML = "";
      }
    });
  });

  //validate email on blur
  document.getElementById('email').addEventListener('blur', function(e) {
    const emailErrorMessage = document.getElementById('emailErrorMessage');
    if (!validateEmail(this.value)) {
      emailErrorMessage.innerHTML = this.dataset.errorMessage;
    } else {
      emailErrorMessage.innerHTML = "";
    }
  });

  //validate phone on blur
  document.getElementById('phone').addEventListener('blur', function(e) {
    const phoneErrorMessage = document.getElementById('phoneErrorMessage');
    if (!validatePhone(this.value)) {
      phoneErrorMessage.innerHTML = this.dataset.errorMessage;
    } else {
      phoneErrorMessage.innerHTML = "";
    }
  });
   
  //Send data to Trello
  const form = document.getElementById("projectForm");
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    //Validate form
    if (!validateForm(requiredInputs)) return; 

    //Load variables for Trello API
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const key = "236235d44614784d8c83988e81fa726d";
    const token = "2216c21d5bbe2fa041363834dfba48f419d6dc82201088809bb00e8223cd8ddb";
    const idList = "60874560c7e21f746cce488d";
    const cardName = `${project.title} - ${email}`;
    const idLabels = "605cd17b333a3884e69cc36d";
    const desc = `Name: ${firstName} ${lastName}%0AEmail: ${email}%0APhone: ${phone}`;
    // const urlSource = document.location.href;

  fetch(`https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${idList}&name=${cardName}&desc=${desc}`, {
    method: 'POST'
  })
    .then(response => {
      const formContainer = document.querySelector('.form-container');
      const formMessage = document.querySelector('.form-submitted-message');

      if (response.status === 200) {
        formContainer.classList.add("hidden");
        formMessage.classList.remove("hidden");
      }
      return response.text();
    })
    .then(text => console.log("second then", text))
    .catch(err => {
      console.error(err)
    });
  });

  const validateForm = (requiredInputs) => {
    //Input element with required class
    let isFormValid = true;
    requiredInputs.forEach(requiredInput => {
      const errorMessageElement = document.getElementById(`${requiredInput.id}ErrorMessage`);
      const errorMessage = requiredInput.dataset.errorMessage;
      if (requiredInput.value === "") {
         isFormValid = false;
         errorMessageElement.innerHTML = errorMessage;
      }
    });

    //Email
    const emailElement = document.getElementById("email");
    if (!validateEmail(emailElement.value)) {
      isFormValid = false;
      document.getElementById('emailErrorMessage').innerHTML = emailElement.dataset.errorMessage;
    } 

    //Phone
    const phoneElement = document.getElementById("phone");
    if (!validatePhone(phoneElement.value)) {
      isFormValid = false;
      document.getElementById('phoneErrorMessage').innerHTML = phoneElement.dataset.errorMessage;
    }

    return isFormValid;
  }
}