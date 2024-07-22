import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './paragraph.reducer';

export const ParagraphDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paragraphEntity = useAppSelector(state => state.paragraph.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paragraphDetailsHeading">
          <Translate contentKey="jhSeaportApp.paragraph.detail.title">Paragraph</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhSeaportApp.paragraph.name">Name</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="jhSeaportApp.paragraph.description">Description</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.description}</dd>
          <dt>
            <span id="order">
              <Translate contentKey="jhSeaportApp.paragraph.order">Order</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.order}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="jhSeaportApp.paragraph.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {paragraphEntity.createdAt ? <TextFormat value={paragraphEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updateAt">
              <Translate contentKey="jhSeaportApp.paragraph.updateAt">Update At</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.updateAt ? <TextFormat value={paragraphEntity.updateAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.paragraph.post">Post</Translate>
          </dt>
          <dd>{paragraphEntity.post ? paragraphEntity.post.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/paragraph" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paragraph/${paragraphEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ParagraphDetail;
