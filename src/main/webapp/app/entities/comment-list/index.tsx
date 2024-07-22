import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CommentList from './comment-list';
import CommentListDetail from './comment-list-detail';
import CommentListUpdate from './comment-list-update';
import CommentListDeleteDialog from './comment-list-delete-dialog';

const CommentListRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CommentList />} />
    <Route path="new" element={<CommentListUpdate />} />
    <Route path=":id">
      <Route index element={<CommentListDetail />} />
      <Route path="edit" element={<CommentListUpdate />} />
      <Route path="delete" element={<CommentListDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CommentListRoutes;
