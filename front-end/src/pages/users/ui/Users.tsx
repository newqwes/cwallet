import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../entities/Users';
import { selectUsersData } from '../../../entities/Users/model/selectors.ts';
import { UserTableComponent } from "../../../shared/ui";

export const UsersPage: FC = () => {
  const dispatch = useDispatch();
  const users = [...useSelector(selectUsersData)].sort((a, b) => a.nextClaimDate > b.nextClaimDate ? -1 : 1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <UserTableComponent users={users} height='80vh'/>;
};
