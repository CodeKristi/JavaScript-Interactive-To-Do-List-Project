// Problem: User interaction doesn't provide desired results
// Solution: Add interactivity so user can manage daily tasks

/* ----------------------
  VARIABLES
------------------------*/

var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; // first button on page
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

/* ----------------------
  FUNCTIONS
------------------------*/

// #new-task LIST ITEM
var createNewTaskElement = function(taskString) {
  
    // CREATE LIST ITEM
    var listItem = document.createElement("li");
    // INPUT (CHECKBOX)
    var checkBox = document.createElement("input"); // checkbox 
    // LABEL
    var label = document.createElement("label");
    // INPUT (TEXT)
    var editInput = document.createElement("input"); //text
    // BUTTON.edit
    var editButton = document.createElement("button");
    // BUTTON.delete
    var deleteButton = document.createElement("button");
    
    // EACH ELEMENT NEEDS TO BE MODIFIED 
    checkBox.type = "checkbox";
    editInput.type = "text";
  
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    
  
    label.innerText = taskString;
    
    // EACH ELEMENT NEEDS TO BE APPENDED
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
     
    return listItem;
}


// ADD A NEW TASK
var addTask = function() {
    // CREATE A NEW LIST ITEM WITH THE TEXT FROM #new-task
    var listItem = createNewTaskElement(taskInput.value);
    // APPEND listItem TO    incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  
    taskInput.value = "";
}


// EDIT AN EXISTING TASK
var editTask = function() {
 
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type="text"]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  // IF CLASS OF PARENT IS .editMode
  if (containsClass) {
    // SWITCH FROM .editMode
    // LABEL TEXT BECOMES INPUT'S VALUE
    label.innerText = editInput.value;
  } else {
    // SWITCH TO .editMode
    // INPUT VALUE BECOMES LABEL'S TEXT
    editInput.value = label.innerText
  }
  // TOGGLE .editMode ON LIST ITEM
  listItem.classList.toggle("editMode");
}


// DELETE AN EXISTING TASK
var deleteTask = function() {
   
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

 // REMOVE PARENT LIST ITEM FROM ul
 ul.removeChild(listItem);
}


// MARK A TASK AS COMPLETE
var taskCompleted = function() {
  // WHEN CHECKBOX IS CHECKED
     // APPEND TASK LIST IETM TO #completed-tasks 
     var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


// MARK A TASK AS INCOMPLETE
var taskIncomplete = function() {
  // WHEN CHECKBOX IS UNCHECKED
    // APPEND TASK LIST ITEM TO #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
    // SELECT taskListItem'S CHILDREN
    var checkBox = taskListItem.querySelector("input[type="checkbox"]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    
    // BIND THE editTasks TO EDIT BUTTON
    editButton.onclick = editTask;
  
    // BIND deleteTask TO DELETE BUTTON
    deleteButton.onclick = deleteTask;
  
    // BIND checkboxEventHandler TO CHECKBOX
    checkBox.onchange = checkboxEventHandler;
}

/* ----------------------
  BIND TO EACH OTHER
------------------------*/

// SET THE CLICK HANDLER TO THE addTask FUNCTION
addButton.addEventListener("click", addTask);

// CYCLE OVER incompleteTasksHolder ul LIST ITEMS
for(var i = 0; i < incompleteTasksHolder.children.length; i+-) {
    // BIND EVENTS TO LIST ITEM'S CHILDREN (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children)[i], taskCompleted);
}
 

// CYCLE OVER completedTasksHolder ul LIST ITEMS
for(var i = 0; i < completedTasksHolder.children.length; i+-) {
    // BIND EVENTS TO LIST ITEM'S CHILDREN (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children)[i], taskIncomplete);
}
   
















