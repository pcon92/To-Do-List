// Get elements from DOM
const INPUT_FIELD = document.getElementById('input-box');
const MIDDLE_SECTION = document.getElementById('middle-section');
const OUTER_CONTAINER = document.getElementById('outer-container');
const CLEAR_ALL_BUTTON = document.getElementById('clear-all-btn');
const SHOW_CUSTOMIZATION_DIV = document.getElementById('show-customize-div');
const SHOW_CUSTOMIZATION_CHECKBOX = document.getElementById('show-customization-checkbox');
const CUSTOMIZATION_PANEL = document.getElementById('customization-panel');
const DROPOFF_RADIO_BTN = document.getElementById('drop-off');
const DISAPPEAR_RADIO_BTN = document.getElementById('disappear');
const RED_RADIO_BTN = document.getElementById('red');
const BLUE_RADIO_BTN = document.getElementById('blue');

// If user hits enter trigger Add to List
document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        addToDo();
    }
});

// If user leaves outer container fade away show customization option
OUTER_CONTAINER.addEventListener("mouseenter", (e) => {
    SHOW_CUSTOMIZATION_DIV.setAttribute("class", "");
});

OUTER_CONTAINER.addEventListener("mouseleave", (e) => {
    SHOW_CUSTOMIZATION_DIV.setAttribute("class", "anim-disappear");
});


function addToDo() {

    const input_text = INPUT_FIELD.value;
    const allToDoItems = [... MIDDLE_SECTION.children];

    if (input_text !== '') {

        if (allToDoItems.length<= 4) {
            
            if (input_text.length <= 20) {

        // Create random ID value to assign as attribute
        const idVal = Math.floor(Math.random() * 10000);

        const newToDoBox = document.createElement("div");
        newToDoBox.setAttribute("class", "new-to-do-box anim-dropdown");
        newToDoBox.setAttribute("id", `${idVal}`);

        const newToDo = document.createElement("div");
        newToDo.innerText = input_text;
        newToDo.setAttribute("class", "new-to-do-item");

        const newToDoStar = document.createElement("i");
        newToDoStar.setAttribute("class", "far fa-star new-to-do-btn");
        newToDoStar.setAttribute("onclick", `markImportant(${idVal})`);
        newToDoStar.setAttribute("id", `star${idVal}`);

        const newToDoDelete = document.createElement("i");
        newToDoDelete.setAttribute("class", "far fa-trash-alt new-to-do-btn");
        newToDoDelete.setAttribute("onclick", `deleteToDo(${idVal})`);

        MIDDLE_SECTION.appendChild(newToDoBox);
        newToDoBox.appendChild(newToDo);
        newToDoBox.appendChild(newToDoStar);
        newToDoBox.appendChild(newToDoDelete);

        INPUT_FIELD.value = '';

            } else {
                alert('Please enter maximum of 20 characters');
            }

        } else {
            alert('Please enter maximum of 5 tasks');
        }

    } else {
        alert('Please enter some text');
    }

}


function deleteToDo(clickedId) {

    // Put all to do items in array for for loop
    const toDoArr = [...MIDDLE_SECTION.children];
    
    for (let i = 0; i < toDoArr.length; i++) {
        if (toDoArr[i].id == clickedId) {
            const deleteToDo = document.getElementById(clickedId);
            const isNone = toggleAnim();
            deleteToDo.setAttribute("class", `new-to-do-box anim-${isNone}`);
            if (isNone !== "") {
                setTimeout(() => deleteToDo.remove(), 2000);
            } else {
                deleteToDo.remove();
            }
            
        }
    }

}


function clearAll() {

    const allToDoItems = [...MIDDLE_SECTION.children];

    if (allToDoItems.length === 0) {
        CLEAR_ALL_BUTTON.setAttribute("class", "max-w-h btn clear-all-btn anim-shake");
        setTimeout(() => CLEAR_ALL_BUTTON.setAttribute("class", "max-w-h btn"), 2000);
    } else {

    allToDoItems.map(toDoItem => toDoItem.remove()) 
        
        OUTER_CONTAINER.setAttribute("class", "flex-center outer-container anim-spin");
        setTimeout(() => OUTER_CONTAINER.setAttribute("class", "flex-center outer-container"), 2000);

    }

}


function markImportant(clickedId) {

    let starToDo = document.getElementById(clickedId);
    let checkWhichColor = toggleColors();

    if (starToDo.className === `new-to-do-box ${checkWhichColor}-box`) {
        starToDo.setAttribute("class", "new-to-do-box");
    } else {
        starToDo.setAttribute("class", `new-to-do-box ${checkWhichColor}-box`);
    }


    let starToDoStar = document.getElementById(`star${clickedId}`);

    if (starToDoStar.className === `far fa-star new-to-do-btn ${checkWhichColor}-btn`) {
        starToDoStar.setAttribute("class", "far fa-star new-to-do-btn");
    } else {
        starToDoStar.setAttribute("class", `far fa-star new-to-do-btn ${checkWhichColor}-btn`);
    }

}


function togglePreferences() {

    if (SHOW_CUSTOMIZATION_CHECKBOX.checked === true) {
        CUSTOMIZATION_PANEL.setAttribute("class", "customization-panel anim-appear");
    } else {
        CUSTOMIZATION_PANEL.setAttribute("class", "customization-panel anim-disappear");
    }

}


function toggleAnim() {

    if (DROPOFF_RADIO_BTN.checked === true) {
        return "dropoff";
    } else if (DISAPPEAR_RADIO_BTN.checked === true) {
        return "disappear";
    } else {
        return "";
    }

}


function toggleColors() {

    if (RED_RADIO_BTN.checked === true) {
        return "red";
    } else if (BLUE_RADIO_BTN.checked === true) {
        return "blue";
    } else {
        return "yellow";
    }

}

