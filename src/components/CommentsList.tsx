import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  onDeleteComment: (i: number) => void;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  onDeleteComment,
}) => (
  <>
    <p className="title is-4">Comments:</p>

    {comments.map(coment => (
      <article key={coment.id} className="message is-small" data-cy="Comment">
        <div className="message-header">
          <a href={`mailto:${coment.email}`} data-cy="CommentAuthor">
            {coment.name}
          </a>
          <button
            data-cy="CommentDelete"
            type="button"
            className="delete is-small"
            aria-label="delete"
            onClick={() => onDeleteComment(coment.id)}
          >
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {coment.body}
        </div>
      </article>
    ))}
  </>
);
