import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import styles from './dialog.module.scss';

interface DialogProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogRefProps {
  open: () => void;
  close: () => void;
}

const _Dialog = (
  { children, className }: DialogProps,
  ref: ForwardedRef<DialogRefProps>
) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      // HTML Dialog renders a backdrop pseudo element filling the screen which captures all clicks
      // on the dialog element - except those inside the dialog which will be the content type, e.g. FORM
      if ((event.target as HTMLElement)?.tagName === 'DIALOG') {
        dialogRef.current?.close();
      }
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => document.removeEventListener('click', onClickOutside);
  }, []);

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
  return (
    <dialog
      className={`${styles.dialog}${className ? ` ${className}` : ''}`}
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
};

const Dialog = forwardRef(_Dialog);

export default Dialog;
