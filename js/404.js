import { initDefaults } from "./htmlDefaults.js";

//Load page defaults
initDefaults();

//Add home html
const response = await fetch(`/html/404.html`);
const fourOfourHtml = await response.text();

document.getElementById("app").innerHTML = fourOfourHtml;
