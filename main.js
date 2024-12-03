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

		// * task head
		let taskHead = $("<div></div>");
		taskHead.addClass("task__head");

		// priority
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

		// three dot container
		let three_dot_container = $("<div></div>");
		three_dot_container.addClass("three-dot-container");

		// > three_dot_icon
		let three_dot_icon = $("<button></button>");
		three_dot_icon.addClass("three-dot-icon");

		let material_symbols_outlined = $("<span></span>");
		material_symbols_outlined
			.addClass("material-symbols-outlined")
			.text("more_vert");

		// > edit_and_delete
		let edit_and_delete = $("<div></div>");
		edit_and_delete.addClass("edit-and-delete hidden");

		let edit_btn = $("<button></button>");
		edit_btn.addClass("edit-btn").text("Edit");
		let delete_btn = $("<button></button>");
		delete_btn.addClass("delete-btn").text("Delete");

		// >> append
		three_dot_icon.append(material_symbols_outlined);
		edit_and_delete.append(edit_btn, delete_btn);
		three_dot_container.append(three_dot_icon, edit_and_delete);

		taskHead.append(priority, three_dot_container);

		// inline input
		let inlineInput = $("<input></input>")
			.attr("placeholder", "Insert your task")
			.attr("type", "text")
			.prop("required", true);
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

		taskList.append(taskHead, inlineInput, buttonGroup);
		taskList.attr("data-list", newAttribute);

		$(selector).after(taskList);
		taskList.fadeIn(500);

		inlineInput.focus();

		$(".add-button").prop("disabled", true);
		$(".add-button").css("cursor", "not-allowed");
		// Cegah interaksi di luar kotak
		lockFocus(taskList, inlineInput, buttonGroup);
	}

	function lockFocus(taskList, inlineInput, buttonGroup) {
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

		taskList.find(".btn-confirm").on("click", function () {
			if (inlineInput.val() === "") {
				alert("insert your task before confirming!");
				inlineInput.focus();
			} else {
				let $h3 = $("<h3></h3>");
				$h3.text(inlineInput.val());
				inlineInput.remove();
				buttonGroup.remove();
				// $(".btn-confirm").remove();
				// $(".btn-cancel").remove();

				taskList.find(".task__head").after($h3);

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
			}
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

	$(".add-button").on("click", function (event) {
		let namaClass = $(this).parent().attr("class").split(" ")[1];
		let parent = $(this).parent();
		let dataLength = Number(parent.children("[data-list]").length);
		whichTask(namaClass, dataLength, newBox);
		event.stopPropagation();
		checkPriority();
	});

	$(".three-dot-icon").on("click", function () {
		let $parent = $(this).parents(".task_list");
		let $edit_and_delete = $parent.find(".edit_and_delete");
		let $dotIcon = $parent.find(".three-dot-icon");
		let $dotContainer = $parent.find(".three-dot-container");

		$dotIcon.addClass("active");
		$edit_and_delete.removeClass("hidden");
		console.log("fufufafa");
		$(document).on("click.outside", function (event) {
			if (!$edit_and_delete[0].contains(event.target)) {
				$dotIcon.removeClass("active");
				$edit_and_delete.addClass("hidden");

				$(document).off("click.outside");
			}
		});
	});
});
