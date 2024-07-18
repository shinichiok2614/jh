import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Card, CardBody, CardText, Table, Media } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity as getPost } from './post.reducer';
import { getEntities as getParagraphs } from 'app/entities/paragraph/paragraph.reducer';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { getEntities as getCommentLists } from 'app/entities/comment-list/comment-list.reducer';
import { getEntities as getComments } from 'app/entities/comment/comment.reducer';
import { getEntities as getPersons } from 'app/entities/person/person.reducer';

import './post-detail.css';

export const PostDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getParagraphs({}));
    dispatch(getImages({}));
    dispatch(getCommentLists({}));
    dispatch(getComments({}));
    dispatch(getPersons({}));
  }, [dispatch, id]);

  const postEntity = useAppSelector(state => state.post.entity);
  const paragraphList = useAppSelector(state => state.paragraph.entities);
  const imageList = useAppSelector(state => state.image.entities);
  const commentListList = useAppSelector(state => state.commentList.entities);
  const commentList = useAppSelector(state => state.comment.entities);
  const personList = useAppSelector(state => state.person.entities);

  const getParagraphsByPost = postId => {
    return paragraphList.filter(paragraph => paragraph.post && paragraph.post.id === postId);
  };

  const getImagesByParagraph = paragraphId => {
    return imageList.filter(image => image.paragraph && image.paragraph.id === paragraphId);
  };

  const getCommentListsByPost = postId => {
    return commentListList.filter(cl => cl.post && cl.post.id === postId);
  };

  const getCommentsByCommentList = commentListId => {
    return commentList.filter(comment => comment.commentlist && comment.commentlist.id === commentListId);
  };

  const getPersonName = personId => {
    const person = personList.find(p => p.id === personId);
    return person ? person.name : '';
  };

  const getPersonImage = personId => {
    const personImage = imageList.find(image => image.person && image.person.id === personId);
    return personImage ? `data:${personImage.imageContentType};base64,${personImage.image}` : '';
  };

  return (
    <Row>
      <Col md="8" className="mx-auto">
        <Card className="post-card">
          <CardBody>
            <CardText className="post-title">{postEntity.name}</CardText>
            <div className="post-status-view">
              <CardText className="post-status">{postEntity.status}</CardText>
              <span id="view" className="post-view">
                <Translate contentKey="jhSeaportApp.post.view">View</Translate>
              </span>
              <CardText className="post-view">{postEntity.view}</CardText>
            </div>
            <Media className="post-author">
              <Media left>
                {postEntity.person && (
                  <img src={getPersonImage(postEntity.person.id)} alt={postEntity.person.name} className="rounded-circle" />
                )}
              </Media>
              <Media body className="post-author-info">
                <h5 className="post-author-name">{postEntity.person ? postEntity.person.name : ''}</h5>
                <p className="post-author-date">
                  {postEntity.createdAt ? <TextFormat value={postEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
                </p>
              </Media>
            </Media>
            {getParagraphsByPost(postEntity.id).map((paragraph, index) => (
              <div key={`paragraph-${index}`} className="mb-3">
                <CardText className="paragraph-description">{paragraph.description}</CardText>
                {getImagesByParagraph(paragraph.id).length > 0 && (
                  <div className="paragraph-image-container">
                    {getImagesByParagraph(paragraph.id).map((image, imgIndex) => (
                      <img
                        key={`image-${imgIndex}`}
                        src={`data:${image.imageContentType};base64,${image.image}`}
                        alt={image.name}
                        className="paragraph-image"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
        <Card className="comment-card">
          <CardBody>
            <h5>
              <Translate contentKey="jhSeaportApp.commentList.home.title">Comment</Translate>
            </h5>
            {getCommentListsByPost(postEntity.id).map((commentList, clIndex) => (
              <div key={`commentList-${clIndex}`}>
                <Table responsive>
                  <tbody>
                    {getCommentsByCommentList(commentList.id).map((comment, cIndex) => (
                      <tr key={`comment-${cIndex}`}>
                        <td>
                          <Media className="comment-author">
                            <Media left>
                              {comment.person && (
                                <img
                                  src={getPersonImage(comment.person.id)}
                                  alt={getPersonName(comment.person.id)}
                                  className="rounded-circle"
                                />
                              )}
                            </Media>
                            <Media body>
                              <h6 className="comment-author-name">{comment.person ? getPersonName(comment.person.id) : ''}</h6>
                              <p className="comment-author-date">
                                {comment.createdAt ? <TextFormat value={comment.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
                              </p>
                              <CardText className="comment-description">{comment.description}</CardText>
                            </Media>
                          </Media>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))}
          </CardBody>
        </Card>
        <Button tag={Link} to="/post" replace color="info" data-cy="entityDetailsBackButton" className="back-button">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/post/${postEntity.id}/edit`} replace color="primary" className="edit-button">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PostDetail;
