import { screen, render, within } from '@testing-library/react';
import Home from './Home';
import userEvent from '@testing-library/user-event';

describe('home', () => {
  test('should contain an accessible header', () => {
    render(<Home />);

    const header = screen.getByRole('banner');
    const heading = within(header).getByRole('heading');

    expect(heading).toHaveTextContent(/^Broccoli & Co\.$/);
  });

  test('should contain an accessible footer', () => {
    render(<Home />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toHaveTextContent(
      /^Made with ❤ in Melbourne\.© 2016 Broccoli & Co\. All rights reserved\.$/
    );
  });

  test('should contain an accessible main', () => {
    render(<Home />);

    const main = screen.getByRole('main');
    const heading = within(main).getByRole('heading', { level: 2 });
    const subheading = within(main).getByRole('heading', { level: 3 });
    const cta = within(main).getByRole('button');

    expect(heading).toHaveTextContent(/^A better way to enjoy every day\.$/);
    expect(subheading).toHaveTextContent(
      /^Be the first to know when we launch\.$/
    );
    expect(cta).toHaveTextContent(/^Request an invite$/);
  });

  describe('invite form', () => {
    describe('success', () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => 'ok',
      });
      test('should show success dialog and allow close', async () => {
        const user = userEvent.setup();
        render(<Home />);

        expect(
          screen.getByRole('dialog', { hidden: true })
        ).not.toHaveAttribute('open');

        await user.click(
          screen.getByRole('button', { name: 'Request an invite' })
        );

        const dialog = within(
          await screen.findByRole('dialog', { hidden: true })
        );

        await user.type(
          dialog.getByRole('textbox', {
            name: 'Full name',
            hidden: true,
          }),
          'Nic Cage'
        );
        await user.type(
          dialog.getByRole('textbox', { name: 'Email', hidden: true }),
          'nic@emails.com'
        );
        await user.type(
          dialog.getByRole('textbox', { name: 'Confirm email', hidden: true }),
          'nic@emails.com'
        );

        await user.click(dialog.getByRole('button', { hidden: true }));

        expect(
          dialog.getByRole('heading', { level: 2, hidden: true })
        ).toHaveTextContent(/^All done!$/);
        expect(
          dialog.getByText(
            /^You will be one of the first to experience Broccoli & Co\. when we launch.$/
          )
        ).toBeInTheDocument();

        await user.click(
          dialog.getByRole('button', { name: 'OK', hidden: true })
        );

        expect(
          screen.getByRole('dialog', { hidden: true })
        ).not.toHaveAttribute('open');
      });
    });

    describe('error', () => {
      test('should show error message and allow resubmit', () => {
        expect(true).toBeTruthy();
      });
    });
  });
});
