import { ERROR_MESSAGES, FILTERVALUES } from "./constants.js"

let projects = [];

const validateProject = function (project) {
  let error = [];
  if (!project.name) {
    error.push(ERROR_MESSAGES.PROJECT_NAME_NOT_PROVIDED);
  } else if (!project.technologyUsed) {
    error.push(ERROR_MESSAGES.TECHNOLOGY_USED_NOT_PROVIDED);
  } else if (!project.startingDate) {
    error.push(ERROR_MESSAGES.STARTING_DATE_NULL);
  } else if (!project.completionDate) {
    error.push(ERROR_MESSAGES.COMPLETION_DATE_NULL);
  } else {
    return { valid: true, error };
  }
  return { valid: false, error };

};

const clearInputs = function () {
  document.querySelector("#projectname").value = "";
  document.querySelector("#technology").value = "";
  document.querySelector("#starting-date").value = "";
  document.querySelector("#completion-date").value = "";
};

const addProject = function (project) {
  project.status = "pending"
  projects.push(project);
};

const createTag = function (tagName, insidevalue, tagClass, outertag) {
  let temptag = document.createElement(tagName);
  temptag.innerHTML = insidevalue;
  temptag.className = tagClass;
  outertag.classList.add("uncompleted");
  outertag.appendChild(temptag);
  insidevalue = "";
};

const completeButton = (tagName, tagClass, buttonName, outertag, project) => {
  let buttons = document.createElement(tagName);
  buttons.className = tagClass;
  buttons.innerHTML = buttonName;
  outertag.appendChild(buttons);
  buttons.addEventListener("click", function () {
    project.status = "completed";
    console.log(projects);
    outertag.removeChild(buttons);
  });
};

const exitButton = function (tagName, tagClass, buttonName, outertag, project, parentdiv, childdiv) {
  let button = document.createElement(tagName);
  button.className = tagClass;
  button.innerHTML = buttonName;
  outertag.appendChild(button);
  button.addEventListener("click", function () {
    projects.splice(projects.indexOf(project), 1);
    parentdiv.removeChild(childdiv);
  });
};

const projectDiv = function (project, parentDiv) {
  let divtag = document.createElement("div");
  divtag.className = "heading1";
  parentDiv.appendChild(divtag);
  createTag("div", project.name, "box11", divtag);
  createTag("div", project.technologyUsed, "box21", divtag);
  createTag("div", project.startingDate, "box31", divtag);
  createTag("div", project.completionDate, "box41", divtag);
  let exitdiv = document.createElement("div");
  exitdiv.class = "box51";
  divtag.appendChild(exitdiv);
  if (project.status === "pending") {
    completeButton("BUTTON", "complete", "completed", exitdiv, project, parentDiv, divtag);
  }
  exitButton("BUTTON", "exitt", "Remove", exitdiv, project, parentDiv, divtag);
}

const displayProjects = function (filter) {
  let filteredArray;
  if (filter === FILTERVALUES.ALL) {
    filteredArray = projects;
  } else {
    filteredArray = filterOptions(filter);
  }
  let mainDiv = document.querySelector(".container");
  mainDiv.innerHTML = "";
  for (let project of filteredArray) {
    projectDiv(project, mainDiv);
  }
};

const filterOptions = function (filter) {
  return projects.filter(e => e.status === filter)
};

const filterProjects = function () {
  let filteroption = document.querySelector(".filter-todo1");
  filteroption.addEventListener("click", function (e) {
    displayProjects(e.target.value);
  });
};

const displaydiv = function (input1, input2, input3, input4, input5, height1, height2) {
  document.querySelector(input1).style.background = "green";
  document.querySelector(input2).style.height = height1
  document.querySelector(input3).style.background = "white";
  document.querySelector(input4).style.height = height2
  document.querySelector(input5).style.background = "white";
}

export { projects, validateProject, addProject, clearInputs, filterOptions, displayProjects, filterProjects, completeButton, exitButton, createTag, displaydiv };
