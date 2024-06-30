import styled from 'styled-components';
import { IUser } from '../types';
import { secretLevelToSmile } from '../libs';
import { getReadableCount } from '../libs/toNormalNumber.ts';
import { coinFont } from './font.ts';
import { round } from 'lodash';

const truncateName = (name: string) => {
  return name.length > 12 ? `${name.substring(0, 9)}...` : name;
};

export const UserTable = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
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

  &:last-child {
    border-bottom: none;
  }
`;

const UserName = styled.div`
`;

const Level = styled.span`
  ${coinFont};
  display: inline-flex;
  text-shadow: none;
  margin-left: 4vw;
  font-size: 3.8vw;
  min-width: 5vw;
`;

const UserCoins = styled.div`
  font-size: 3.4vw;
`;


const Coins = styled.span`
  display: inline-block;
  min-width: 22vw;
  text-align: right;
  font-size: 4vw;
`;

export const UserTableComponent = ({ users, isShortGame }: { users: IUser[], isShortGame?: boolean }) => {
  return (
    <UserTable className="scroll_on">
      {users?.map((user) => (
        <UserChild key={user.id}>
          <UserName>{secretLevelToSmile(user.secretLevel)} {truncateName(user.firstName)}</UserName>
          {
            isShortGame ?
              <UserCoins>
                {user.shortGames}
                <Level>{round(user.shortPlace || 0, 1)}</Level>
                <Coins>{round(user.shortVolatility || 0, 1)}%</Coins>
              </UserCoins>
              : <UserCoins>
                {user.referralCode}
                <Level>{Math.min(user.luckLevel, user.timeLevel, user.miningLevel)}</Level>
                <Coins>{getReadableCount(user.coins)}✨</Coins>
              </UserCoins>
          }
        </UserChild>
      ))}
    </UserTable>
  );
};
