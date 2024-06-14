import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../entities/Users';
import { selectUsersData } from '../../../entities/Users/model/selectors.ts';
import { UserTableComponent } from "../../../shared/ui";
import styled from "styled-components";
import { UserTable } from "../../../shared/ui/UserTable.tsx";

export const Container = styled.div`
  padding: 10px;

  ${UserTable} {
    height: 73vh;
  }
`;

export const Header = styled.h1`
  font-size: 24px;
  color: rgb(200, 200, 200);
  text-align: center;
`;

export const UsersPage: FC = () => {
  const dispatch = useDispatch();
  const users = [...useSelector(selectUsersData)].sort((a, b) => a.nextClaimDate > b.nextClaimDate ? -1 : 1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container>
      <Header>Users: {users.length}</Header>
      <UserTableComponent users={users}/>
    </Container>
  );
};
