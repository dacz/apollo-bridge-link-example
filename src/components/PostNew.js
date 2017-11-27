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
  <div>
    {submitError ? <div>Error: {submitError}</div> : null}
    <form
      onSubmit={ e => {
        e.preventDefault();
        submitNewPost(getDataFromForm(e, userId));
      } }
    >
      <input type="text" name="title" />
      <textarea name="content" />
      <button type="submit" name="submit" disabled={ submitLoading }>
        Create Post
      </button>
    </form>
  </div>
);
