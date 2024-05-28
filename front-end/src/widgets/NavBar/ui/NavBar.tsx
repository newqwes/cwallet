import { FC } from "react";
import { Button } from '@telegram-apps/telegram-ui';
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../app/config/router";

interface ButtonLinkProps {
  path: string;
  title: string;
  isActive: boolean;
};

const ButtonLink: FC<ButtonLinkProps> = ({ path, isActive, title }) => {
  return (
    <Link to={path}>
      <Button
        mode={isActive ? 'filled' : 'bezeled'}
        disabled={isActive}
      >
        {title}
      </Button>
    </Link>
  )
};

export const NavBar: FC = () => {
  const location = useLocation();

  return (
    <div
      style={{
        display: 'flex',
        boxSizing: 'border-box',
        justifyContent: 'center',
        width: '100%',
        gap: '5px',
        padding: '5px',
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
      }}
    >
      {routes.map(route =>
        <ButtonLink
          path={route.path}
          title={route.title}
          isActive={location.pathname === route.path}
        />
      )}
    </div>
  );
};
