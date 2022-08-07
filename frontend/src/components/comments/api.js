import { apiGet, apiPost } from '../API';
const imgLink =
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';

export const getComments = async (internshipId) => {
  return apiGet('review/internshipreview', { movie_id: internshipId });
  // return [
  //   {
  //     id: '1',
  //     body: 'First comment',
  //     username: 'Jack',
  //     userId: '1',
  //     parentId: null,
  //     avatar: imgLink,
  //     createdAt: '2021-08-16T23:00:33.010+02:00',
  //   },
  //   {
  //     id: '2',
  //     body: 'Second comment',
  //     username: 'John',
  //     userId: '2',
  //     parentId: null,
  //     createdAt: '2021-08-16T23:00:33.010+02:00',
  //   },
  //   {
  //     id: '3',
  //     body: 'First comment first child',
  //     username: 'John',
  //     userId: '2',
  //     parentId: '1',
  //     createdAt: '2021-08-16T23:00:33.010+02:00',
  //   },
  //   {
  //     id: '4',
  //     body: 'Second comment second child',
  //     username: 'John',
  //     userId: '2',
  //     parentId: '3',
  //     createdAt: '2021-08-16T23:00:33.010+02:00',
  //   },
  // ];
};

export const createComment = async (text, internshipId, parentId = null, setChange) => {
  apiPost('review/review', {
    token: sessionStorage.getItem('token'),
    review: text,
    internship: internshipId,
    parent_id: parentId,
  })
    .then((d) => setChange((prev) => !prev))
    .catch((e) => alert(e));

  // return {
  //   id: Math.random().toString(36).substr(2, 9),
  //   body: text,
  //   parentId,
  //   userId: sessionStorage.getItem('id'),
  //   username: 'John',
  //   createdAt: new Date().toISOString(),
  // };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async (commentId, setChange) => {
  apiGet('review/deletereview', { id: commentId })
    .then((d) => setChange((prev) => !prev))
    .catch((e) => alert(e));
  return {};
};
