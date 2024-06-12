import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../entities/Users';
import { selectUsersData } from '../../../entities/Users/model/selectors.ts';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: grid;
  padding: 5px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  background-color: rgba(249, 249, 249, 0.85);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardBody = styled.div`
  font-size: 10px;
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
      {users && users.map(user => (
        <Card key={user.telegramId}>
          <CardBody>Telegram ID: {user.telegramId}</CardBody>
          <CardBody>First Name: {user.firstName}</CardBody>
          <CardBody>Last Name: {user.lastName}</CardBody>
          <CardBody>Language Code: {user.languageCode}</CardBody>
          <CardBody>Date: {new Date(user.nextClaimDate).toLocaleString('ru-RU', {
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}</CardBody>
          <CardBody>Coins: {user.coins}$</CardBody>
          <CardBody>Referral Code: {user.referralCode}</CardBody>
          <CardBody>Ref Parent: {user.refParent}</CardBody>
          <CardBody>Ref Grand: {user.refGrandParent}</CardBody>
          <CardBody>Ref Rewards: {user.referralRewards}$</CardBody>
          <CardBody>Mining Level: {user.miningLevel}</CardBody>
          <CardBody>Time Level: {user.timeLevel}</CardBody>
        </Card>
      ))}
    </CardWrapper>
  );
};
