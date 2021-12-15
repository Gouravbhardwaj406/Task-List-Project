(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
ERROR_MESSAGES={
    PROJECT_NAME_NOT_PROVIDED:'PLEASE PROVIDE PROJECT NAME',
    TECHNOLOGY_USED_NOT_PROVIDED:'PLEASE PROVIDE TECHNOLOGY USED',
    STARTING_DATE_NULL:'PLEASE PROVIDE STARTING DATE',
    COMPLETION_DATE_NULL:'PLEASE PROVIDE COMPLETION DATE'

}

FILTERVALUES={
    ALL:"all",
    COMPLETED:"completed",
    PENDING:"pending"
}

module.exports={ERROR_MESSAGES,FILTERVALUES};
},{}],2:[function(require,module,exports){
const{ALLPROJECTS,VALIDATEINPUTS,MODIFYPROJECTS,CLEARINPUTS,FILTEROPTIONS,DISPLAYPROJECTS,FILTERPROJECTS,CREATECOMPLETEBUTTON,CREATEEXITBUTTON,CREATETAG} = require("./utils");

let getAddToDoButton = document.querySelector("#addToDo");

let ProjectName = document.querySelector("#projectname");
let TechnologyUsed = document.querySelector("#technology");
let startDate, completionDate;

document
  .querySelector("#starting-date")
  .addEventListener("change", function () {
    startDate = this.value;
  });
document
  .querySelector("#completion-date")
  .addEventListener("change", function () {
    completionDate = this.value;
  });

getAddToDoButton.addEventListener("click", function () {
  let valid = VALIDATEINPUTS(
    ProjectName.value,
    TechnologyUsed.value,
    startDate,
    completionDate
  );
  if (valid) {
    MODIFYPROJECTS(
      ProjectName.value,
      TechnologyUsed.value,
      startDate,
      completionDate
    );
    console.log(ALLPROJECTS);
    let filter = document.querySelector(".filter-todo1");
    let index = filter.selectedIndex;
    console.log(filter.options[index].value);
    if (filter.options[index].value === "all") {
      DISPLAYPROJECTS(ALLPROJECTS);
    } else {
      DISPLAYPROJECTS(FILTEROPTIONS(filter.options[index].value));
    }
  }
});

FILTERPROJECTS();

},{"./utils":3}],3:[function(require,module,exports){
const {ERROR_MESSAGES,FILTERVALUES} = require("./constants");
let ALLPROJECTS = [];
VALIDATEINPUTS = function (name, technology, start, end) {
  if (!name) {
    alert(ERROR_MESSAGES.PROJECT_NAME_NOT_PROVIDED);
  } else if (!technology) {
    alert(ERROR_MESSAGES.TECHNOLOGY_USED_NOT_PROVIDED);
  } else if (!start) {
    alert(ERROR_MESSAGES.STARTING_DATE_NULL);
  } else if (!end) {
    alert(ERROR_MESSAGES.COMPLETION_DATE_NULL);
  } else {
    return true;
  }
};
CLEARINPUTS = function (inputname1,inputname2,inputname3,inputname4) {
  document.querySelector(inputname1).value = "";
  document.querySelector(inputname2).value = ""
  document.querySelector(inputname3).value = ""
  document.querySelector(inputname4).value = ""
};
MODIFYPROJECTS = function (projectName, technology, start, end) {
  let obj = {
    project: projectName,
    technologyUsed: technology,
    startDate: start,
    endDate: end,
    status: "pending",
  };
  ALLPROJECTS.push(obj);
};

CREATETAG = function (tagName, insidevalue, tagClass, outertag) {
  let temptag = document.createElement(tagName);

  temptag.innerHTML = insidevalue;
  temptag.className = tagClass;
  outertag.classList.add("uncompleted");
  outertag.appendChild(temptag);
  insidevalue = "";
};
CREATECOMPLETEBUTTON = (tagName, tagClass, buttonName, outertag, obj) => {
  let buttons = document.createElement(tagName);
  buttons.className = tagClass;
  buttons.innerHTML = buttonName;
  outertag.appendChild(buttons);
  buttons.addEventListener("click", function () {
    obj.status = "completed";
    console.log(ALLPROJECTS);
    outertag.removeChild(buttons);
  });
};

CREATEEXITBUTTON = function (
  tagName,
  tagClass,
  buttonName,
  outertag,
  obj,
  parentdiv,
  childdiv
) {
  let button = document.createElement(tagName);
  button.className = tagClass;
  button.innerHTML = buttonName;
  outertag.appendChild(button);
  button.addEventListener("click", function () {
    ALLPROJECTS.splice(ALLPROJECTS.indexOf(obj), 1);
    parentdiv.removeChild(childdiv);
  });
};

DISPLAYPROJECTS = function (arr) {
  let maindiv = document.querySelector("#container");
  maindiv.innerHTML = "";

  for (let obj of arr) {
    let divtag = document.createElement("div");
    divtag.className = "heading1";
    maindiv.appendChild(divtag);
    CREATETAG("div", obj.project, "box1", divtag);
    CREATETAG("div", obj.technologyUsed, "box2", divtag);
    CREATETAG("div", obj.startDate, "box3", divtag);
    CREATETAG("div", obj.endDate, "box4", divtag);
    let exitdiv = document.createElement("div");
    exitdiv.class = "box5";
    divtag.appendChild(exitdiv);

    if (obj.status === "pending") {
      CREATECOMPLETEBUTTON(
        "BUTTON",
        "complete",
        "completed",
        exitdiv,
        obj,
        maindiv,
        divtag
      );
    }
    CREATEEXITBUTTON(
      "BUTTON",
      "exitt",
      "Remove Project",
      exitdiv,
      obj,
      maindiv,
      divtag
    );
    CLEARINPUTS("#projectname","#technology","#starting-date","#completion-date");
   
  }
};

FILTEROPTIONS = function (filter) {
  return ALLPROJECTS.filter(e=>e.status===filter)

};

FILTERPROJECTS = function () {
  let filteroption = document.querySelector(".filter-todo1");
  filteroption.addEventListener("click", function (e) {
    if (e.target.value === FILTERVALUES.ALL) {
      DISPLAYPROJECTS(ALLPROJECTS);
    } else if (e.target.value === FILTERVALUES.COMPLETED) {
      DISPLAYPROJECTS(FILTEROPTIONS(FILTERVALUES.COMPLETED));
    } else {
      DISPLAYPROJECTS(FILTEROPTIONS(FILTERVALUES.PENDING));
    }
  });
};

module.exports = {ALLPROJECTS,VALIDATEINPUTS,MODIFYPROJECTS,CLEARINPUTS,FILTEROPTIONS,DISPLAYPROJECTS,FILTERPROJECTS,CREATECOMPLETEBUTTON,CREATEEXITBUTTON,CREATETAG};

},{"./constants":1}]},{},[2]);
