import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, getEntitiesByParagraphId, reset } from './image.reducer';

export const Image = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const imageList = useAppSelector(state => state.image.entities);
  const loading = useAppSelector(state => state.image.loading);
  const links = useAppSelector(state => state.image.links);
  const updateSuccess = useAppSelector(state => state.image.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };
  const getAllEntitiesByParagraphId = () => {
    dispatch(
      getEntitiesByParagraphId({
        id: 1,
      }),
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
    // getAllEntitiesByParagraphId();
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="image-heading" data-cy="ImageHeading">
        <Translate contentKey="jhSeaportApp.image.home.title">Images</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="jhSeaportApp.image.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/image/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhSeaportApp.image.home.createLabel">Create new Image</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={imageList ? imageList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {imageList && imageList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="jhSeaportApp.image.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('name')}>
                    <Translate contentKey="jhSeaportApp.image.name">Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                  </th>
                  <th className="hand" onClick={sort('image')}>
                    <Translate contentKey="jhSeaportApp.image.image">Image</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('image')} />
                  </th>
                  <th className="hand" onClick={sort('height')}>
                    <Translate contentKey="jhSeaportApp.image.height">Height</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('height')} />
                  </th>
                  <th className="hand" onClick={sort('width')}>
                    <Translate contentKey="jhSeaportApp.image.width">Width</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('width')} />
                  </th>
                  <th className="hand" onClick={sort('taken')}>
                    <Translate contentKey="jhSeaportApp.image.taken">Taken</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('taken')} />
                  </th>
                  <th className="hand" onClick={sort('uploaded')}>
                    <Translate contentKey="jhSeaportApp.image.uploaded">Uploaded</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('uploaded')} />
                  </th>
                  <th>
                    <Translate contentKey="jhSeaportApp.image.person">Person</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="jhSeaportApp.image.album">Album</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="jhSeaportApp.image.paragraph">Paragraph</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {imageList.map((image, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/image/${image.id}`} color="link" size="sm">
                        {image.id}
                      </Button>
                    </td>
                    <td>{image.name}</td>
                    <td>
                      {image.image ? (
                        <div>
                          {image.imageContentType ? (
                            <a onClick={openFile(image.imageContentType, image.image)}>
                              <img src={`data:${image.imageContentType};base64,${image.image}`} style={{ maxHeight: '30px' }} />
                              &nbsp;
                            </a>
                          ) : null}
                          <span>
                            {image.imageContentType}, {byteSize(image.image)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{image.height}</td>
                    <td>{image.width}</td>
                    <td>{image.taken ? <TextFormat type="date" value={image.taken} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{image.uploaded ? <TextFormat type="date" value={image.uploaded} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{image.person ? <Link to={`/person/${image.person.id}`}>{image.person.id}</Link> : ''}</td>
                    <td>{image.album ? <Link to={`/album/${image.album.id}`}>{image.album.name}</Link> : ''}</td>
                    <td>{image.paragraph ? <Link to={`/paragraph/${image.paragraph.id}`}>{image.paragraph.name}</Link> : ''}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/image/${image.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`/image/${image.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          onClick={() => (window.location.href = `/image/${image.id}/delete`)}
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="jhSeaportApp.image.home.notFound">No Images found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Image;
