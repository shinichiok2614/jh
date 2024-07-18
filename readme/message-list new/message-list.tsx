import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, ListGroup, ListGroupItem, Input, Card, CardBody, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPlus, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getConversations, deleteEntity as deleteConversation } from './message-list.reducer';
import { getEntities as getMessages } from 'app/entities/message/message.reducer';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { getEntities as getPersons } from 'app/entities/person/person.reducer';
import { TextFormat } from 'react-jhipster';
import { APP_DATE_FORMAT } from 'app/config/constants';
import './message-list.css';

const MessageList = () => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(state => state.messageList.entities);
  const messages = useAppSelector(state => state.message.entities);
  const images = useAppSelector(state => state.image.entities);
  const persons = useAppSelector(state => state.person.entities);
  const loading = useAppSelector(state => state.messageList.loading);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    dispatch(getConversations({}));
    dispatch(getImages({}));
    dispatch(getMessages({}));
    dispatch(getPersons({}));
  }, [dispatch]);

  const getPersonImage = personId => {
    const personImage = images.find(image => image.person && image.person.id === personId);
    return personImage ? `data:${personImage.imageContentType};base64,${personImage.image}` : '';
  };

  const getPersonName = personId => {
    const person = persons.find(p => p.id === personId);
    return person ? person.name : 'Unknown Sender';
  };

  const handleSelectConversation = conversation => {
    setSelectedConversation(conversation);
  };

  const handleSyncList = () => {
    dispatch(getConversations({}));
    dispatch(getMessages({}));
    dispatch(getImages({}));
    dispatch(getPersons({}));
  };

  const handleDeleteConversation = conversationId => {
    dispatch(deleteConversation(conversationId)).then(() => {
      if (selectedConversation && selectedConversation.id === conversationId) {
        setSelectedConversation(null);
      }
      dispatch(getConversations({}));
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Logic to send a message (e.g., dispatch an action)
      setNewMessage(''); // Clear the input
    }
  };

  return (
    <div className="app-container">
      <Container fluid className="message-list-container">
        <Row>
          <Col md="4" className="conversation-list">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Conversations</h2>
              <div>
                <Button color="info" onClick={handleSyncList} disabled={loading} className="me-2">
                  <FontAwesomeIcon icon={faSync} spin={loading} />
                </Button>
                <Link to="/message-list/new" className="btn btn-primary">
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </div>
            </div>
            <ListGroup>
              {conversations.map(conversation => (
                <ListGroupItem
                  key={conversation.id}
                  active={selectedConversation && selectedConversation.id === conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    {conversation.receiver && (
                      <div className="avatar-container">
                        <img
                          src={getPersonImage(conversation.receiver.id)}
                          alt={conversation.receiver.name}
                          className="rounded-circle conversation-avatar"
                        />
                      </div>
                    )}
                    <span className="ml-2">{conversation.receiver ? conversation.receiver.name : 'Unknown Receiver'}</span>
                  </div>
                  <Link to={`/message-list/${conversation.id}/edit`} className="btn btn-secondary me-2">
                    <FontAwesomeIcon icon="pencil-alt" />
                  </Link>
                  <Button color="danger" size="sm" onClick={() => handleDeleteConversation(conversation.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md="8" className="message-area">
            {selectedConversation ? (
              <div>
                <h3>Chat with {selectedConversation.receiver ? selectedConversation.receiver.name : 'Unknown Receiver'}</h3>
                <div className="message-display">
                  {messages
                    .filter(message => message.messagelist && message.messagelist.id === selectedConversation.id)
                    .map(message => (
                      <div
                        key={message.id}
                        className={`d-flex align-items-center mb-2 ${
                          message.sender && message.sender.id === selectedConversation.receiver.id
                            ? 'justify-content-end'
                            : 'justify-content-start'
                        }`}
                      >
                        <Card className="message-card">
                          <CardBody className="d-flex p-0">
                            <div
                              className={`message-info text-center ${message.sender && message.sender.id === selectedConversation.receiver.id ? 'order-last' : ''}`}
                            >
                              <img
                                src={getPersonImage(message.sender.id)}
                                alt={getPersonName(message.sender.id)}
                                className="rounded-circle message-avatar"
                                style={{ width: '50px', height: '50px' }}
                              />
                              <div>{getPersonName(message.sender.id)}</div>
                            </div>
                            <div className="message-content ms-3">
                              <CardText>{message.content}</CardText>
                            </div>
                          </CardBody>
                          <div className="d-flex justify-content-center">
                            <small>
                              <TextFormat type="date" value={message.createdAt} format={APP_DATE_FORMAT} />
                            </small>
                          </div>
                        </Card>
                      </div>
                    ))}
                </div>
                <div className="message-input d-flex mt-3">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="me-2"
                  />
                  <Button color="primary" onClick={handleSendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p>Select a conversation to start chatting.</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessageList;
