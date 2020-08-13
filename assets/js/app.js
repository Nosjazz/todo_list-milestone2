/*********** Select the Elements */
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.querySelector(".todo-input");
const clear = document.querySelector(".clear");
const add = document.querySelector(".todo-button");
const filter = document.querySelector(".filter-todo");


const CHECK ="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";
const COMPLETED = "completed"

let LIST = [],
id = 0;

/*************** DATE */   
let options = {weekday:"long", month:"short", day:"numeric"};
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

/**************** Filter  */

filter.addEventListener("click", filterTodo);

function filterTodo(event) {
    const item = document.querySelectorAll(".item");       

    item.forEach(function(i) {
        switch(event.target.value){
            case "all":
                i.style.display = "flex";
                break;
            case "completed":
                if(i.classList.contains("completed")){
                    i.style.display = "flex";
                }else {
                    i.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!i.classList.contains("completed")) {
                    i.style.display = "flex";
                } else {
                    i.style.display = "none";
                }
                break;        
        } 
    });
}

/**************** Add to do */
function addToDo(toDo, id, done, trash) {

    if(trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const COMP = done ? COMPLETED : "";

    const text = `<li class="item ${COMP}">
                    <p class="text ${LINE}"> ${toDo}</p>
                    <i class="fa ${DONE}" job="complete" id="${id}"></i>
                    <i class="fa fa-trash-o" job="delete" id="${id}"></i>
                </li>`;
    const position ="beforeend";

    list.insertAdjacentHTML(position, text);
}
 
document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13 ) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false); 

            LIST.push ({
                name : toDo,
                id: id,
                done: false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value ="";
    }
});

add.addEventListener("click", function(event){
    const toDo = input.value;
    if (toDo) {
        addToDo(toDo, id, false, false); 

        LIST.push ({
            name : toDo,
            id: id,
            done: false,
            trash: false
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value ="";
});

/*************** Complete to do */

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);    
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    element.parentNode.classList.toggle(COMPLETED);

    LIST[element.id].done = LIST[element.id].done ? false : true ;
}

/**************** Remove to do */

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

/**************** targeter */

list.addEventListener("click", function (event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete") {
        completeToDo(element);
    }else if (elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


/**************** Local storage */
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

/**************** Clear Local storage  */

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});