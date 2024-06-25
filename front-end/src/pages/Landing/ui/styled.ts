import styled from 'styled-components';
import mainImg from '../../../shared/assets/main.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;


export const LinkContainer = styled.div`
  margin-top: 20px;
`;

export const Link = styled.a`
  color: #61dafb;
  margin: 0 10px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PlayButton = styled.a`
  background-color: #61dafb;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 24px;
  cursor: pointer;
  margin: 20px;
  text-decoration: none;
  color: #f4f4f4;
  transition: 0.2s ease;

  &:hover {
    background-color: #21a1f1;
    color: #e7e6e8;
  }
`;

export const RoadmapSection = styled.section`
  margin-top: 10px;
  padding: 20px;
`;

export const RoadmapItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 10px;
  background: linear-gradient(145deg, #4D5BCE, #202E78);
  color: white;
  border-radius: 18px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    background: url(${mainImg}) center/cover no-repeat;
    margin-right: 15px;
  }
`;

export const RoadmapTitle = styled.h2`
  color: #61dafb; // Цвет, соответствующий кнопке Play Now
  margin-bottom: 20px;
`;
