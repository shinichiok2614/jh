import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './image.reducer';

export const ImageDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const imageEntity = useAppSelector(state => state.image.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="imageDetailsHeading">
          <Translate contentKey="jhSeaportApp.image.detail.title">Image</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{imageEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="jhSeaportApp.image.name">Name</Translate>
            </span>
          </dt>
          <dd>{imageEntity.name}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="jhSeaportApp.image.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {imageEntity.image ? (
              <div>
                {imageEntity.imageContentType ? (
                  <a onClick={openFile(imageEntity.imageContentType, imageEntity.image)}>
                    <img src={`data:${imageEntity.imageContentType};base64,${imageEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {imageEntity.imageContentType}, {byteSize(imageEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="height">
              <Translate contentKey="jhSeaportApp.image.height">Height</Translate>
            </span>
          </dt>
          <dd>{imageEntity.height}</dd>
          <dt>
            <span id="width">
              <Translate contentKey="jhSeaportApp.image.width">Width</Translate>
            </span>
          </dt>
          <dd>{imageEntity.width}</dd>
          <dt>
            <span id="taken">
              <Translate contentKey="jhSeaportApp.image.taken">Taken</Translate>
            </span>
          </dt>
          <dd>{imageEntity.taken ? <TextFormat value={imageEntity.taken} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="uploaded">
              <Translate contentKey="jhSeaportApp.image.uploaded">Uploaded</Translate>
            </span>
          </dt>
          <dd>{imageEntity.uploaded ? <TextFormat value={imageEntity.uploaded} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.image.person">Person</Translate>
          </dt>
          <dd>{imageEntity.person ? imageEntity.person.id : ''}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.image.album">Album</Translate>
          </dt>
          <dd>{imageEntity.album ? imageEntity.album.name : ''}</dd>
          <dt>
            <Translate contentKey="jhSeaportApp.image.paragraph">Paragraph</Translate>
          </dt>
          <dd>{imageEntity.paragraph ? imageEntity.paragraph.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/image" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/image/${imageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ImageDetail;
