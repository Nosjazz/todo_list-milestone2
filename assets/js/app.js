
/*********** Select the Elements */
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.querySelector(".todo-input");
const clear = document.querySelector(".clear")

const CHECK ="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";

let LIST = []
,    id = 0 ;

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
                    <i class="fa ${DONE}" job="complete id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo}</p>
                    <i class="fa fa-trash-o" job="delete id="${id}"></i>
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
            id++;
        }
        input.value ="";
    }
});

addToDo("Coffee",1, true, false);