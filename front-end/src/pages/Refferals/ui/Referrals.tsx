import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReferrals,
  selectReferralChildren, selectReferralGrandchildren,
} from "../../../entities/Referrals";
import {
  MainImg,
  RefHeader,
  Title,
  RefLinkWrapper,
  RefCode,
  RefLink,
  Wrapper,
  DescriptionWrapper,
  Description,
  TabWrapper, Tab,
  ReferralsContainer,
} from "./styled";
import { selectUserRefCode } from "../../../entities/User";
import { REFERRAL_URL } from "../../../shared/consts";
import { initUtils } from "@tma.js/sdk-react";
import { vibrateNow } from "../../../shared/libs/vibration.ts";
import { UserTableComponent } from "../../../shared/ui";

const MY_REFERRALS = 'myReferrals';
const REFERRAL_TREE = 'referralTree';

export const Referrals: FC = () => {
  const dispatch = useDispatch();
  const referralChildren = useSelector(selectReferralChildren);
  const referralGrandchildren = useSelector(selectReferralGrandchildren);

  const userRefCode = useSelector(selectUserRefCode) as string;
  const link = REFERRAL_URL + userRefCode;
  const [activeTab, setActiveTab] = useState(MY_REFERRALS);

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
      vibrateNow('success')
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
      <DescriptionWrapper>
        <Description>You and your friends will receive bonuses</Description>
      </DescriptionWrapper>
      <RefLinkWrapper>
        <p>My referral link</p>
        <RefLink onClick={handleLinkCopyClick}>Share</RefLink>
      </RefLinkWrapper>
      <ReferralsContainer>
        <TabWrapper>
          <Tab isActive={activeTab === MY_REFERRALS} onClick={() => setActiveTab(MY_REFERRALS)}>My
            Referrals</Tab>
          <Tab isActive={activeTab === REFERRAL_TREE} onClick={() => setActiveTab(REFERRAL_TREE)}>Referral
            Tree</Tab>
        </TabWrapper>
        {activeTab === MY_REFERRALS && <UserTableComponent users={referralChildren}/>}
        {activeTab === REFERRAL_TREE && <UserTableComponent users={referralGrandchildren}/>}
        <MainImg/>
      </ReferralsContainer>
    </Wrapper>
  );
};
