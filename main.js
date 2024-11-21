let buttons = document.querySelectorAll("button");

console.log(buttons);
buttons.forEach((element) => {
	element.addEventListener("click", () => {
		alert("it got clicked");
	});
});

// priority = document.querySelectorAll(".select-priority");
// priority.forEach((element) => {
// 	if (element.value == "low") {
// 		element.style.backgroundColor = "red";
// 	}

// 	if (element.value == "medium") {
// 		element.style.backgroundColor = "blue";
// 	}
// });

$(document).ready(function () {
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
});
