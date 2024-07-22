import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './album.reducer';

export const AlbumDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const albumEntity = useAppSelector(state => state.album.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="albumDetailsHeading">
          <Translate contentKey="jhSeaportApp.album.detail.title">Album</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{albumEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhSeaportApp.album.name">Name</Translate>
            </span>
          </dt>
          <dd>{albumEntity.name}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="jhSeaportApp.album.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{albumEntity.createdAt ? <TextFormat value={albumEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.album.post">Post</Translate>
          </dt>
          <dd>{albumEntity.post ? albumEntity.post.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/album" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/album/${albumEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AlbumDetail;
