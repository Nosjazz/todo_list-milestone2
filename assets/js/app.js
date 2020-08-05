
/*********** Select the Elements */
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.querySelector(".todo-input");
const clear = document.querySelector(".clear")

const CHECK ="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";

/*************** DATE */   
let options = {weekday:"long", month:"short", day:"numeric"};
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


/**************** Add to do */
function addToDo(toDo, id, done, trash) {

    if(trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text = 
                 `<li class="item">
                    <i class="fa fa-circle-thin job="complete"></i>
                    <p class="text"> ${toDo}</p>
                    <i class="fa fa-trash-o" job="delete"></i>
                </li>`;
    const position ="beforeend";

    list.insertAdjacentHTML(position, text);
}
 
document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13 ) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo); 
        }
    }
});