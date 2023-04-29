import { Dialog } from '@components/Dialog';
import { Modal } from '@components/Modal';
import { DialogProps } from '@components/Dialog/Dialog';

type ReturnValue = {
  openDialog: (props: DialogProps) => void;
};

const useDialog = (): ReturnValue => {
  const WrapperDialog = (props: DialogProps) => (
    <Modal open={props.isOpen}>
      <Dialog
        {...props}
        onSubmit={props.onSubmit}
      />
    </Modal>
  );
  return {
    openDialog: WrapperDialog,
  };
};

export { useDialog };
