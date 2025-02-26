import React, { useMemo, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as client from '../api/comments';
import { CommentsList } from './CommentsList';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [loadingComments, setLoadingComments] = useState(false);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [formIsSHow, setFormIsShow] = useState(false);
  const [error, setError] = useState(false);

  const { id, title, body } = post;

  async function deleteComent(commId: number) {
    setError(false);
    setPostComments(cur =>
      cur ? cur.filter(comm => commId !== comm.id) : null,
    );
    try {
      await client.deletePostComment(commId);
    } catch {
      setError(true);
      setPostComments(postComments);
    }
  }

  async function addNewComment(comm: Omit<Comment, 'id' | 'postId'>) {
    try {
      const promis = await client.addNewComment({ ...comm, postId: id });

      setPostComments(cur => (cur ? [...cur, promis] : null));
    } catch (er) {
      setError(true);
      setFormIsShow(false);
    }
  }

  useMemo(async () => {
    setLoadingComments(true);
    setFormIsShow(false);

    try {
      setError(false);
      const comments = await client.getPostComments(id);

      setPostComments(comments);
    } catch {
      setError(true);
    } finally {
      setLoadingComments(false);
    }
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {error && !loadingComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loadingComments && postComments && !error && (
            <>
              {postComments.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {postComments.length > 0 && (
                <CommentsList
                  comments={postComments}
                  onDeleteComment={commemtId => deleteComent(commemtId)}
                />
              )}
            </>
          )}

          {!loadingComments && !error && !formIsSHow && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormIsShow(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formIsSHow && (
          <NewCommentForm key={id} addNewComment={addNewComment} />
        )}
      </div>
    </div>
  );
};
