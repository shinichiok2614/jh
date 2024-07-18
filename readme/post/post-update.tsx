import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeToServer, convertDateTimeFromServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { ICategory } from 'app/shared/model/category.model';

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

  // Redux state selectors
  const categories = useAppSelector(state => state.category.entities);
  const people = useAppSelector(state => state.person.entities);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);

  // Fetch current user and associated person
  const currentUser = useAppSelector(state => state.authentication.account);
  const personList = useAppSelector(state => state.person.entities);
  const currentUserPerson = personList.find(person => person.user && person.user.id === currentUser.id);

  // Close button handler
  const handleClose = () => {
    navigate('/post' + location.search);
  };

  // Effect to fetch categories, people, and optionally fetch post entity
  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
    dispatch(getPeople({}));
  }, []);

  // Effect to handle update success
  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // Save entity handler
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    // Convert dates to server format
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updateAt = convertDateTimeToServer(values.updateAt);

    // Set status to 'PENDING' and readonly
    values.status = 'PENDING';

    // Find corresponding category and person entities
    const entity = {
      ...postEntity,
      ...values,
      category: categories.find(it => it.id.toString() === values.category?.toString()),
      person: currentUserPerson ? currentUserPerson.id : null, // Use currentUserPerson's id if available
    };

    // Dispatch create or update action based on isNew
    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  // Default values function
  const defaultValues = () =>
    isNew
      ? {
          createdAt: formatCurrentDateTime(),
          updateAt: formatCurrentDateTime(),
          status: 'PENDING', // Default status
        }
      : {
          ...postEntity,
          createdAt: convertDateTimeFromServer(postEntity.createdAt),
          updateAt: convertDateTimeFromServer(postEntity.updateAt),
          status: 'PENDING', // Default status
          category: postEntity?.category?.id,
          person: currentUserPerson ? currentUserPerson.id : null, // Use currentUserPerson's id if available
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhSeaportApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">
            <Translate contentKey="jhSeaportApp.post.home.createOrEditLabel">Tạo mới hoặc chỉnh sửa bài đăng</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Đang tải...</p>
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
              <ValidatedField
                label={translate('jhSeaportApp.post.status')}
                id="post-status"
                name="status"
                data-cy="status"
                type="text"
                readOnly
              />
              <ValidatedField label={translate('jhSeaportApp.post.view')} id="post-view" name="view" data-cy="view" type="text" />
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
              <ValidatedField
                id="post-person"
                name="person"
                data-cy="person"
                label={translate('jhSeaportApp.post.person')}
                type="select"
                readOnly
              >
                {/* <option value="" key="0" /> */}
                {currentUserPerson ? (
                  <option value={currentUserPerson.id} key={currentUserPerson.id}>
                    {currentUserPerson.name}
                  </option>
                ) : null}
              </ValidatedField>
              {/* <ValidatedField
                id="post-person"
                name="user"
                data-cy="user"
                label={translate('jhSeaportApp.post.person')}
                readOnly // Set to readOnly
              >
                <option value={currentUserPerson?.user?.id} key={currentUserPerson?.user?.id}>
                  {currentUserPerson?.name}
                </option>
              </ValidatedField> */}
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/post" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Quay lại</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Lưu lại</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PostUpdate;
