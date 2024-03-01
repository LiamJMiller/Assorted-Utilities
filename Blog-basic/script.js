let postCount = 0;
let likeCount = 0;

document
	.getElementById("newPostForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		const title = document.getElementById("title").value;
		const content = document.getElementById("content").value;
		const code = document.getElementById("code").value;
		const picture = document.getElementById("picture").value;

		// Check if title or content is empty
		if (!title.trim() || !content.trim()) {
			let errorMessage = document.querySelector(".error");
			if (!errorMessage) {
				errorMessage = document.createElement("p");
				errorMessage.classList.add("error");
				event.target.appendChild(errorMessage);
			}
			errorMessage.innerText = "Title and content cannot be empty";
			return;
		}

		// Remove error message if it exists
		const errorMessage = document.querySelector(".error");
		if (errorMessage) {
			errorMessage.remove();
		}

		const date = new Date().toLocaleDateString();

		// Create new post
		const newPost = document.createElement("div");
		newPost.className = "post";
		newPost.setAttribute("data-likes", "0");
		newPost.innerHTML = `<h2>${title}</h2><p>${content}</p>${
			code ? `<pre><code>${code}</code></pre>` : ""
		}${
			picture ? `<img src="${picture}" alt="Post image" class="img">` : ""
		}<p>Date: ${date}</p><button class="like-button" onclick="likePost(this)">Like</button><button onclick="deletePost(this)" class="delete-button">Delete Post</button><div class="comments" data-comments="0"></div><form class="comment-form"><input type="text" class="comment-input"><button type="submit">Comment</button></form>`;

		const posts = document.getElementById("posts");
		posts.insertBefore(newPost, posts.childNodes[2]);
		postCount++;
		document.getElementById("postCount").innerText = postCount;
		newPost
			.querySelector(".comment-form")
			.addEventListener("submit", addComment);
	});

function likePost(button) {
	button.innerText = "Liked!";
	button.disabled = true;
	const post = button.parentNode;
	const likes = parseInt(post.getAttribute("data-likes")) + 1;
	post.setAttribute("data-likes", likes);
}

function deletePost(button) {
	const post = button.parentNode;
	post.parentNode.removeChild(post);
}

function addComment(event) {
	event.preventDefault();
	const commentInput = event.target.querySelector(".comment-input");
	const commentText = commentInput.value;

	// Check if comment is empty
	if (!commentText.trim()) {
		let errorMessage = document.querySelector(".error");
		if (!errorMessage) {
			errorMessage = document.createElement("p");
			errorMessage.classList.add("error");
			event.target.appendChild(errorMessage);
		}
		errorMessage.innerText = "Comment cannot be empty";
		return;
	}

	// Remove error message if it exists
	const errorMessage = document.querySelector(".error");
	if (errorMessage) {
		errorMessage.remove();
	}

	const comment = document.createElement("p");
	comment.classList.add("comment");
	comment.innerText = commentInput.value;
	comment.innerHTML +=
		' <button class="delete-button" onclick="deleteComment(this)">Delete</button>';
	const commentsContainer = event.target.previousSibling;
	commentsContainer.appendChild(comment);
	const comments =
		parseInt(commentsContainer.getAttribute("data-comments")) + 1;
	commentsContainer.setAttribute("data-comments", comments);
	commentInput.value = "";
}

function deleteComment(button) {
	const comment = button.parentNode;
	const commentsContainer = comment.parentNode;
	commentsContainer.removeChild(comment);
	const comments =
		parseInt(commentsContainer.getAttribute("data-comments")) - 1;
	commentsContainer.setAttribute("data-comments", comments);
}
