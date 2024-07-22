import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { IPost } from 'app/shared/model/post.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';

const formatCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
export const PostUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categories = useAppSelector(state => state.category.entities);
  const people = useAppSelector(state => state.person.entities);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);
  const statusValues = Object.keys(Status);

  const currentUser = useAppSelector(state => state.authentication.account);
  const personList = useAppSelector(state => state.person.entities);
  const currentUserPerson = personList.find(person => person.user && person.user.id === currentUser.id);
  const currentUserPersonId = currentUserPerson ? currentUserPerson.id : null;

  const handleClose = () => {
    navigate('/post');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
    dispatch(getPeople({}));
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
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updateAt = convertDateTimeToServer(values.updateAt);
    if (values.view !== undefined && typeof values.view !== 'number') {
      values.view = Number(values.view);
    }

    const entity = {
      ...postEntity,
      ...values,
      category: categories.find(it => it.id.toString() === values.category?.toString()),
      person: people.find(it => it.id.toString() === values.person?.toString()),
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
          createdAt: formatCurrentDateTime(),
          updateAt: formatCurrentDateTime(),
        }
      : {
          status: 'PENDING',
          ...postEntity,
          createdAt: convertDateTimeFromServer(postEntity.createdAt),
          updateAt: convertDateTimeFromServer(postEntity.updateAt),
          category: postEntity?.category?.id,
          person: postEntity?.person?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhSeaportApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">
            <Translate contentKey="jhSeaportApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
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
                  id="post-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhSeaportApp.post.name')}
                id="post-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhSeaportApp.post.createdAt')}
                id="post-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('jhSeaportApp.post.updateAt')}
                id="post-updateAt"
                name="updateAt"
                data-cy="updateAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              {/* <ValidatedField label={translate('jhSeaportApp.post.status')} id="post-status" name="status" data-cy="status" type="select">
                
                {statusValues.map(status => (
                  <option value={status} key={status}>
                    {translate('jhSeaportApp.Status.' + status)}
                  </option>
                ))}
              </ValidatedField> */}
              <ValidatedField label={translate('jhSeaportApp.post.status')} id="post-status" name="status" data-cy="status" type="select">
                {statusValues
                  .filter(status => status !== 'SUCCESS')
                  .map(status => (
                    <option value={status} key={status}>
                      {translate('jhSeaportApp.Status.' + status)}
                    </option>
                  ))}
              </ValidatedField>
              {/* <ValidatedField label={translate('jhSeaportApp.post.view')} id="post-view" name="view" data-cy="view" type="text" /> */}
              <ValidatedField
                id="post-category"
                name="category"
                data-cy="category"
                label={translate('jhSeaportApp.post.category')}
                type="select"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              {/* <ValidatedField id="post-person" name="person" data-cy="person" label={translate('jhSeaportApp.post.person')} type="select">
                <option value="" key="0" />
                {people
                  ? people.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField> */}
              <ValidatedField id="post-person" name="person" data-cy="person" label={translate('jhSeaportApp.post.person')} type="select">
                <option value={currentUserPersonId} key={currentUserPersonId}>
                  {currentUserPerson ? currentUserPerson.name : ''}
                </option>
                {/* {people
                  ? people.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null} */}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/post" replace color="info">
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

export default PostUpdate;
