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

	function newBox(newAttribute, selector) {
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
		taskList.attr("data-list", newAttribute);

		$(selector).after(taskList);
	}

	function whichTask(namaClass, dataLength, newBox) {
		switch (namaClass) {
			case "to-do":
				let to_do = namaClass + "-" + dataLength;
				let to_do_selector = `[data-list="${to_do}"]`;
				let to_do_next = namaClass + "-" + (dataLength + 1);
				newBox(to_do_next, to_do_selector);
				break;

			case "in-progress":
				let in_progress = namaClass + "-" + dataLength;
				let in_progress_selector = `[data-list="${in_progress}"]`;
				let in_progress_next = namaClass + "-" + (dataLength + 1);
				newBox(in_progress_next, in_progress_selector);
				break;

			case "review":
				let review = namaClass + "-" + dataLength;
				let review_selector = `[data-list="${review}"]`;
				let review_next = namaClass + "-" + (dataLength + 1);
				newBox(review_next, review_selector);
				break;

			case "done":
				let done = namaClass + "-" + dataLength;
				let done_selector = `[data-list="${done}"]`;
				let done_next = namaClass + "-" + (dataLength + 1);
				newBox(done_next, done_selector);
				break;

			default:
				break;
		}
	}

	$(".add-task").on("click", function () {
		let namaClass = $(this).parent().attr("class").slice("5");
		let parent = $(this).parent();
		let dataLength = Number(parent.children("[data-list]").length);
		whichTask(namaClass, dataLength, newBox);
		checkPriority();
	});
});
