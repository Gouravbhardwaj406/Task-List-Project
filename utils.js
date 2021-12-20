import { MESSAGES, TYPE, STATUS, ACTIONS } from "./constants.js"

let projects = [];

const validateProject = function (project) {
  let message = [];
  if (!project.name) {
    message.push(MESSAGES.PROJECT_NAME_NOT_PROVIDED);
  } else if (!project.technologyUsed) {
    message.push(MESSAGES.TECHNOLOGY_USED_NOT_PROVIDED);
  } else {
    message.push(MESSAGES.PROJECT_ADDED);
    return { isValid: true, message };
  }
  return { isValid: false, message };

};
const clearInputs = function () {
  document.querySelector(".inputproject").value = "";
  document.querySelector(".inputtechnology").selectedIndex = 0;
};
const addProject = function (project) {
  projects.push({ ...project, status: STATUS.INPROGRESS });
};
const createTag = function (tagName, insidevalue, tagClass, outertag) {
  let temptag = document.createElement(tagName);
  temptag.innerHTML = insidevalue;
  temptag.className = tagClass;
  outertag.classList.add("uncompleted");
  outertag.appendChild(temptag);
  insidevalue = "";
};
const actionList = function (parentDiv, divtag, project) {
  let actions = Object.values(ACTIONS);
  let selectList = document.createElement("select");
  let pageIndex = parseInt(document.querySelector(".current").innerHTML);
  selectList.className = "complete3";
  divtag.appendChild(selectList);
  for (let action of actions) {
    let option = document.createElement("option");
    option.value = action;
    option.text = action;
    selectList.appendChild(option);
  }
  selectList.addEventListener("click", function () {
    let index = selectList.selectedIndex;
    if (selectList.options[index].value === ACTIONS.CHOOSE) {
      console.log("choose");
    }
    else if (selectList.options[index].value === ACTIONS.EDIT) {
      document.querySelector(".inputproject").value = project.name;
      projects.splice(projects.indexOf(project), 1);
      parentDiv.removeChild(divtag);
      displayProjects(pageIndex);
    }
    else if (selectList.options[index].value === ACTIONS.COMPLETED) {
      project.status = STATUS.COMPLETED;
      alertBox(MESSAGES.COMPLETED, TYPE.COMPLETE);
      displayProjects(pageIndex);
    }
    else {
      projects.splice(projects.indexOf(project), 1);
      alertBox(MESSAGES.REMOVED,TYPE.DONE)
      displayProjects(pageIndex);
    }
  })
}
const projectDiv = function (project, parentDiv, index) {
  let divtag = document.createElement("div");
  divtag.className = "heading1";
  if (index % 2 === 0) {
    divtag.classList.add("colored")
  }
  parentDiv.appendChild(divtag);
  createTag("div", project.name, "box11", divtag);
  createTag("div", project.technologyUsed, "box21", divtag);
  createTag("div", project.status, "box31", divtag);
  if (project.status === STATUS.INPROGRESS) {
    actionList(parentDiv, divtag, project, index);
  }
}
const displayProjects = function (page) {
  let inProgress = filterOptions(STATUS.INPROGRESS);
  let done = filterOptions(STATUS.COMPLETED);
  let completeArray = inProgress.concat(done);
  let pageIndex = page - 1;
  let pageprojects = completeArray.slice((5 * pageIndex), (5 * pageIndex + 5));
  let mainDiv = document.querySelector(".task-list");
  mainDiv.innerHTML = "";
  for (let project of pageprojects) {
    let index = pageprojects.indexOf(project);
    projectDiv(project, mainDiv, index);
  }
};
const filterOptions = function (filter) {
  return projects.filter(e => e.status === filter)
};
const alertBox = async function (message, messageType) {
  let parentdiv = document.querySelector(".alert-box");
  let childdiv = document.createElement("div");
  childdiv.innerHTML = message;
  childdiv.className = messageType;
  parentdiv.appendChild(childdiv);
  setTimeout(function () {
    parentdiv.removeChild(childdiv)
  }, 2000);
}
export {
  projects, validateProject, clearInputs, addProject, createTag, actionList, projectDiv, displayProjects, alertBox
}
