import React from 'react';

const getDataFromForm = (e, userId) => {
  e.preventDefault();
  return {
    title: e.target.elements.title.value,
    content: e.target.elements.content.value,
    userId,
  };
};

export default ({ userId, submitNewPost, submitLoading, submitError }) => (
  <div className="newpost">
    {submitError ? <div>Error: {submitError}</div> : null}
    <h3>Create New Post</h3>
    <form
      onSubmit={ e => {
        e.preventDefault();
        submitNewPost(getDataFromForm(e, userId));
      } }
      className="form"
    >
      <label>
        Title:
        <input type="text" name="title" className="title" />
      </label>
      <label>
        Content:
        <textarea name="content" className="content" />
      </label>
      <button type="submit" name="submit" disabled={ submitLoading }>
        Create Post
      </button>
    </form>
  </div>
);
