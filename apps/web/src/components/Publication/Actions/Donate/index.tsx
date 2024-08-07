import type { MirrorablePublication } from '@good/lens';
import type { FC } from 'react';

import Action from '@components/Publication/Actions/Donate/Action';
import MenuTransition from '@components/Shared/MenuTransition';
import { STATIC_IMAGES_URL } from '@good/data/constants';
import stopEventPropagation from '@good/helpers/stopEventPropagation';
import { Tooltip } from '@good/ui';
import cn from '@good/ui/cn';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { GiftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import party from 'party-js';
import { useRef } from 'react';

interface DonationProps {
  publication: MirrorablePublication;
}

const Donate: FC<DonationProps> = ({ publication }) => {
  const confettiDom = useRef<HTMLDivElement>(null);

  const triggerConfetti = () => {
    party.resolvableShapes['moneybag'] =
      `<img height="15" width="15" src="${STATIC_IMAGES_URL}/emojis/money-bag.png" />`;
    party.resolvableShapes['moneywithwings'] =
      `<img height="15" width="15" src="${STATIC_IMAGES_URL}/emojis/money-with-wings.png" />`;
    party.resolvableShapes['coin'] =
      `<img height="15" width="15" src="${STATIC_IMAGES_URL}/emojis/coin.png" />`;
    party.sparkles(confettiDom.current as any, {
      count: 20,
      lifetime: 2,
      shapes: ['moneybag', 'moneywithwings', 'coin']
    });
  };

  const iconClassName = 'w-[15px] sm:w-[18px]';

  return (
    <div className="flex items-center space-x-1">
      <Menu as="div" className="relative">
        <MenuButton
          aria-label="Donate"
          as={motion.button}
          className={cn(
            'ld-text-gray-500 hover:bg-gray-300/20',
            'rounded-full p-1.5 outline-offset-2'
          )}
          onClick={stopEventPropagation}
          whileTap={{ scale: 0.9 }}
        >
          <div ref={confettiDom} />
          <Tooltip content="Donate" placement="top" withDelay>
            <GiftIcon className={cn(iconClassName)} />
          </Tooltip>
        </MenuButton>
        <MenuTransition>
          <MenuItems
            className="absolute z-[5] mt-1 w-max rounded-xl border bg-white shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            static
          >
            <MenuItem>
              {({ close }) => (
                <Action
                  closePopover={close}
                  publication={publication}
                  triggerConfetti={triggerConfetti}
                />
              )}
            </MenuItem>
          </MenuItems>
        </MenuTransition>
      </Menu>
    </div>
  );
};

export default Donate;
