import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchReferrals,
  selectLoading,
  selectReferralChilds,
} from "../../../entities/Referrals";
import { RefChild, RefHeader } from "./styled";


export const Referrals: FC = () => {
  const dispatch = useDispatch();
  const referralChilds = useSelector(selectReferralChilds);
  const isLoading = useSelector(selectLoading);

  const isReferralChildsAbsent = referralChilds.length === 0;

  useEffect(() => {
    dispatch(fetchReferrals());
  }, []);

  return (
    <>
      <RefHeader>
        <h1>Invite friends!</h1>
        <div>You and your friends will receive bonuses</div>
      </RefHeader>
      {isLoading
        ? <div>Loading...</div>
        : <>
          {isReferralChildsAbsent
            ? <>
              There are no kents at the moment
            </>
            : <>
              {referralChilds?.map(refChild =>
                <RefChild key={refChild.id}>
                  {refChild.firstName} {refChild.lastName} {refChild.coins}
                </RefChild>
              )}
            </>}
        </>}
      {/* <Suspense fallback={<div>Loading...</div>}>
        {referralChilds?.map(refChild =>
          <RefChild key={refChild.id}>
            {refChild.firstName} {refChild.lastName} {refChild.coins}
          </RefChild>
        )}
      </Suspense> */}
    </>
  );
};
