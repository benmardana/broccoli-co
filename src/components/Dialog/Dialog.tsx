import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

interface DialogProps {
  children: React.ReactNode;
}

export interface DialogRefProps {
  open: () => void;
  close: () => void;
}

const _Dialog = (
  { children }: DialogProps,
  ref: ForwardedRef<DialogRefProps>
) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      open() {
        dialogRef.current?.showModal();
      },
      close() {
        dialogRef.current?.close();
      },
    }),
    []
  );
  return <dialog ref={dialogRef}>{children}</dialog>;
};

const Dialog = forwardRef(_Dialog);

export default Dialog;
