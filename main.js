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
				$(this).removeClass(
					"low-priority medium-priority high-priority"
				);
				$(this).addClass($(this).val() + "-priority");
			});
		});
	}
	checkPriority();

	function newBox(newAttribute, selector) {
		let taskList = $("<div></div>");
		taskList.addClass("task_list");
		taskList.css("display", "none");

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
			.attr("type", "text")
			.attr("required", true);
		inlineInput.addClass("inline-input");

		let buttonGroup = $("<div></div>").addClass("add-task");
		let confirm = $("<button></button")
			.text("Confirm")
			.attr("type", "button")
			.addClass("btn-confirm");
		let cancel = $("<button></button>")
			.text("Cancel")
			.attr("type", "button")
			.addClass("btn-cancel ");
		buttonGroup.append(confirm, cancel);

		taskList.append(priority, inlineInput, buttonGroup);
		taskList.attr("data-list", newAttribute);

		$(selector).after(taskList);
		taskList.fadeIn(500);

		inlineInput.focus();

		$(".add-button").prop("disabled", true);
		$(".add-button").css("cursor", "not-allowed");
		// Cegah interaksi di luar kotak
		lockFocus(taskList, inlineInput);
	}

	function lockFocus(taskList, inlineInput) {
		function outsideClick(event) {
			if (!taskList[0].contains(event.target)) {
				alert("Insert task first!");
				inlineInput.focus();
				event.preventDefault();
			}
		}

		$(document).on("click.outside", outsideClick);

		taskList.find(".btn-cancel").on("click", function () {
			taskList.fadeOut(300, function () {
				$(this).remove();
				$(".add-button").prop("disabled", false);
				$(".add-button").hover(
					function () {
						$(this).css("cursor", "pointer");
					},
					function () {
						$(this).css("cursor", "default");
					}
				);
				$(document).off("click.outside");
			});
		});
	}

	function whichTask(namaClass, dataLength, newBox) {
		let $nextAttribute = namaClass + "-" + (dataLength + 1);
		let $selector =
			dataLength === 0
				? $(`.${namaClass} > h2`)
				: `[data-list="${namaClass}-${dataLength}"]`;
		newBox($nextAttribute, $selector);
	}

	$(".add-task").on("click", function (event) {
		let namaClass = $(this).parent().attr("class").split(" ")[1];
		let parent = $(this).parent();
		let dataLength = Number(parent.children("[data-list]").length);
		whichTask(namaClass, dataLength, newBox);
		event.stopPropagation();
		checkPriority();
	});
});
