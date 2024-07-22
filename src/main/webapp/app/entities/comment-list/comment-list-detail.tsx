import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './comment-list.reducer';

export const CommentListDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const commentListEntity = useAppSelector(state => state.commentList.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commentListDetailsHeading">
          <Translate contentKey="jhSeaportApp.commentList.detail.title">CommentList</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{commentListEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhSeaportApp.commentList.name">Name</Translate>
            </span>
          </dt>
          <dd>{commentListEntity.name}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="jhSeaportApp.commentList.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {commentListEntity.createdAt ? <TextFormat value={commentListEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="jhSeaportApp.commentList.post">Post</Translate>
          </dt>
          <dd>{commentListEntity.post ? commentListEntity.post.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comment-list" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comment-list/${commentListEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommentListDetail;
