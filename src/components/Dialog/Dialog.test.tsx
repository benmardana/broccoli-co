import { act, render, screen, within } from '@testing-library/react';
import Dialog, { DialogRefProps } from './Dialog';
import { createRef } from 'react';
import userEvent from '@testing-library/user-event';

describe('Dialog', () => {
  test('should not be visible by default', () => {
    render(<Dialog>dialog</Dialog>);

    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    );
  });

  test('should expose a ref to control dialog', () => {
    const ref = createRef<DialogRefProps>();
    render(<Dialog ref={ref}>dialog</Dialog>);

    expect(ref.current).toHaveProperty('open');
    expect(ref.current).toHaveProperty('close');
  });

  test('should open and close', () => {
    const ref = createRef<DialogRefProps>();
    render(<Dialog ref={ref}>invisible</Dialog>);

    act(() => ref.current?.open());
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
      'open'
    );

    act(() => ref.current?.close());
    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    );
  });

  test('should render content', () => {
    const ref = createRef<DialogRefProps>();
    render(<Dialog ref={ref}>hello, world</Dialog>);

    const dialog = screen.getByRole('dialog', { hidden: true });

    expect(within(dialog).queryByText('/^hello, world$/'));
  });

  test('should close when clicking outside the dialog', async () => {
    const user = userEvent.setup();

    const ref = createRef<DialogRefProps>();
    render(<Dialog ref={ref}>hello, world</Dialog>);

    act(() => ref.current?.open());
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
      'open'
    );

    await user.click(screen.getByRole('dialog', { hidden: true }));

    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    );
  });
});
