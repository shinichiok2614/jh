import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import { useDispatch } from 'react-redux';
import { deleteEntity } from './paragraph.reducer';

interface DeleteConfirmationButtonsProps {
  paragraphToDelete: string;
  postId: number;
  handleCloseModal: () => void;
}

const DeleteConfirmationButtons: React.FC<DeleteConfirmationButtonsProps> = ({ paragraphToDelete, postId, handleCloseModal }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button color="secondary" onClick={handleCloseModal}>
        <FontAwesomeIcon icon="ban" />
        &nbsp;
        <Translate contentKey="entity.action.cancel">Cancel</Translate>
      </Button>
      <Button
        id="jhi-confirm-delete-paragraph"
        data-cy="entityConfirmDeleteButton"
        color="danger"
        onClick={() => {
          if (paragraphToDelete) {
            // dispatch(deleteEntity({ id: paragraphToDelete, postId: parseInt(postId, 10) }));
            // dispatch(deleteEntity({ id: paragraphToDelete, postId: parseInt(id, 10) }));
          }
          handleCloseModal();
        }}
      >
        <FontAwesomeIcon icon="trash" />
        &nbsp;
        <Translate contentKey="entity.action.delete">Delete</Translate>
      </Button>
    </div>
  );
};

export default DeleteConfirmationButtons;
