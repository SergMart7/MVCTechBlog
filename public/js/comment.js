const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector("#comment-text").value.trim();
    const post_id = window.location.toString().split("/").pop();
  
    if (comment_text) {
      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          body: JSON.stringify({ comment_text, post_id }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert("Failed to add comment");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        alert("An error occurred while adding the comment.");
      }
    } else {
      alert("Comment cannot be empty!");
    }
  };

  document.querySelector("#submit-comment")?.addEventListener("click", commentFormHandler);
  