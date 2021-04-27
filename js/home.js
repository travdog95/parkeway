import Projects from "../data/projects.js";
import { initDefaults } from "./htmlDefaults.js";

//Load page defaults
initDefaults();

//Add home html
const response = await fetch(`../html/home.html`);
const homeHtml = await response.text();

document.getElementById("app").innerHTML = homeHtml;


const buildProjectCards = () => {
  const projectCardsContainer = document.querySelector('.project-cards-container');

  Projects.map(project => {
    //Create Card
    const projectCardDiv = document.createElement("div");
    projectCardDiv.className = "project-card";

    //Create title
    const titleDiv = document.createElement("div");
    titleDiv.className = "project-title";
    titleDiv.innerHTML = project.title;

    projectCardDiv.append(titleDiv);

    //Create description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "project-description";
    descriptionDiv.innerHTML = project.description;

    projectCardDiv.append(descriptionDiv);

    //Create highlights
    const highlightsUl = document.createElement("ul");
    highlightsUl.className = "project-highlights";

    project.highlights.forEach(highlight => {
      const highlightLi = document.createElement("li");
      highlightLi.className = "project-highlight";
      highlightLi.innerHTML = highlight;
      highlightsUl.appendChild(highlightLi);
    });

    projectCardDiv.append(highlightsUl);

    //Create button
    const projectButton = document.createElement("button");
    projectButton.className = "button";
    projectButton.innerHTML = "Request more info";
    projectButton.addEventListener("click", (e) => {
      console.log("Clicked", project);
    });

    projectCardDiv.append(projectButton);

    projectCardsContainer.append(projectCardDiv);

  });
}

buildProjectCards();