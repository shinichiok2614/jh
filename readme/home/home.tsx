import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { getEntities as getAlbums } from 'app/entities/album/album.reducer';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
// import Slider from 'react-slick';
import './home.scss';

export const Home = () => {
  const dispatch = useAppDispatch();

  const categoryList = useAppSelector(state => state.category.entities);
  const postList = useAppSelector(state => state.post.entities);
  const albumList = useAppSelector(state => state.album.entities);
  const imageList = useAppSelector(state => state.image.entities);
  const loadingCategories = useAppSelector(state => state.category.loading);
  const loadingPosts = useAppSelector(state => state.post.loading);
  const loadingAlbums = useAppSelector(state => state.album.loading);
  const loadingImages = useAppSelector(state => state.image.loading);

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getPosts({}));
    dispatch(getAlbums({}));
    dispatch(getImages({}));
  }, [dispatch]);

  const getPostsByCategory = categoryId => {
    return postList.filter(post => post.category && post.category.id === categoryId);
  };

  const getAlbumForPost = postId => {
    return albumList.find(album => album.post && album.post.id === postId);
  };

  const getAlbumsByPost = postId => {
    return albumList.filter(album => album.post && album.post.id === postId);
  };

  const getImageForAlbum = albumId => {
    return imageList.find(image => image.album && image.album.id === albumId);
  };

  const getImagesByAlbum = albumId => {
    return imageList.filter(image => image.album && image.album.id === albumId);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  const scrollToCategory = categoryId => {
    document.getElementById(`category-${categoryId}`).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <h2 id="home-heading">
        <Translate contentKey="home.title">Categories and Posts</Translate>
      </h2>
      {loadingCategories || loadingPosts || loadingAlbums ? (
        <p>Loading...</p>
      ) : (
        <div className="accordion" id="accordionExample">
          <div className="category-row">
            {categoryList.map(
              category =>
                category && (
                  <button key={`nav-cat-${category.id}`} onClick={() => scrollToCategory(category.id)}>
                    {category.name}
                  </button>
                ),
            )}
          </div>
          <div className="content">
            <div className="main-content">
              <div className="categories">
                {categoryList.slice(0, 1).map(
                  category =>
                    category && (
                      <div className="card" key={`category-${category.id}`} id={`category-${category.id}`}>
                        <div className="card-header" id={`heading-${category.id}`}>
                          <h5 className="mb-0">
                            <button className="btn btn-link" type="button" aria-controls={`collapse-${category.id}`}>
                              {category.name}
                            </button>
                          </h5>
                        </div>

                        <div className="card-content">
                          <div className="left-half">
                            <div>left 1</div>
                            {getPostsByCategory(category.id).length > 0 && (
                              <div style={{ display: 'flex' }}>
                                <div style={{ flex: '1 0 60%', margin: '10px' }}>
                                  <Card>
                                    <CardBody>
                                      {getAlbumForPost(getPostsByCategory(category.id)[0].id) ? (
                                        getAlbumsByPost(getPostsByCategory(category.id)[0].id).map((album, index) => (
                                          <div key={`entity-${index}`} data-cy="entityTable">
                                            <div>
                                              {getImageForAlbum(album.id) ? (
                                                <CardImg
                                                  src={`data:${getImagesByAlbum(album.id)[0].imageContentType};base64,${getImagesByAlbum(album.id)[0].image}`}
                                                  style={{ maxHeight: '280px', objectFit: 'contain' }}
                                                />
                                              ) : (
                                                <span>No Images</span>
                                              )}
                                            </div>
                                          </div>
                                        ))
                                      ) : (
                                        <span>No Albums</span>
                                      )}
                                      <div>
                                        <CardTitle tag="h5">
                                          <Link to={`/post/${getPostsByCategory(category.id)[0].id}`}>
                                            {getPostsByCategory(category.id)[0].name}
                                          </Link>
                                        </CardTitle>
                                        <CardText>
                                          <small className="text-muted">{getPostsByCategory(category.id)[0].createdAt}</small>
                                        </CardText>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="right-half">
                            <div>left 2</div>
                            {getPostsByCategory(category.id)
                              .slice(1)
                              .map(
                                (post, index) =>
                                  post && (
                                    <div key={`post-${post.id}`} style={{ marginBottom: '10px' }}>
                                      <Card>
                                        <CardBody>
                                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {getAlbumForPost(post.id) ? (
                                              getAlbumsByPost(post.id).map((album, indexAlbum) => (
                                                <div key={`entity-${indexAlbum}`} data-cy="entityTable">
                                                  <div>
                                                    {getImageForAlbum(album.id) ? (
                                                      <CardImg
                                                        src={`data:${getImagesByAlbum(album.id)[0].imageContentType};base64,${getImagesByAlbum(album.id)[0].image}`}
                                                        style={{ maxHeight: '125px' }}
                                                      />
                                                    ) : (
                                                      <span>No Images</span>
                                                    )}
                                                  </div>
                                                </div>
                                              ))
                                            ) : (
                                              <span>No Albums</span>
                                            )}
                                            <div>
                                              <CardTitle tag="h5">
                                                <Link to={`/post/${post.id}`}>{post.name}</Link>
                                              </CardTitle>
                                              <CardText>
                                                <small className="text-muted">{post.createdAt}</small>
                                              </CardText>
                                            </div>
                                          </div>
                                        </CardBody>
                                      </Card>
                                    </div>
                                  ),
                              )}
                          </div>
                        </div>
                      </div>
                    ),
                )}
                {/* {categoryList.slice(1).map(
                  category =>
                    category && (
                      <div className="card" key={`category-${category.id}`} id={`category-${category.id}`}>
                        <div className="card-header" id={`heading-${category.id}`}>
                          <h5 className="mb-0">
                            <button className="btn btn-link" type="button" aria-controls={`collapse-${category.id}`}>
                              {category.name}
                            </button>
                          </h5>
                        </div>

                        <div className="card-content">
                          <div className="left-half">
                            <div>left 1</div>
                            {getPostsByCategory(category.id).length > 0 && (
                              <div style={{ display: 'flex' }}>
                                <div style={{ flex: '1 0 60%', margin: '10px' }}>
                                  <Card>
                                    <CardBody>
                                      {getAlbumForPost(getPostsByCategory(category.id)[0].id) ? (
                                        getAlbumsByPost(getPostsByCategory(category.id)[0].id).map((album, index) => (
                                          <div key={`entity-${index}`} data-cy="entityTable">
                                            <div>
                                              {getImageForAlbum(album.id) ? (
                                                <CardImg
                                                  src={`data:${getImagesByAlbum(album.id)[0].imageContentType};base64,${getImagesByAlbum(album.id)[0].image}`}
                                                  style={{ maxHeight: '280px', objectFit: 'contain' }}
                                                />
                                              ) : (
                                                <span>No Images</span>
                                              )}
                                            </div>
                                          </div>
                                        ))
                                      ) : (
                                        <span>No Albums</span>
                                      )}
                                      <div>
                                        <CardTitle tag="h5">
                                          <Link to={`/post/${getPostsByCategory(category.id)[0].id}`}>
                                            {getPostsByCategory(category.id)[0].name}
                                          </Link>
                                        </CardTitle>
                                        <CardText>
                                          <small className="text-muted">{getPostsByCategory(category.id)[0].createdAt}</small>
                                        </CardText>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="right-half">
                            <div>left 2</div>
                            {getPostsByCategory(category.id)
                              .slice(1)
                              .map(
                                (post, index) =>
                                  post && (
                                    <div key={`post-${post.id}`} style={{ marginBottom: '10px' }}>
                                      <Card>
                                        <CardBody>
                                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {getAlbumForPost(post.id) ? (
                                              getAlbumsByPost(post.id).map((album, indexAlbum) => (
                                                <div key={`entity-${indexAlbum}`} data-cy="entityTable">
                                                  <div>
                                                    {getImageForAlbum(album.id) ? (
                                                      <CardImg
                                                        src={`data:${getImagesByAlbum(album.id)[0].imageContentType};base64,${getImagesByAlbum(album.id)[0].image}`}
                                                        style={{ maxHeight: '125px' }}
                                                      />
                                                    ) : (
                                                      <span>No Images</span>
                                                    )}
                                                  </div>
                                                </div>
                                              ))
                                            ) : (
                                              <span>No Albums</span>
                                            )}
                                            <div>
                                              <CardTitle tag="h5">
                                                <Link to={`/post/${post.id}`}>{post.name}</Link>
                                              </CardTitle>
                                              <CardText>
                                                <small className="text-muted">{post.createdAt}</small>
                                              </CardText>
                                            </div>
                                          </div>
                                        </CardBody>
                                      </Card>
                                    </div>
                                  ),
                              )}
                          </div>
                        </div>
                      </div>
                    ),
                )} */}
              </div>
            </div>
            <div className="right-content">
              <div>right</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
