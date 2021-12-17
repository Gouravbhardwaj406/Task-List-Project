import { projects, validateProject, clearInputs, addProject, createTag, actionList, projectDiv, displayProjects, alertBox } from "./utils.js";
import { MESSAGES, TYPE, STATUS, ACTIONS } from "./constants.js"

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
    displayProjects();
  }
  else {
    alertBox(message, TYPE.ERROR);
  }
})











