import { projects, validateProject, addProject, clearInputs, filterOptions, displayProjects, filterProjects, completeButton, exitButton, createTag, displaydiv } from "./utils.js";
import { ERROR_MESSAGES, FILTERVALUES, MESSAGES } from "./constants.js"


let ProjectName = document.querySelector("#projectname");
let TechnologyUsed = document.querySelector("#technology");
let startDate, completeDate;
document
  .querySelector("#starting-date")
  .addEventListener("change", function () {
    startDate = this.value;
  });
document
  .querySelector("#completion-date")
  .addEventListener("change", function () {
    completeDate = this.value;
  });

let homeButton = document.querySelector(".home");
homeButton.addEventListener("click", function () {
  displaydiv(".homelogo", ".addprojectdisplay", ".addprojectlogo", ".project-list", ".myprojectslogo", "0px", "0px")

})

let addProjectdiv = document.querySelector(".addproject");
addProjectdiv.addEventListener("click", function () {
  displaydiv(".addprojectlogo", ".addprojectdisplay", ".homelogo", ".project-list", ".myprojectslogo", "500px", "0px");
})

let projectlist = document.querySelector(".myprojects");
projectlist.addEventListener("click", function () {
  displaydiv(".myprojectslogo", ".project-list", ".homelogo", ".addprojectdisplay", ".addprojectlogo", "500px", "0px");
  let filter = document.querySelector(".filter-todo1");
  let index = filter.selectedIndex;
  displayProjects(filter.options[index].value);
})

let addButton = document.querySelector(".ToDo");
addButton.addEventListener("click", function () {
  let project = {
    name: ProjectName.value,
    technologyUsed: TechnologyUsed.value,
    startingDate: startDate,
    completionDate: completeDate
  }
  let isValid = validateProject(project);
  if (isValid.valid) {
    addProject(project);
    clearInputs();
    alert(MESSAGES.SUCCESS);
  }
  else {
    alert(isValid.error);
  }
})
filterProjects();





