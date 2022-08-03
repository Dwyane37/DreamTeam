import { useState, useEffect } from 'react';
import { Paper, Divider } from '@mui/material';

import CommentForm from './CommentForm';
import Comment from './Comment';
import './Comment.css';

import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from './api';

const Comments = ({ internshipId, currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [rootComments, setRootComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [change, setChange] = useState(false);
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort((a, b) => new Date(a.create_time).getTime() - new Date(b.create_time).getTime());

  const addComment = (text, parentId) => {
    createCommentApi(text, internshipId, parentId).then((comment) => {
      // getCommentsApi(internshipId).then((data) => {
      //   setBackendComments(Object.values(data));
      // });
      setChange(!change);
      // setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to remove comment?')) {
      deleteCommentApi(commentId).then(() => {
        setChange(!change);
        // getCommentsApi(internshipId).then((data) => {
        //   setBackendComments(Object.values(data));
        // });
        // const updatedBackendComments = backendComments.filter((backendComment) => backendComment.id !== commentId);
        // setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi(internshipId).then((data) => {
      setBackendComments(Object.values(data));
      const root = Object.values(data).filter((backendComment) => backendComment.parent_id === null);
      setRootComments(root);
    });
  }, [change]);

  return (
    <Paper className="comments">
      <h3 className="comments-title">
        {rootComments?.length} {rootComments?.length === 1 ? 'Comment' : 'Comments'}
      </h3>
      <Divider sx={{ margin: '20px 0' }} />
      <CommentForm submitLabel="Post" handleSubmit={addComment} />
      {rootComments && (
        <div className="comments-container">
          {rootComments.map((rootComment) => (
            <Comment
              userId={rootComment.user_id}
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </Paper>
  );
};

export default Comments;
