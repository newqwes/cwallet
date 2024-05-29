import { FC, useEffect } from 'react';
import { fetchDataRequest } from '../../../store/userReducer.ts';
import { useDispatch } from 'react-redux';
import ClaimComponent from '../../../shared/ui/ClaimComponent/ClaimComponent.tsx';

export const MainPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, []);
  return (
    <>
      <ClaimComponent />
    </>
  )
};
