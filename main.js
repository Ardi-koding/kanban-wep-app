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

	function createTask(val) {
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

		$(".to-do_1").after(taskList);
		checkPriority();
	}

	$(".add-button").on("click", function () {
		createTask($(this).val());
	});
});
