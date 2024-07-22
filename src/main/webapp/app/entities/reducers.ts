import person from 'app/entities/person/person.reducer';
import department from 'app/entities/department/department.reducer';
import category from 'app/entities/category/category.reducer';
import post from 'app/entities/post/post.reducer';
import paragraph from 'app/entities/paragraph/paragraph.reducer';
import image from 'app/entities/image/image.reducer';
import album from 'app/entities/album/album.reducer';
import comment from 'app/entities/comment/comment.reducer';
import commentList from 'app/entities/comment-list/comment-list.reducer';
import message from 'app/entities/message/message.reducer';
import messageList from 'app/entities/message-list/message-list.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  person,
  department,
  category,
  post,
  paragraph,
  image,
  album,
  comment,
  commentList,
  message,
  messageList,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
