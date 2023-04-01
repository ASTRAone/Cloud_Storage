import React, { useMemo, useState } from 'react';
import { EventType } from 'reactjs-popup/dist/types';

import { useStyles } from '@hooks/useStyles';

import { Tooltip } from '@components/Tooltip';

import styles from './TextShorter.module.scss';

type Props = {
  className?: string;
  tooltip?: boolean;
  clickEvent?: boolean;
  children?: JSX.Element;
};

const TT_EVENTS: EventType[] = ['focus', 'hover'];

const TextShorter: React.FC<Props> = ({ tooltip, className, children, clickEvent }) => {
  const cx = useStyles(styles);
  const tooltipContent = <>{children}</>;

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const tooltipEvents = useMemo(() => {
    const newEvents = TT_EVENTS;
    if (clickEvent) {
      newEvents.push('click');
    }

    return newEvents;
  }, [TT_EVENTS, clickEvent]);

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowTooltip(event.currentTarget.scrollWidth > event.currentTarget.clientWidth);
  };

  if (tooltip && showTooltip) {
    return (
      <div className={cx(className, 'wrapper')}>
        <Tooltip
          place="bottom"
          events={tooltipEvents}
          text={tooltipContent}
        >
          <div
            className={cx('content')}
            onMouseEnter={tooltip ? onMouseEnter : undefined}
          >
            {children}
          </div>
        </Tooltip>
      </div>
    );
  }

  return (
    <div
      className={cx(className, 'content', 'wrapper')}
      onMouseEnter={tooltip ? onMouseEnter : undefined}
    >
      {children}
    </div>
  );
};

export { TextShorter };
