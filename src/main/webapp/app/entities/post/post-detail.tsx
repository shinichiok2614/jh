import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './post.reducer';

export const PostDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const postEntity = useAppSelector(state => state.post.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="postDetailsHeading">
          <Translate contentKey="jhSeaportApp.post.detail.title">Post</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{postEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhSeaportApp.post.name">Name</Translate>
            </span>
          </dt>
          <dd>{postEntity.name}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="jhSeaportApp.post.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{postEntity.createdAt ? <TextFormat value={postEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updateAt">
              <Translate contentKey="jhSeaportApp.post.updateAt">Update At</Translate>
            </span>
          </dt>
          <dd>{postEntity.updateAt ? <TextFormat value={postEntity.updateAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="jhSeaportApp.post.status">Status</Translate>
            </span>
          </dt>
          <dd>{postEntity.status}</dd>
          <dt>
            <span id="view">
              <Translate contentKey="jhSeaportApp.post.view">View</Translate>
            </span>
          </dt>
          <dd>{postEntity.view}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.post.category">Category</Translate>
          </dt>
          <dd>{postEntity.category ? postEntity.category.name : ''}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.post.person">Person</Translate>
          </dt>
          <dd>{postEntity.person ? postEntity.person.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/post" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/post/${postEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PostDetail;
