document
	.getElementById("recipe-search-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		var category = document.getElementById("recipe-category-select").value;
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
			.then((response) => response.json())
			.then(displayMeals);
	});

document
	.getElementById("ingredient-search-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		var ingredient = document.getElementById("ingredient-search-input").value;
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
			.then((response) => response.json())
			.then(displayMeals);
	});

document
	.getElementById("random-meal-button")
	.addEventListener("click", function () {
		fetch("https://www.themealdb.com/api/json/v1/1/random.php")
			.then((response) => response.json())
			.then((data) => displayMeals({ meals: [data.meals[0]] }));
	});

function displayMeals(data) {
	var resultsContainer = document.getElementById("recipe-results");
	resultsContainer.innerHTML = "";
	data.meals.forEach(function (meal) {
		var mealElement = document.createElement("div");
		var ingredientsList = "";

		// Loop through the ingredients and measures
		for (let i = 1; i <= 20; i++) {
			if (meal[`strIngredient${i}`]) {
				ingredientsList += `<li>${meal[`strIngredient${i}`]}: ${
					meal[`strMeasure${i}`]
				}</li>`;
			}
		}

		mealElement.innerHTML = `
            <h2>${meal.strMeal}</h2>
            ${
							meal.strMealThumb
								? `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">`
								: ""
						}
            ${meal.strCategory ? `<p>Category: ${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>Area: ${meal.strArea}</p>` : ""}
            ${
							meal.strInstructions
								? `<p>Instructions: ${meal.strInstructions}</p>`
								: ""
						}
            ${
							meal.strYoutube
								? `<a href="${meal.strYoutube}">Watch Video</a>`
								: ""
						}
            ${
							meal.strSource
								? `<a href="${meal.strSource}">Recipe Source</a>`
								: ""
						}
            ${meal.strTags ? `<p>Tags: ${meal.strTags}</p>` : ""}
            <button id="toggle-ingredients-${
							meal.idMeal
						}">Toggle Ingredients</button>
            <ul id="ingredients-${
							meal.idMeal
						}" style="display: none;">${ingredientsList}</ul>
        `;
		resultsContainer.appendChild(mealElement);

		// Add event listener to the toggle button
		document
			.getElementById(`toggle-ingredients-${meal.idMeal}`)
			.addEventListener("click", function () {
				var ingredientsUl = document.getElementById(
					`ingredients-${meal.idMeal}`
				);
				if (ingredientsUl.style.display === "none") {
					ingredientsUl.style.display = "block";
				} else {
					ingredientsUl.style.display = "none";
				}
			});
	});
}
