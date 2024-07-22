import React, { useEffect, useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { useAppSelector, useAppDispatch } from 'app/config/store';
import { getPersonByUserId } from 'app/entities/person/person.reducer';
import { IPerson } from 'app/shared/model/person.model';

import { AxiosResponse } from 'axios';

const accountMenuItemsAuthenticated = (isPersonFound, currentUserPersonId) => (
  <>
    <MenuItem icon="info-circle" to={isPersonFound ? `/person/${currentUserPersonId}` : '/person/new'} data-cy="about">
      <Translate contentKey="global.menu.account.about">About</Translate>
    </MenuItem>
    <MenuItem icon="wrench" to="/account/settings" data-cy="settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to="/account/password" data-cy="passwordItem">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout" data-cy="logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = () => (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login" data-cy="login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem icon="user-plus" to="/account/register" data-cy="register">
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.authentication.account);
  const [currentUserPersonId, setCurrentUserPersonId] = useState(null);
  const [isPersonFound, setIsPersonFound] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      (async () => {
        try {
          const response = await dispatch(getPersonByUserId(currentUser.id)).unwrap();
          const payload = response as AxiosResponse<IPerson>;
          if (payload.data) {
            setCurrentUserPersonId(payload.data.id);
            setIsPersonFound(true);
          }
        } catch (error) {
          setCurrentUserPersonId(null);
          setIsPersonFound(false);
        }
      })();
    }
  }, [currentUser, dispatch]);

  return (
    <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu" data-cy="accountMenu">
      {isAuthenticated && accountMenuItemsAuthenticated(isPersonFound, currentUserPersonId)}
      {!isAuthenticated && accountMenuItems()}
    </NavDropdown>
  );
};

export default AccountMenu;
