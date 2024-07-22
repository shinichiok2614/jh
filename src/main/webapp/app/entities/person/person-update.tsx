import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeToServer, convertDateTimeFromServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';

// Hàm chuyển đổi thời gian hiện tại sang định dạng YYYY-MM-DDTHH:MM
const formatCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const PersonUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  // Lấy danh sách người dùng và phòng ban từ Redux state
  const users = useAppSelector(state => state.userManagement.users);
  const departments = useAppSelector(state => state.department.entities);
  const personEntity = useAppSelector(state => state.person.entity);
  const loading = useAppSelector(state => state.person.loading);
  const updating = useAppSelector(state => state.person.updating);
  const updateSuccess = useAppSelector(state => state.person.updateSuccess);

  // Lấy thông tin tài khoản người dùng từ trạng thái xác thực
  const currentUser = useAppSelector(state => state.authentication.account);

  const handleClose = () => {
    navigate('/person' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getDepartments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess && personEntity.id) {
      navigate(`/person/${personEntity.id}`);
    }
  }, [updateSuccess, personEntity.id]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updateAt = convertDateTimeToServer(values.updateAt);
    values.dateOfBirth = convertDateTimeToServer(values.dateOfBirth);

    const entity = {
      ...personEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
      department: departments.find(it => it.id.toString() === values.department?.toString()),
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
          createdAt: formatCurrentDateTime(), // Đặt giá trị hiện tại cho createdAt
          updateAt: formatCurrentDateTime(),
          dateOfBirth: formatCurrentDateTime(),
          user: currentUser.id, // Đặt giá trị mặc định cho ID người dùng ở đây
        }
      : {
          ...personEntity,
          createdAt: convertDateTimeFromServer(personEntity.createdAt),
          updateAt: convertDateTimeFromServer(personEntity.updateAt),
          dateOfBirth: convertDateTimeFromServer(personEntity.dateOfBirth),
          user: personEntity?.user?.id,
          department: personEntity?.department?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhSeaportApp.person.home.createOrEditLabel" data-cy="PersonCreateUpdateHeading">
            <Translate contentKey="jhSeaportApp.person.home.createOrEditLabel">Tạo mới hoặc chỉnh sửa người dùng</Translate>
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
                  id="person-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhSeaportApp.person.name')}
                id="person-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhSeaportApp.person.phone')}
                id="person-phone"
                name="phone"
                data-cy="phone"
                type="text"
                validate={{
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                  maxLength: { value: 10, message: translate('entity.validation.maxlength', { max: 10 }) },
                }}
              />
              <ValidatedField
                label={translate('jhSeaportApp.person.address')}
                id="person-address"
                name="address"
                data-cy="address"
                type="text"
              />
              <ValidatedField
                label={translate('jhSeaportApp.person.createdAt')}
                id="person-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('jhSeaportApp.person.updateAt')}
                id="person-updateAt"
                name="updateAt"
                data-cy="updateAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('jhSeaportApp.person.dateOfBirth')}
                id="person-dateOfBirth"
                name="dateOfBirth"
                data-cy="dateOfBirth"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField id="person-user" name="user" data-cy="user" label={translate('jhSeaportApp.person.user')} type="select">
                <option value={currentUser.id} key={currentUser.id}>
                  {currentUser.id}
                </option>
              </ValidatedField>
              <ValidatedField
                id="person-department"
                name="department"
                data-cy="department"
                label={translate('jhSeaportApp.person.department')}
                type="select"
              >
                <option value="" key="0" />
                {departments
                  ? departments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/person" replace color="info">
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

export default PersonUpdate;
