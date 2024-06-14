import styled from 'styled-components';
import { IUser } from "../types";
import { secretLevelToSmile } from "../libs";

const truncateName = (name: string) => {
  return name.length > 14 ? `${name.substring(0, 11)}...` : name;
};

const UserTable = styled.div<{ height: string }>`
  max-height: ${({height}) => height};
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: rgba(255, 255, 255, 0.09);
  border-radius: 10px;
  padding: 5px 10px 2vh 10px;

  :last-child {
    height: auto;
  }
`;

const UserChild = styled.div`
  padding: 13px 10px;
  margin: 5px 0;
  width: 100%;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
          <UserName>{secretLevelToSmile(user.secretLevel)} {truncateName(user.firstName)}</UserName>
          <UserCoins>{user.referralCode} <span>{user.coins}$</span></UserCoins>
        </UserChild>
      ))}
    </UserTable>
  );
};