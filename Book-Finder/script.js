document
	.getElementById("book-search-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const query = document.getElementById("book-search-input").value;
		fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en`
		)
			.then((response) => response.json())
			.then(displayBooks);
	});

document
	.getElementById("random-book-button")
	.addEventListener("click", function () {
		var checkboxes = document.querySelectorAll(
			'input[name="category"]:checked'
		);
		var categories = Array.from(checkboxes).map(
			(checkbox) => "subject:" + checkbox.value
		);
		var parameters = categories.join("+");
		fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${parameters}&langRestrict=en`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.items && data.items.length) {
					var randomIndex = Math.floor(Math.random() * data.items.length);
					displayBooks({ items: [data.items[randomIndex]] });
				} else {
					alert("No books found for the selected categories.");
				}
			});
	});

document
	.querySelectorAll("#book-category-checkboxes label")
	.forEach((label) => {
		label.addEventListener("click", function (event) {
			event.preventDefault();
			const checkbox = document.getElementById(this.htmlFor);
			checkbox.checked = !checkbox.checked;
			this.style.backgroundColor = checkbox.checked ? "#ff6347" : "#fff"; // Change color of selected category
		});
	});

function displayBooks(data) {
	const resultsContainer = document.getElementById("book-results");
	resultsContainer.innerHTML = "";
	data.items.forEach(function (book) {
		const bookElement = document.createElement("div");
		bookElement.innerHTML = `
            <h2>${book.volumeInfo.title}</h2>
            ${
							book.volumeInfo.imageLinks
								? `<img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">`
								: ""
						}
            ${
							book.volumeInfo.authors
								? `<p>Authors: ${book.volumeInfo.authors.join(", ")}</p>`
								: ""
						}
            ${
							book.volumeInfo.publishedDate
								? `<p>Published Date: ${book.volumeInfo.publishedDate}</p>`
								: ""
						}
            ${
							book.volumeInfo.description
								? `<p>Description: ${book.volumeInfo.description}</p>`
								: ""
						}
            ${
							book.volumeInfo.previewLink
								? `<a href="${book.volumeInfo.previewLink}">Preview Book</a>`
								: ""
						}
        `;
		resultsContainer.appendChild(bookElement);
	});
}
