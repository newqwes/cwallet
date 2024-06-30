import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../entities/Users';
import { selectUsersData } from '../../../entities/Users/model/selectors.ts';
import { Button, UserTableComponent } from '../../../shared/ui';
import styled from 'styled-components';
import { UserTable } from '../../../shared/ui/UserTable.tsx';
import { IUser } from '../../../shared/types';

export const Container = styled.div`
  padding: 10px;

  ${UserTable} {
    height: 73vh;
  }
`;
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Header = styled.h1`
  font-size: 24px;
  color: rgb(200, 200, 200);
  margin: 1vh;
`;

const sortByLevel = (a: IUser, b: IUser) => {
  return a.secretLevel > b.secretLevel ? -1 : 1;
};

const sortByShortGames = (a: IUser, b: IUser) => {
  if (a.shortGames < 10 && b.shortGames < 10) {
    return 0;
  }
  if (a.shortGames < 10) {
    return 1;
  }
  if (b.shortGames < 10) {
    return -1;
  }
  return a.shortPlace > b.shortPlace ? -1 : a.shortPlace < b.shortPlace ? 1 : 0;
};

export const UsersPage: FC = () => {
  const dispatch = useDispatch();
  const [showShortGame, setShowShortGame] = useState(false);
  const rawUsers = [...useSelector(selectUsersData)];

  const users = rawUsers.sort(showShortGame ? sortByShortGames : sortByLevel);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container>
      <TitleWrapper>
        <Header>Users: {users.length}</Header>
        <Button size={'xs'} btnStyle={'primary'} isDisabled={!showShortGame}
                onClick={() => setShowShortGame(!showShortGame)}>Short
          Game</Button>
      </TitleWrapper>
      <UserTableComponent users={users} isShortGame={showShortGame}/>
    </Container>
  );
};
