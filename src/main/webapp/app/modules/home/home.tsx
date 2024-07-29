import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCategories, getHome } from 'app/entities/category/category.reducer';
import './home.scss';
import { Link } from 'react-router-dom';

export const Home = () => {
  const dispatch = useAppDispatch();

  const categoryList = useAppSelector(state => state.category.entities);
  const loadingCategories = useAppSelector(state => state.category.loading);

  useEffect(() => {
    dispatch(getHome());
  }, [dispatch]);

  return (
    <div className="container">
      <h2 id="home-heading"></h2>
      {loadingCategories ? (
        <p>Loading...</p>
      ) : (
        <div className="accordion" id="accordionExample">
          {/* <div className="category-row">{categoryList.map(category => category && <Button key={category.id}>{category.name}</Button>)}</div> */}
          <div className="category-row">
            {categoryList.slice(0, -1).map(
              category =>
                category && (
                  <Link key={category.id} to={`/paragraph/${category.id}`} className="category-button">
                    {category.name}
                  </Link>
                  // <Button key={category.id} className="category-button">
                  //   {category.name}
                  // </Button>
                ),
            )}
          </div>
          <div className="content">
            <div className="main-content">
              <div className="categories">
                {categoryList.slice(0, -1).map(
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
                            {/* <div>left 1</div> */}
                            {category.posts &&
                              category.posts.length > 0 &&
                              category.posts.slice(0, 1).map(cate => (
                                <div>
                                  {cate.paragraph && (
                                    <>
                                      {cate.paragraph.image && (
                                        <img src={`data:image/png;base64,${cate.paragraph.image.image}`} alt={cate.paragraph.image.name} />
                                      )}
                                      <Link to={`/paragraph/${cate.id}/postId`}>
                                        <h3>{cate.name} 📷</h3>
                                      </Link>
                                      <p className="paragraph-description">{cate.paragraph.description}</p>
                                    </>
                                  )}
                                </div>
                              ))}
                          </div>
                          <div className="right-half">
                            {/* <div>left 2</div> */}
                            {category.posts &&
                              category.posts.length > 0 &&
                              category.posts.slice(1).map(cate => (
                                <div className="child">
                                  {cate.paragraph && (
                                    <>
                                      {cate.paragraph.image && (
                                        <img src={`data:image/png;base64,${cate.paragraph.image.image}`} alt={cate.paragraph.image.name} />
                                      )}
                                      <Link to={`/paragraph/${cate.id}/postId`}>
                                        <div className="child-1">{cate.name}</div>
                                      </Link>
                                    </>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
            <div className="right-content">
              {/* <div>right</div> */}
              {categoryList.slice(-1).map(
                category =>
                  category && (
                    <div className="card" key={`category-${category.id}`} id={`category-${category.id}`}>
                      <div className="card-header" id={`heading-${category.id}`}>
                        <h5 className="mb-0">
                          <button className="btn btn-link" type="button" aria-controls={`collapse-${category.id}`}>
                            Xem nhiều nhất
                          </button>
                        </h5>
                      </div>
                      {category.posts &&
                        category.posts.length > 0 &&
                        category.posts.map(cate => (
                          <div className="child">
                            {cate.paragraph && (
                              <>
                                {cate.paragraph.image && (
                                  <img src={`data:image/png;base64,${cate.paragraph.image.image}`} alt={cate.paragraph.image.name} />
                                )}
                                <Link to={`/paragraph/${cate.id}/postId`}>
                                  <div className="child-1">{cate.name}</div>
                                </Link>
                              </>
                            )}
                          </div>
                        ))}
                      {/* </div> */}
                      {/* </div> */}
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
