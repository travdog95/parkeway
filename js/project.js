import Projects from "../data/projects.js";
import { initDefaults } from "./htmlDefaults.js";
import { getProjectIdFromPath } from "./helperFunctions.js";

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
  document.querySelector('[data-project-title]').innerHTML = project.title;
  //Image
  // const projectImage = document.querySelector('[data-project-image]');
  // projectImage.src = project.imageUrl;
  // projectImage.alt = project.title;

  //Send data to Trello
  const form = document.getElementById("projectForm");
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    //Validate form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    //Check to see card already exists with submitted email address
    const key = "236235d44614784d8c83988e81fa726d";
    const token = "2216c21d5bbe2fa041363834dfba48f419d6dc82201088809bb00e8223cd8ddb";
    const idList = "60874560c7e21f746cce488d";
    const cardName = `${project.title} - ${email}`;
    const idLabels = "605cd17b333a3884e69cc36d";
    const desc = `Name: ${firstName} ${lastName}%0AEmail: ${email}`;
    const urlSource = document.location.href;

fetch(`https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${idList}&name=${cardName}&desc=${desc}&urlSource=${urlSource}`, {
  method: 'POST'
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => {
    console.error(err)
    });
  });
}