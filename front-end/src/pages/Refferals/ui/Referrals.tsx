import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReferrals,
  selectReferralChilds,
} from "../../../entities/Referrals";
import { MainImg, RefChild, RefHeader, Title, RefLinkWrapper, RefCode, RefLink, Wrapper } from "./styled";
import { selectUserRefCode } from "../../../entities/User";
import { postEvent } from "@tma.js/sdk";

export const Referrals: FC = () => {
  const dispatch = useDispatch();
  const referralChildren = useSelector(selectReferralChilds);
  const userRefCode = useSelector(selectUserRefCode) as string;

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
    const link = '';
    makeCopyToClipboard(link);
  };

  return (
    <Wrapper>
      <RefHeader>
        <Title>Referral code:</Title>
        <RefCode onClick={handleCodeCopyClick}>{userRefCode}</RefCode>
      </RefHeader>
      <div>You and your friends will receive bonuses</div>
      <RefLinkWrapper>
        <p>My referral link: </p>
        <RefLink onClick={handleLinkCopyClick}>Copy</RefLink>
      </RefLinkWrapper>
      <MainImg/>
      <hr/>
      {referralChildren?.map((refChild, index) =>
        <RefChild key={refChild.id}>
          {index + 1}) {refChild.firstName} {refChild.lastName} {refChild.coins}
        </RefChild>
      )}
    </Wrapper>
  );
};
