import styled from 'styled-components';
import { IUser } from "../types";
import { secretLevelToSmile } from "../libs";

const UserTable = styled.div<{ height: string }>`
  height: ${({height}) => height};
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2vh;

  :last-child {
    height: auto;
  }
`;

const UserChild = styled.div`
  padding: 15px 10px 20px 10px;
  margin: 5px 0;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  font-size: 4vw;
`;

const UserName = styled.div``;
const UserCoins = styled.div`
  font-size: 3.4vw;

  span {
    display: inline-block;
    width: 22vw;
    text-align: right;
    font-size: 4vw;
  }
`;

export const UserTableComponent = ({users, height}: { users: IUser[], height?: string }) => {
  return (
    <UserTable className='scroll_on' height={height || '45vh'}>
      {users?.map((user) => (
        <UserChild key={user.id}>
          <UserName>{secretLevelToSmile(user.secretLevel)} {user.firstName}</UserName>
          <UserCoins>{user.referralCode} <span>{user.coins}$</span></UserCoins>
        </UserChild>
      ))}
    </UserTable>
  );
};
