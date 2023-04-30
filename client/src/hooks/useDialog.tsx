import { PopupControls, usePopupControls } from '@hooks/usePopupControls';

import { Dialog } from '@components/Dialog';
import { Modal } from '@components/Modal';

type DialogProps = {
  loading?: boolean;
  classNamePrefix?: string;
  className?: string;
  title: string;
  onConfirm?: () => void;
  closeDialog: () => void;
  onOk?: () => void;
  closeOnDocumentClick?: boolean;
  closeOnEscape?: boolean;
};

type ReturnValue = PopupControls & {
  Dialog: React.FC<DialogProps>;
};

const useDialog = (): ReturnValue => {
  const { isOpened, openPopup, closePopup, togglePopup } = usePopupControls();

  const WrapperDialog = (props: DialogProps) => {
    const onClose = () => {
      props.closeDialog?.();
      closePopup();
    };

    return (
      <Modal
        open={isOpened}
        onClose={onClose}
      >
        <Dialog
          {...props}
          onSubmit={props.onConfirm}
          closeModal={onClose}
        />
      </Modal>
    );
  };
  return {
    Dialog: WrapperDialog,
    isOpened,
    openPopup,
    closePopup,
    togglePopup,
  };
};

export { useDialog };
