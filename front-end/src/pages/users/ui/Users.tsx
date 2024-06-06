import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../entities/Users';
import { selectUsersData } from '../../../entities/Users/model/selectors.ts';
import styled from 'styled-components';

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
`;

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardBody = styled.div`
    font-size: 14px;
    color: #333;
`;

export const UsersPage: FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsersData);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <CardWrapper>
      <Card>
        <CardBody>Пользователей: {users && users.length} штуки)</CardBody>
      </Card>
      {users && users.map(user => (
        <Card key={user.telegramId}>
          <CardBody>Telegram ID: {user.telegramId}</CardBody>
          <CardBody>First Name: {user.firstName}</CardBody>
          <CardBody>Last Name: {user.lastName}</CardBody>
          <CardBody>Language Code: {user.languageCode}</CardBody>
          <CardBody>Next Claim Date: {new Date(user.nextClaimDate).toLocaleDateString()}</CardBody>
          <CardBody>Coins: {user.coins}</CardBody>
          <CardBody>Referral Code: {user.referralCode}</CardBody>
          <CardBody>Ref Parent: {user.refParent}</CardBody>
        </Card>
      ))}
    </CardWrapper>
  );
};
