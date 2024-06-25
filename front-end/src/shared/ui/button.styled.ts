import styled from 'styled-components';

interface IButtonProp {
  btnStyle?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isDisabled?: boolean;
}

const getButtonBackgroundColor = ({ isDisabled, btnStyle }: {
  isDisabled?: boolean,
  btnStyle?: 'primary' | 'secondary'
}) => {
  if (isDisabled) {
    return 'hsla(214,9%,30%,0.5)';
  }

  if (btnStyle === 'primary') {
    return 'hsl(39, 100%, 50%)';
  }

  return 'hsl(217, 90%, 54%, 0.5)';
};

const getButtonShadowColor = ({ isDisabled, btnStyle }: {
  isDisabled?: boolean,
  btnStyle?: 'primary' | 'secondary'
}) => {
  if (isDisabled) {
    return '0 0.35em 0 0 hsla(216,10%,40%,0.5)';
  }

  if (btnStyle === 'primary') {
    return '0 0.35em 0 0 hsl(39, 100%, 50%, 0.5)';
  }

  return '0 0.35em 0 0 hsl(217, 90%, 40%, 0.5)';
};

export const Button = styled.button<IButtonProp>`
  background-color: ${getButtonBackgroundColor};
  color: ${props => props.btnStyle === 'secondary' ? 'hsl(218,9%,83%)' : 'hsl(51,16%,92%)'};
  border: 0;
  border-radius: 0.5em;
  padding: 1em;
  font-size: ${props => {
    switch (props.size) {
      case 'xs':
        return '2.5vw';
      case 'sm':
        return '3.5vw';
      case 'md':
        return '4vw';
      case 'lg':
        return '4.5vw';
      case 'xl':
        return '5vw';
      default:
        return '4vw';
    }
  }};
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: ${getButtonShadowColor};

  &:active {
    transform: translateY(0.35em);
    box-shadow: none;
  }

  &:focus-visible {
    transform: translateY(0.35em);
    box-shadow: none;
  }
`;
