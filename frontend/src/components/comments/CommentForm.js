import { useState } from 'react';
import { Button } from '@mui/material';

import './Comment.css';

const CommentForm = ({ handleSubmit, submitLabel, hasCancelButton = false, handleCancel, initialText = '' }) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText('');
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment here"
      />
      {hasCancelButton && (
        <Button className="comment-form-cancel-button" variant="contained" onClick={handleCancel}>
          cancel
        </Button>
      )}
      <Button
        className="comment-form-button"
        type="submit"
        variant="contained"
        value={text}
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default CommentForm;
