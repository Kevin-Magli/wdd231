const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if (inputBox.value === '') {
        alert("Don't forget to 'write' the task, you don't want to add an empty box there do you?");
    } else {
        // create a Li element with the text of the input field
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        //create an X button in a span tag
        let cross = document.createElement("span");
        cross.innerHTML = "\u00d7";
        cross.className = "x-button";
        li.appendChild(cross);
        
    }
    // empty the inputBox and save to localstorage
    inputBox.value = "";
    saveData()
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData()
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData()
    }
}, false)

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function loadData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
loadData()