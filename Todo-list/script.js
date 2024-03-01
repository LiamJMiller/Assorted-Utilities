document
	.getElementById("taskForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const taskNameInput = document.getElementById("taskName");
		const taskImportanceSelect = document.getElementById("taskImportance");
		const newTask = document.createElement("div");
		newTask.className = "task task-importance-" + taskImportanceSelect.value;
		newTask.draggable = true;
		newTask.textContent = taskNameInput.value;
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "X";
		deleteButton.style.display = "none";
		deleteButton.className = "task-delete-button";
		deleteButton.addEventListener("click", function () {
			newTask.remove();
		});
		newTask.appendChild(deleteButton);
		document.getElementById("todo").appendChild(newTask);
		taskNameInput.value = "";
	});

let dragged;

document.addEventListener("drag", function (event) {}, false);

document.addEventListener(
	"dragstart",
	function (event) {
		if (event.target.className.includes("task")) {
			dragged = event.target;
		} else {
			event.preventDefault();
		}
	},
	false
);

document.addEventListener(
	"dragover",
	function (event) {
		event.preventDefault();
		if (event.target.className.includes("column")) {
			event.target.style.background = "#f6f8fa";
		}
	},
	false
);

document.addEventListener(
	"dragleave",
	function (event) {
		if (event.target.className.includes("column")) {
			event.target.style.background = "";
		}
	},
	false
);

document.addEventListener(
	"drop",
	function (event) {
		event.preventDefault();
		if (event.target.className.includes("column")) {
			event.target.style.background = "";
			event.target.appendChild(dragged);
			if (event.target.id === "done") {
				const deleteButton = dragged.querySelector("button");
				deleteButton.style.display = "block";
			}
		}
	},
	false
);

document.addEventListener(
	"dragend",
	function (event) {
		dragged = null;
	},
	false
);
