$(document).ready(function () {
	function checkPriority() {
		$(".select-priority").each(function () {
			if ($(this).val() == "low") {
				$(this).addClass("low-priority");
			}

			if ($(this).val() == "medium") {
				$(this).addClass("medium-priority");
			}

			if ($(this).val() == "high") {
				$(this).addClass("high-priority");
			}

			$(this).on("change", function () {
				let className = $(this).attr("class");
				$(this).removeClass(className.slice("16"));
				$(this).addClass($(this).val() + "-priority");
			});
		});
	}
	checkPriority();

	function whichSection(val, dataLength, newTask) {
		switch (val) {
			case "to-do":
				let attributeT = val + "-" + dataLength;
				console.log(attributeT);
				let attributeT2 = val + "-" + (dataLength + 1);
				newTask.attr("data-list", attributeT2);
				let selector = `[data-list="${attributeT}"]`;
				$(selector).after(newTask);
				break;
			case "in-progress":
				let attributeI = val + "-" + (dataLength + 1);
				newTask.attr("data-list", attributeI);
				$(attributeI).after(newTask);
				break;
			case "review":
				let attributeR = val + "-" + (dataLength + 1);
				newTask.attr("data-list", attributeR);
				$(attributeR).after(newTask);
				break;
			case "done":
				let attributeD = val + "-" + (dataLength + 1);
				newTask.attr("data-list", attributeD);
				$(attributeD).after(newTask);
				break;
			default:
				break;
		}
	}

	function createTask(whichSection, namaClass, dataListElement) {
		let taskList = $("<div></div>");
		taskList.addClass("task_list");

		let priority = $("<select></select>");
		priority.addClass("select-priority");

		let lowValue = $("<option></option>").text("Low Priority").val("low");
		let mediumValue = $("<option></option>")
			.text("Medium Priority")
			.val("medium");
		let highValue = $("<option></option>")
			.text("High Priority")
			.val("high");
		priority.append(lowValue, mediumValue, highValue);

		let inlineInput = $("<input></input>")
			.attr("placeholder", "Insert your task")
			.attr("type", "text");
		inlineInput.addClass("inline-input");

		let buttonGroup = $("<div></div>").addClass("add-task");
		let confirm = $("<button></button")
			.text("Confirm")
			.attr("type", "button")
			.addClass("add-button");
		let cancel = $("<button></button>")
			.text("Cancel")
			.attr("type", "button")
			.addClass("add-button");
		buttonGroup.append(confirm, cancel);

		taskList.append(priority, inlineInput, buttonGroup);

		whichSection(namaClass, dataListElement, taskList);
		checkPriority();
	}

	$(".add-task").on("click", function () {
		let namaClass = $(this).parent().attr("class").slice("5");
		let parent = $(this).parent();
		let dataListElement = Number(parent.children("[data-list]").length);
		createTask(whichSection, namaClass, dataListElement);
	});
});
