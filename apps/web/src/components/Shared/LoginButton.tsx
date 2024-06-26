import type { FC } from 'react';

import { AUTH } from '@good/data/tracking';
import { Button } from '@good/ui';
import { Leafwatch } from '@helpers/leafwatch';
import { useGlobalModalStateStore } from 'src/store/non-persisted/useGlobalModalStateStore';

interface LoginButtonProps {
  className?: string;
  isBig?: boolean;
  isFullWidth?: boolean;
  title?: string;
}

const LoginButton: FC<LoginButtonProps> = ({
  className = '',
  isBig = false,
  isFullWidth = false,
  title = 'Login'
}) => {
  const { setShowAuthModal } = useGlobalModalStateStore();

  return (
    <Button
      className={
        'mb-2 inline-flex  w-10/12 sm:w-full items-center justify-center rounded-full border border-white bg-black p-2 text-base text-white'
      }
      onClick={(e) => {
        e.stopPropagation();
        setShowAuthModal(true);
        Leafwatch.track(AUTH.OPEN_LOGIN);
      }}
    >
      {title}
    </Button>
  );
};

export default LoginButton;
