// Show the new post form

const showPostForm = () => {
    document.querySelector("#post-form").style.display = "block";
  };
  
  // Handle new post creation

  const newPostHandler = async () => {
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();
  
    if (title && content) {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        alert("An error occurred while creating the post.");
      }
    } else {
      alert("Please provide both a title and content for the post.");
    }
  };
  
  // Handle post edit

  const editPostHandler = async (id) => {
    const title = prompt("Enter new title");
    const content = prompt("Enter new content");
  
    if (title && content) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to update post");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        alert("An error occurred while updating the post.");
      }
    }
  };
  
  // Handle post deletion

  const deletePostHandler = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post.");
    }
  };
  
  document.querySelector("#new-post")?.addEventListener("click", showPostForm);
  document.querySelector("#save-post")?.addEventListener("click", newPostHandler);
  
  document.querySelectorAll(".edit-post").forEach((btn) => {
    btn.addEventListener("click", () => editPostHandler(btn.getAttribute("data-id")));
  });
  
  document.querySelectorAll(".delete-post").forEach((btn) => {
    btn.addEventListener("click", () => deletePostHandler(btn.getAttribute("data-id")));
  });
  