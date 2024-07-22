import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Person from './person';
import Department from './department';
import Category from './category';
import Post from './post';
import Paragraph from './paragraph';
import Image from './image';
import Album from './album';
import Comment from './comment';
import CommentList from './comment-list';
import Message from './message';
import MessageList from './message-list';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="person/*" element={<Person />} />
        <Route path="department/*" element={<Department />} />
        <Route path="category/*" element={<Category />} />
        <Route path="post/*" element={<Post />} />
        <Route path="paragraph/*" element={<Paragraph />} />
        <Route path="image/*" element={<Image />} />
        <Route path="album/*" element={<Album />} />
        <Route path="comment/*" element={<Comment />} />
        <Route path="comment-list/*" element={<CommentList />} />
        <Route path="message/*" element={<Message />} />
        <Route path="message-list/*" element={<MessageList />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
