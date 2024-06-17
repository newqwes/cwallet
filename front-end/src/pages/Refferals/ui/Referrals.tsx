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
  Empty,
  ButtonContainer
} from "./styled";
import { selectUserRefCode } from "../../../entities/User";
import { REFERRAL_URL } from "../../../shared/consts";
import { initUtils } from "@tma.js/sdk-react";
import { vibrateNow } from "../../../shared/libs/vibration.ts";
import { Button, UserTableComponent } from "../../../shared/ui";

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

  const showRefChildren = activeTab === MY_REFERRALS && referralChildren.length > 0;
  const showEmptyRefChildren = activeTab === MY_REFERRALS && referralChildren.length === 0;
  const showRefGrandchildren = activeTab === REFERRAL_TREE && referralGrandchildren.length > 0;
  const showEmptyGrandchildren = activeTab === REFERRAL_TREE && referralGrandchildren.length === 0;

  return (
    <Wrapper>
      <RefHeader>
        <Title>Your Referral code</Title>
        <RefCode onClick={handleCodeCopyClick}>{userRefCode}</RefCode>
      </RefHeader>
      <DescriptionWrapper>
        <Description>Form first level: 5%. Second: 1%</Description>
      </DescriptionWrapper>
      <ButtonContainer>
        <Button btnStyle={'secondary'} onClick={() => {
          vibrateNow('error');
        }}>
          Claim
        </Button>
        <RefLinkWrapper>
          <p>My referral link</p>
          <RefLink onClick={handleLinkCopyClick}>Share</RefLink>
        </RefLinkWrapper>
      </ButtonContainer>
      <ReferralsContainer>
        <TabWrapper>
          <Tab isActive={activeTab === MY_REFERRALS} onClick={() => setActiveTab(MY_REFERRALS)}>My
            Referrals {referralChildren.length}</Tab>
          <Tab isActive={activeTab === REFERRAL_TREE} onClick={() => setActiveTab(REFERRAL_TREE)}>Referral
            Tree {referralGrandchildren.length}</Tab>
        </TabWrapper>
        {showRefChildren && <UserTableComponent
          users={referralChildren}/>}
        {showEmptyRefChildren && <Empty>List is empty</Empty>}
        {showRefGrandchildren && <UserTableComponent users={referralGrandchildren}/>}
        {showEmptyGrandchildren && <Empty>List is empty</Empty>}
        <MainImg/>
      </ReferralsContainer>
    </Wrapper>
  );
};
