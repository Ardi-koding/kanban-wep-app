let buttons = document.querySelectorAll("button");

console.log(buttons);
buttons.forEach((element) => {
	element.addEventListener("click", () => {
		alert("it got clicked");
	});
});

