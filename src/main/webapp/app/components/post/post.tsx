// // src/main/webapp/app/entities/post/Post.tsx
// import React from 'react';
// import './post.css';

// interface PostProps {
//   name: string;
//   createdAt: string;
//   updateAt: string;
//   status: string;
//   view: number;
//   category?: string;
//   person?: string;
// }

// const Post: React.FC<PostProps> = ({ name, createdAt, updateAt, status, view, category, person }) => {
//   function getStatusClass(status: string) {
//     switch (status) {
//       case 'PENDING':
//         return 'status-pending';
//       case 'SUCCESS':
//         return 'status-success';
//       case 'CANCELLED':
//         return 'status-cancelled';
//       default:
//         return '';
//     }
//   }

//   return (
//     <div className={`post-card ${getStatusClass(status)}`}>
//       <h2 className="post-title">{name}</h2>
//       <div className="post-details">
//         <div className="post-info">
//           <label>Created At:</label>
//           <span>{new Date(createdAt).toLocaleString()}</span>
//         </div>
//         <div className="post-info">
//           <label>Updated At:</label>
//           <span>{new Date(updateAt).toLocaleString()}</span>
//         </div>
//         <div className="post-info">
//           <label>Status:</label>
//           <span>{status}</span>
//         </div>
//         <div className="post-info">
//           <label>View:</label>
//           <span>{view}</span>
//         </div>
//         {category && (
//           <div className="post-info">
//             <label>Category:</label>
//             <span>{category}</span>
//           </div>
//         )}
//         {person && (
//           <div className="post-info">
//             <label>Person:</label>
//             <span>{person}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Post;
// src/main/webapp/app/entities/post/post.tsx

import React from 'react';
import './post.css';
import { Button } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PostProps {
  id: number;
  name: string;
  createdAt: string;
  updateAt: string;
  status: string;
  view: number;
  category?: { id: number; name: string };
  person?: { id: number; name: string };
}

const PostComponent: React.FC<PostProps> = ({ id, name, createdAt, updateAt, status, view, category, person }) => {
  // Tạo một hàm để trả về lớp CSS tương ứng với trạng thái
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'SUCCESS':
        return 'status-success';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <tr className={`post-card ${getStatusClass(status)}`}>
      <div className="post-header">
        <div className="post-avatar"></div>
        <div className="post-info">
          <h5>{person ? person.name : 'Unknown User'}</h5>
          <p className="post-dates">
            {createdAt ? <TextFormat type="date" value={createdAt} format={APP_DATE_FORMAT} /> : null}
            {' - '}
            {updateAt ? <TextFormat type="date" value={updateAt} format={APP_DATE_FORMAT} /> : null}
          </p>
        </div>
      </div>
      <td>{category ? <Link to={`/category/${category.id}`}>{category.name}</Link> : ''}</td>
      <div className="post-content">{name}</div>
      <p className="post-dates">
        <td>{view}</td>
        <td>
          <Translate contentKey={`jhSeaportApp.Status.${status}`} />
        </td>
      </p>
      <td className="text-end">
        <div className="btn-group flex-btn-group-container">
          <Button tag={Link} to={`/paragraph/${id}/postId`} color="success" size="sm" data-cy="entityDetailsButton">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.approve">Create Content</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/paragraph/${id}/postId`} color="secondary" size="sm" data-cy="entityDetailsButton">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.cancel">Create Content</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/paragraph/${id}/postId`} color="primary" size="sm" data-cy="entityDetailsButton">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.createContent">Create Content</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/post/${id}`} color="info" size="sm" data-cy="entityDetailsButton">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.view">View</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/post/${id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          <Button onClick={() => (window.location.href = `/post/${id}/delete`)} color="danger" size="sm" data-cy="entityDeleteButton">
            <FontAwesomeIcon icon="trash" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PostComponent;
