import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSort } from '@fortawesome/free-solid-svg-icons'; // Import camera icon
import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity as getPerson } from './person.reducer';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { getEntities as getParagraphs } from 'app/entities/paragraph/paragraph.reducer';
import { faPhone, faAddressCard, faBuilding, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow, parseISO } from 'date-fns';
import './person-detail.css';

const DefaultAvatar = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="default-avatar">
    <circle cx="50" cy="50" r="50" fill="gray" />
    <text x="50" y="55" textAnchor="middle" fontSize="24" fill="white">
      ?
    </text>
  </svg>
);

const PersonDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    dispatch(getPerson(id));
    dispatch(getImages({}));
    dispatch(getPosts({}));
    dispatch(getParagraphs({}));
  }, [dispatch, id]);

  const personEntity = useAppSelector(state => state.person.entity);
  const imageList = useAppSelector(state => state.image.entities);
  const postList = useAppSelector(state => state.post.entities);
  const paragraphList = useAppSelector(state => state.paragraph.entities);

  const getPersonImage = (personId: number) => {
    const personImage = imageList.find(image => image.person && image.person.id === personId);
    return personImage ? `data:${personImage.imageContentType};base64,${personImage.image}` : '';
  };

  const personPosts = postList.filter(post => post.person && post.person.id === personEntity.id);

  const getParagraphsByPost = (postId: number) => {
    return paragraphList.filter(paragraph => paragraph.post && paragraph.post.id === postId);
  };

  const getPostExcerpt = (post: any) => {
    const paragraphs = getParagraphsByPost(post.id);
    const fullText = paragraphs.map(paragraph => paragraph.description).join(' ');
    const lines = fullText.split('\n');
    if (lines.length > 3) {
      return lines.slice(0, 3).join(' ') + '...';
    }
    return fullText;
  };

  const getImagesByParagraph = (paragraphId: number) => {
    return imageList.filter(image => image.paragraph && image.paragraph.id === paragraphId);
  };
  interface Post {
    id: number;
    name: string;
    createdAt: string; // or Date if previously converted
    person?: { id: number };
  }
  const sortedPersonPosts = [...personPosts].sort((a: Post, b: Post) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    if (sortAscending) {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  const now = new Date(); // Lấy ngày hiện tại
  const joinedTime = personEntity.dateOfBirth ? formatDistanceToNow(parseISO(personEntity.dateOfBirth), { addSuffix: true }) : '';

  return (
    <Row className="justify-content-center">
      <Col md="12" className="text-center">
        <Card className="profile-card">
          <CardBody className="d-flex align-items-center">
            {personEntity.id && (
              <div className="position-relative">
                {/* <img src={getPersonImage(personEntity.id)} alt={personEntity.name} className="rounded-circle profile-avatar mr-3" /> */}
                {getPersonImage(personEntity.id) ? (
                  <img src={getPersonImage(personEntity.id)} alt={personEntity.name} className="rounded-circle profile-avatar mr-3" />
                ) : (
                  <div className="default-avatar">
                    <DefaultAvatar />
                  </div>
                )}
                <FontAwesomeIcon icon={faCamera} className="camera-icon" />
              </div>
            )}
            <div className="profile-info-container d-flex flex-column w-100">
              <h3 className="profile-name">{personEntity.name}</h3>
              <p className="profile-info">
                <Translate contentKey="jhSeaportApp.person.createdAt">Created At</Translate>:{' '}
                {personEntity.createdAt ? <TextFormat value={personEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
              </p>
              <p className="profile-info">
                <Translate contentKey="jhSeaportApp.person.postCount">Post Count</Translate>: {personPosts.length}
              </p>
              <div className="profile-actions">
                <Button tag={Link} to={`/post/new`} color="primary" className="mr-2">
                  <FontAwesomeIcon icon="plus" /> <Translate contentKey="jhSeaportApp.person.createPost">Create Post</Translate>
                </Button>
                <Button tag={Link} to={`/person/${personEntity.id}/edit`} color="secondary">
                  <FontAwesomeIcon icon="pencil-alt" /> <Translate contentKey="jhSeaportApp.person.editProfile">Edit Profile</Translate>
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col md="4" className="justify-content-center profile-detail-col">
        <Card className="profile-detail-card">
          <CardHeader className="profile-detail-title">
            <Translate contentKey="jhSeaportApp.person.detail.title">Person Details</Translate>
          </CardHeader>
          <CardBody>
            <dl className="jh-entity-details">
              <div className="detail-item">
                <FontAwesomeIcon icon={faPhone} className="profile-icon" /> {/* Icon Phone */}
                <dd>{personEntity.phone}</dd>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faAddressCard} className="profile-icon" /> {/* Icon Address */}
                <dd>{personEntity.address}</dd>
              </div>
              <div className="detail-item">
                <FontAwesomeIcon icon={faBuilding} className="profile-icon" /> {/* Icon Department */}
                <dd>{personEntity.department ? personEntity.department.name : ''}</dd>
              </div>
              {/* <div className="detail-item">
                <FontAwesomeIcon icon={faBirthdayCake} className="profile-icon" /> 
                <dd>
                  {personEntity.dateOfBirth ? <TextFormat value={personEntity.dateOfBirth} type="date" format={APP_DATE_FORMAT} /> : null}
                </dd>
              </div> */}
              <div className="detail-item">
                <FontAwesomeIcon icon={faBirthdayCake} className="profile-icon" /> {/* Icon Date Of Birth */}
                <dd>{joinedTime}</dd>
              </div>
            </dl>
          </CardBody>
        </Card>
      </Col>
      <Col md="8" className="posts">
        <Card className="mb-3 profile-post-card">
          <CardBody className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 profile-detail-title">
              <Translate contentKey="jhSeaportApp.person.posts.title">Posts</Translate>
            </h5>
            <Button color="secondary" onClick={() => setSortAscending(!sortAscending)} className="sort-button">
              <FontAwesomeIcon icon={faSort} /> {sortAscending ? 'Sort Descending' : 'Sort Ascending'}
            </Button>
          </CardBody>
        </Card>
        {sortedPersonPosts.length > 0 ? (
          sortedPersonPosts.map(post => (
            <Card className="profile-post-card" key={post.id}>
              <CardBody className="profile-post-body">
                <div className="post-header">
                  <div className="post-avatar">
                    <img src={getPersonImage(personEntity.id)} alt={personEntity.name} className="rounded-circle post-avatar-img" />
                  </div>
                  <div className="post-info">
                    <h5 className="post-title">
                      <Link to={`/post/${post.id}`} className={'custom-link'}>
                        {post.name}
                      </Link>
                    </h5>
                    <p className="post-author-date">
                      {personEntity.name} |{' '}
                      {post.createdAt ? <TextFormat value={post.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
                    </p>
                  </div>
                </div>
                <div className="post-content">
                  <div>{getPostExcerpt(post)}</div>
                  {getParagraphsByPost(post.id).map(paragraph =>
                    getImagesByParagraph(paragraph.id).map(image => (
                      <img
                        key={image.id}
                        src={`data:${image.imageContentType};base64,${image.image}`}
                        alt={image.name}
                        className="paragraph-image"
                      />
                    )),
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div>
            <Translate contentKey="jhSeaportApp.person.posts.none">No posts found</Translate>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default PersonDetail;
