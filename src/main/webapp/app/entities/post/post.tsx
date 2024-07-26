import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getAllPost, getEntities, getEntitiesByPersonId } from './post.reducer';
import { getAccount } from 'app/shared/reducers/authentication';
import { getPersonByUserId } from 'app/entities/person/person.reducer'; // Thêm dòng này
import PostComponent from 'app/components/post/post';

export const Post = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));
  const [personId, setPersonId] = useState(null); // Thêm state để lưu personId của user

  const account = useAppSelector(state => state.authentication.account);
  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);
  const person = useAppSelector(state => state.person.entity);

  const getAllEntities = () => {
    if (account.authorities.includes('ROLE_ADMIN')) {
      dispatch(
        getEntities({
          sort: `${sortState.sort},${sortState.order}`,
        }),
      );
    } else if (personId) {
      // dispatch(
      //   getEntities({
      //     sort: `${sortState.sort},${sortState.order}`,
      //     // 'personId.equals': personId, // Thêm filter theo personId
      //   }),
      // );
      dispatch(getEntitiesByPersonId({ personId: person.id, sort: `${sortState.sort},${sortState.order}` }));
    }
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    dispatch(getAccount());
    dispatch(getAllPost());
  }, []);

  useEffect(() => {
    if (account.id && !account.authorities.includes('ROLE_ADMIN')) {
      dispatch(getPersonByUserId(account.id));
    }
  }, [account]);

  useEffect(() => {
    if (person && person.id) {
      setPersonId(person.id);
    }
  }, [person]);

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort, personId]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="post-heading" data-cy="PostHeading">
        <Translate contentKey="jhSeaportApp.post.home.title">Posts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="jhSeaportApp.post.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhSeaportApp.post.home.createLabel">Create new Post</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {postList && postList.length > 0 ? (
          <Table responsive>
            {/* <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="jhSeaportApp.post.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="jhSeaportApp.post.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="jhSeaportApp.post.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
                <th className="hand" onClick={sort('updateAt')}>
                  <Translate contentKey="jhSeaportApp.post.updateAt">Update At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('updateAt')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="jhSeaportApp.post.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('view')}>
                  <Translate contentKey="jhSeaportApp.post.view">View</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('view')} />
                </th>
                <th>
                  <Translate contentKey="jhSeaportApp.post.category">Category</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {account.authorities.includes('ROLE_ADMIN') && (
                  <th>
                    <Translate contentKey="jhSeaportApp.post.person">Person</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                )}
                <th />
              </tr>
            </thead>
            <tbody> */}
            {postList.map((post, i) => (
              <PostComponent
                key={`entity-${i}`}
                id={post.id}
                name={post.name}
                createdAt={post.createdAt}
                updateAt={post.updateAt}
                status={post.status}
                view={post.view}
                category={post.category}
                person={post.person}
              />
            ))}
            {/* </tbody> */}
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhSeaportApp.post.home.notFound">No Posts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Post;
