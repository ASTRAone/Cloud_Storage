import React, { useLayoutEffect, useMemo, useState } from 'react';
import Popup from 'reactjs-popup';
import { EventType, PopupPosition } from 'reactjs-popup/dist/types';

import { useStyles } from '@hooks/useStyles';

import styles from './styles.module.scss';

type TooltipContentItem = JSX.Element | string | number;

type Positions = 'top' | 'bottom' | 'right' | 'left';

type Classes = {
  trigger?: string;
  tooltip?: string;
  tooltipTextItem?: string;
};

type Props = {
  color?: 'dark' | 'light';
  text: TooltipContentItem | TooltipContentItem[];
  children: React.ReactNode;
  position?: PopupPosition[];
  disabled?: boolean;
  place?: Positions;
  events?: EventType[];
  classes?: Partial<Classes>;
  moreItemsRender?: (count: number) => TooltipContentItem;
};

const POSITIONS: Record<Positions, PopupPosition[]> = {
  top: ['top center', 'bottom center'],
  bottom: ['bottom center', 'top center'],
  left: ['left center', 'right center'],
  right: ['right center', 'left center'],
};

const EVENTS: EventType[] = ['hover'];
const CONTENT_CLASS = '[role="tooltip"].popup-content svg';

export const Tooltip: React.FC<Props> = ({
  disabled,
  position,
  place = 'bottom',
  events,
  classes,
  color,
  text,
  children,
}) => {
  const cx = useStyles(styles);
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  // TODO заменить цвета
  const arrowStyle = useMemo(
    () => ({
      color: color === 'dark' ? '#303940' : '#ffffff',
    }),
    [color],
  );

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updateArrowPosition();
  }, [open]);

  const updateArrowPosition = () => {
    const arrowSvg = document.querySelector(CONTENT_CLASS);

    if (!arrowSvg) {
      return;
    }

    (arrowSvg as SVGElement).style.transform = 'translateY(25%)';
  };

  // TODO если потребуется, то можно расширить отображаемый контент
  const tooltipContent = useMemo(() => {
    if (!Array.isArray(text)) {
      return text;
    }
  }, [text]);

  return (
    <Popup
      arrow
      mouseEnterDelay={150}
      disabled={disabled}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      trigger={<div className={cx(classes?.trigger)}>{children}</div>}
      position={position || POSITIONS[place]}
      on={events || EVENTS}
      arrowStyle={arrowStyle}
      className="tooltip"
    >
      <div className={cx('tooltip', color, classes?.tooltip)}>{tooltipContent}</div>
    </Popup>
  );
};
