import { act, render, screen, within } from '@testing-library/react';
import Dialog, { DialogRefProps } from './Dialog';
import { createRef } from 'react';

describe('Dialog', () => {
  test('should not be visible by default', () => {
    render(<Dialog>dialog</Dialog>);

    expect(screen.queryByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    );
  });

  test('should expose a ref to control dialog', () => {
    const ref = createRef<DialogRefProps>();
    render(<Dialog ref={ref}>dialog</Dialog>);

    expect(screen.queryByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    );

    expect(ref.current).toHaveProperty('open');
    expect(ref.current).toHaveProperty('close');
  });

  test('should open and close', async () => {
    const ref = createRef<DialogRefProps>();
    render(<Dialog ref={ref}>invisible</Dialog>);

    expect(screen.queryByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    );

    act(() => ref.current?.open());
    expect(await screen.findByRole('dialog', { hidden: true })).toHaveAttribute(
      'open'
    );

    act(() => ref.current?.close());
    expect(
      await screen.findByRole('dialog', { hidden: true })
    ).not.toHaveAttribute('open');
  });

  test('should render content', async () => {
    const ref = createRef<DialogRefProps>();
    render(<Dialog ref={ref}>hello, world</Dialog>);

    const dialog = await screen.findByRole('dialog', { hidden: true });

    expect(within(dialog).queryByText('/^hello, world$/'));
  });
});
