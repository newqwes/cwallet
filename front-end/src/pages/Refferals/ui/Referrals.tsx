import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReferrals,
  selectReferralChilds,
} from "../../../entities/Referrals";
import {
  MainImg,
  RefChild,
  RefHeader,
  Title,
  RefLinkWrapper,
  RefCode,
  RefLink,
  Wrapper,
  Description,
  TabWrapper, Tab,
  ReferralsContainer,
  RefName,
  RefCoins
} from "./styled";
import { selectUserRefCode } from "../../../entities/User";
import { postEvent } from "@tma.js/sdk";
import { REFERRAL_URL } from "../../../shared/consts";
import { initUtils } from "@tma.js/sdk-react";

export const Referrals: FC = () => {
  const dispatch = useDispatch();
  const referralChildren = useSelector(selectReferralChilds);
  const userRefCode = useSelector(selectUserRefCode) as string;
  const link = REFERRAL_URL + userRefCode;
  const [activeTab, setActiveTab] = useState('myReferrals');

  useEffect(() => {
    dispatch(fetchReferrals());
  }, []);

  const makeCopyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    } else {
      // @ts-expect-error: This error is expected because web_app_trigger_haptic_feedback obj params is empty
      postEvent('web_app_trigger_haptic_feedback', {
        type: 'notification',
        impact_style: 'heavy',
        notification_type: 'success'
      });
      // Fallback for browsers that do not support the clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert('Copied to clipboard!');
    }
  }

  const handleCodeCopyClick = () => {
    makeCopyToClipboard(userRefCode);
  };

  const handleLinkCopyClick = () => {
    const utils = initUtils();
    utils.openTelegramLink(
      `https://t.me/share/url?url=${link}`
    );
  };

  return (
    <Wrapper>
      <RefHeader>
        <Title>Your Referral code</Title>
        <RefCode onClick={handleCodeCopyClick}>{userRefCode}</RefCode>
      </RefHeader>
      <Description>You and your friends will receive bonuses</Description>
      <RefLinkWrapper>
        <p>My referral link</p>
        <RefLink onClick={handleLinkCopyClick}>Share</RefLink>
      </RefLinkWrapper>
      <ReferralsContainer>
        <TabWrapper>
          <Tab isActive={activeTab === 'myReferrals'} onClick={() => setActiveTab('myReferrals')}>My
            Referrals</Tab>
          <Tab isActive={activeTab === 'referralTree'} onClick={() => setActiveTab('referralTree')}>Referral
            Tree</Tab>
        </TabWrapper>
        {activeTab === 'myReferrals' && (
          <div>
            {referralChildren?.map((refChild) =>
              <RefChild
                key={refChild.id}>
                <RefName>{refChild.firstName}</RefName>
                <RefCoins>{refChild.coins}$</RefCoins>
              </RefChild>
            )}
          </div>
        )}
        {activeTab === 'referralTree' && (
          <div>
            {/* Сюда добавь логику для отображения рефералов второго уровня */}
          </div>
        )}
        <MainImg/>
      </ReferralsContainer>
    </Wrapper>
  );
};
