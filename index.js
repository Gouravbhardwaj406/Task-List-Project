import { projects, validateProject, clearInputs, addProject, createTag, actionList, projectDiv, displayProjects, alertBox } from "./utils.js";
import { MESSAGES, TYPE, STATUS, ACTIONS } from "./constants.js"
let currentPage = parseInt(document.querySelector(".current").innerHTML);

let addButton = document.querySelector(".addButton");
addButton.addEventListener("click", function () {
  let ProjectName = document.querySelector(".inputproject");
  let TechnologyUsed = document.querySelector(".inputtechnology");
  let index = TechnologyUsed.selectedIndex;
  let project = {
    name: ProjectName.value,
    technologyUsed: TechnologyUsed.options[index].value
  }
  let { isValid, message } = validateProject(project);
  if (isValid) {
    addProject(project);
    clearInputs();
    alertBox(message, TYPE.COMPLETE);
    displayProjects(currentPage);
  }
  else {
    alertBox(message, TYPE.ERROR);
  }
})



let previousPage = document.querySelector(".previous");
let nextPage = document.querySelector(".next");
previousPage.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    document.querySelector(".current").innerHTML = currentPage;
    displayProjects(currentPage);
  }
})

nextPage.addEventListener("click", function () {
  if (currentPage < (projects.length / 5)) {
    currentPage++;
    document.querySelector(".current").innerHTML = currentPage;
    displayProjects(currentPage);
  }
})










