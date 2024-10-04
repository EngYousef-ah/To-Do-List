const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Function to add task
function addTask() {
    if (inputBox.value === '') {
        Swal.fire("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Create delete button
        let deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        li.appendChild(deleteButton);
    }
    inputBox.value = "";
    saveData();
}

// Event listener for editing and deleting tasks
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        const taskItem = e.target.parentElement;

        Swal.fire({
            title: 'Edit or Delete Task',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Edit',
            denyButtonText: `Delete`
        }).then((result) => {
            if (result.isConfirmed) {
                // Edit Task
                Swal.fire({
                    title: 'Edit Task',
                    input: 'text',
                    inputValue: taskItem.firstChild.textContent,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                }).then((editResult) => {
                    if (editResult.isConfirmed) {
                        taskItem.firstChild.textContent = editResult.value;
                        saveData();
                        Swal.fire('Task Edited', '', 'success');
                    }
                });
            } else if (result.isDenied) {
                // Delete Task
                taskItem.remove();
                saveData();
                Swal.fire('Task Deleted', '', 'success');
            }
        });
    }
}, false);

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Show saved tasks on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
