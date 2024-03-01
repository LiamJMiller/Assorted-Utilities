const generateButton = document.getElementById("generate");
const passwordText = document.getElementById("password");
const categoriesForm = document.getElementById("categories");
const lengthInput = document.getElementById("length");

function generatePassword() {
	const checkedCategories = Array.from(categoriesForm.elements.category)
		.filter((checkbox) => checkbox.checked)
		.map((checkbox) => checkbox.value);

	if (checkedCategories.length < 2) {
		alert("Please select at least two categories.");
		return;
	}

	let characters = checkedCategories.join("");
	let password = "";
	let length = lengthInput.value;

	if (length < 8 || length > 20) {
		alert("Password length should be between 8 and 20.");
		return;
	}

	// Exclude easily confused characters
	characters = characters.replace(/0O1l/g, "");

	// Generate one character from each selected category
	for (let category of checkedCategories) {
		password += category.charAt(Math.floor(Math.random() * category.length));
	}

	// Fill the rest of the password with random characters from all selected categories
	for (let i = password.length; i < length; i++) {
		password += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}

	// Shuffle the password to ensure the characters from each category are not just at the start
	password = password
		.split("")
		.sort(() => 0.5 - Math.random())
		.join("");

	return password;
}

generateButton.addEventListener("click", () => {
	passwordText.value = generatePassword();
});
