import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './message-list.reducer';

export const MessageListDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const messageListEntity = useAppSelector(state => state.messageList.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="messageListDetailsHeading">
          <Translate contentKey="jhSeaportApp.messageList.detail.title">MessageList</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{messageListEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhSeaportApp.messageList.name">Name</Translate>
            </span>
          </dt>
          <dd>{messageListEntity.name}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="jhSeaportApp.messageList.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {messageListEntity.createdAt ? <TextFormat value={messageListEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="jhSeaportApp.messageList.author">Author</Translate>
          </dt>
          <dd>{messageListEntity.author ? messageListEntity.author.name : ''}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.messageList.receiver">Receiver</Translate>
          </dt>
          <dd>{messageListEntity.receiver ? messageListEntity.receiver.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/message-list" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/message-list/${messageListEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MessageListDetail;
