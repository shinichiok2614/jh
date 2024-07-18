import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MessageList from './message-list';
import MessageListDetail from './message-list-detail';
import MessageListUpdate from './message-list-update';
import MessageListDeleteDialog from './message-list-delete-dialog';

const MessageListRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MessageList />} />
    <Route path="new" element={<MessageListUpdate />} />
    <Route path=":id">
      <Route index element={<MessageListDetail />} />
      <Route path="edit" element={<MessageListUpdate />} />
      <Route path="delete" element={<MessageListDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MessageListRoutes;
