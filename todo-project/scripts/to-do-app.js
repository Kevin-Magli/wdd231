import {saveData, loadData} from './localstorage-logic.js';

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function AddTask() {

    if (inputBox.value === '') {
        alert("Don't forget to 'write' the task, you don't want to add an empty box there do you?");
    } else {
        // create a Li element with the text of the input field
        let li = document.createElement("li");
        li.innerHTML = inputBox.value + `<span class="task-description"></span>`;
        listContainer.appendChild(li);

        //create an X button in a span tag
        let cross = document.createElement("span");
        cross.innerHTML = "\u00d7";
        cross.className = "x-button";
        li.appendChild(cross);

        //create an edit button
        let edit = document.createElement("span");
        edit.innerHTML = "✎";
        edit.className = "edit-button";
        li.appendChild(edit); 
        
    }
    // empty the inputBox and save to localstorage
    inputBox.value = "";
    saveData(listContainer)
}

inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        AddTask();
    }
});

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer)
    } else if (e.target.className === "x-button") {
        e.target.parentElement.remove();
        saveData(listContainer)
    } else if (e.target.className ==="edit-button") {
        const modal = document.getElementById('myModal');

        modal.innerHTML = `
        <div class="task-modal">
            <div class="title-bar">
                <h2>${e.target.parentElement.innerText.slice(0, -3)}</h2>
                <button id="modalClose">❌</button>
            </div>
            <div class="task-details">
                <h3>Description:</h3>
                <p><textarea id="description" rows="4" cols="40"></textarea></p>
                <button id="modalSave">Save</button>
            </div>
        </div>
    `;
    modal.showModal();
    
    
    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click', () =>{
        modal.close();
    })

    // To give each task a unique, editable description, the modal should load and save the description specific to each task.
    document.getElementById('description').value = e.target.parentElement.querySelector(".task-description").textContent;
    const modalSave = document.getElementById('modalSave');
    modalSave.addEventListener('click', () => {
        const parent = e.target.parentElement; // Get the task element
        const description = document.getElementById('description').value;
        parent.querySelector(".task-description").innerText = description; // Update the specific task description
        modal.close();
        saveData(listContainer);
    });

    }
}, false)

function DeleteCompleted() {
    const completedTasks = listContainer.getElementsByClassName("checked");
    while (completedTasks.length > 0) {
        completedTasks[0].remove();
    }
    saveData(listContainer);
}
function MarkCompleted() {
    const tasks = listContainer.getElementsByTagName("li");
    Array.from(tasks).forEach(task => task.classList.add("checked"));
    saveData(listContainer);
}

async function AddDefaultTasks() {
    try {
        const response = await fetch('data/default-tasks.json');
        const data = await response.json();
        data.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = task.title + `<span class="task-description">${task.description}</span>`;
            
            // Create an X button
            const cross = document.createElement("span");
            cross.innerHTML = "\u00d7";
            cross.className = "x-button";
            li.appendChild(cross);

            // Create an edit button
            const edit = document.createElement("span");
            edit.innerHTML = "✎";
            edit.className = "edit-button";
            li.appendChild(edit);

            listContainer.appendChild(li);
        });
        saveData(listContainer);
    } catch (error) {
        console.error('Failed to load default tasks:', error);
    }
}

document.getElementById('add-task-button').addEventListener('click', AddTask);
document.getElementById('add-default-tasks').addEventListener('click', AddDefaultTasks);
document.getElementById('mark-completed').addEventListener('click', MarkCompleted);
document.getElementById('delete-completed').addEventListener('click', DeleteCompleted);

loadData(listContainer)

