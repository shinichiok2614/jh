import React from 'react';
import './post-category-header.css';

export interface PostProps {
  name: string;
  author: string;
  paragraph: string;
  createdAt: string;
  view: number;
  commentCount: number;
  imageUrl: string;
}

const PostCategoryHeader: React.FC<PostProps> = ({ name, author, paragraph, createdAt, view, commentCount, imageUrl }) => {
  return (
    <div className="post-card-header">
      <div className="post-content">
        <h2 className="post-title">{name}</h2>
        <p className="author">{author}</p>
        <p className="paragraph">{paragraph}</p>
        <div className="post-date-comment">
          <div>{new Date(createdAt).toLocaleDateString()}</div>
          <div>✒️{commentCount}</div>
        </div>
      </div>
      <img src={imageUrl} alt="Post Image" className="post-image" />
    </div>
  );
};

export default PostCategoryHeader;
