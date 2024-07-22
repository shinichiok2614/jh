import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IAlbum } from 'app/shared/model/album.model';
import { getEntities as getAlbums } from 'app/entities/album/album.reducer';
import { IParagraph } from 'app/shared/model/paragraph.model';
import { getEntities as getParagraphs } from 'app/entities/paragraph/paragraph.reducer';
import { IImage } from 'app/shared/model/image.model';
import { getEntity, updateEntity, createEntity, reset } from './image.reducer';

export const ImageUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const people = useAppSelector(state => state.person.entities);
  const albums = useAppSelector(state => state.album.entities);
  const paragraphs = useAppSelector(state => state.paragraph.entities);
  const imageEntity = useAppSelector(state => state.image.entity);
  const loading = useAppSelector(state => state.image.loading);
  const updating = useAppSelector(state => state.image.updating);
  const updateSuccess = useAppSelector(state => state.image.updateSuccess);

  const handleClose = () => {
    navigate('/image');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getPeople({}));
    dispatch(getAlbums({}));
    dispatch(getParagraphs({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.height !== undefined && typeof values.height !== 'number') {
      values.height = Number(values.height);
    }
    if (values.width !== undefined && typeof values.width !== 'number') {
      values.width = Number(values.width);
    }
    values.taken = convertDateTimeToServer(values.taken);
    values.uploaded = convertDateTimeToServer(values.uploaded);

    const entity = {
      ...imageEntity,
      ...values,
      person: people.find(it => it.id.toString() === values.person?.toString()),
      album: albums.find(it => it.id.toString() === values.album?.toString()),
      paragraph: paragraphs.find(it => it.id.toString() === values.paragraph?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          taken: displayDefaultDateTime(),
          uploaded: displayDefaultDateTime(),
        }
      : {
          ...imageEntity,
          taken: convertDateTimeFromServer(imageEntity.taken),
          uploaded: convertDateTimeFromServer(imageEntity.uploaded),
          person: imageEntity?.person?.id,
          album: imageEntity?.album?.id,
          paragraph: imageEntity?.paragraph?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhSeaportApp.image.home.createOrEditLabel" data-cy="ImageCreateUpdateHeading">
            <Translate contentKey="jhSeaportApp.image.home.createOrEditLabel">Create or edit a Image</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="image-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhSeaportApp.image.name')}
                id="image-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedBlobField
                label={translate('jhSeaportApp.image.image')}
                id="image-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField label={translate('jhSeaportApp.image.height')} id="image-height" name="height" data-cy="height" type="text" />
              <ValidatedField label={translate('jhSeaportApp.image.width')} id="image-width" name="width" data-cy="width" type="text" />
              <ValidatedField
                label={translate('jhSeaportApp.image.taken')}
                id="image-taken"
                name="taken"
                data-cy="taken"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('jhSeaportApp.image.uploaded')}
                id="image-uploaded"
                name="uploaded"
                data-cy="uploaded"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField id="image-person" name="person" data-cy="person" label={translate('jhSeaportApp.image.person')} type="select">
                <option value="" key="0" />
                {people
                  ? people.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="image-album" name="album" data-cy="album" label={translate('jhSeaportApp.image.album')} type="select">
                <option value="" key="0" />
                {albums
                  ? albums.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="image-paragraph"
                name="paragraph"
                data-cy="paragraph"
                label={translate('jhSeaportApp.image.paragraph')}
                type="select"
              >
                <option value="" key="0" />
                {paragraphs
                  ? paragraphs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/image" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ImageUpdate;
