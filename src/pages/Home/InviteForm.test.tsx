import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InviteForm from './InviteForm';

describe('InviteForm', () => {
  describe('name field', () => {
    test('on submit should validate at least 3 chars', async () => {
      const user = userEvent.setup();

      render(<InviteForm onSubmit={() => ({})} />);

      const nameField = screen.getByRole('textbox', { name: 'Full name' });
      const submitButton = screen.getByRole('button', { name: 'Send' });

      await user.click(submitButton);

      expect(
        screen.getByRole('alert', { name: 'Full name error' })
      ).toHaveTextContent(/^Full name must be at least 3 characters$/);

      await user.type(nameField, 'a');

      await user.click(submitButton);

      expect(
        screen.queryByRole('alert', { name: 'Full name error' })
      ).toHaveTextContent(/^Full name must be at least 3 characters$/);

      await user.type(nameField, 'bc');

      await user.click(submitButton);

      expect(
        screen.queryByRole('alert', { name: 'Full name error' })
      ).toBeNull();
    });
  });

  describe('email field', () => {
    test('on submit should validate email format', async () => {
      const user = userEvent.setup();

      render(<InviteForm onSubmit={() => ({})} />);

      const emailField = screen.getByRole('textbox', { name: 'Email' });
      const submitButton = screen.getByRole('button', { name: 'Send' });

      await user.click(submitButton);

      expect(
        screen.getByRole('alert', { name: 'Email error' })
      ).toHaveTextContent(/^Email is required$/);

      await user.type(emailField, 'hello');

      await user.click(submitButton);

      expect(
        screen.queryByRole('alert', { name: 'Email error' })
      ).toHaveTextContent(/^Email is invalid$/);

      await user.type(emailField, '@emails.com');

      await user.click(submitButton);

      expect(screen.queryByRole('alert', { name: 'Email error' })).toBeNull();
    });
  });

  describe('email confirm field', () => {
    test('on submit should validate email confirm matches email', async () => {
      const user = userEvent.setup();

      render(<InviteForm onSubmit={() => ({})} />);

      const emailField = screen.getByRole('textbox', { name: 'Email' });
      const confirmEmailField = screen.getByRole('textbox', {
        name: 'Confirm email',
      });
      const submitButton = screen.getByRole('button', { name: 'Send' });

      await user.type(emailField, 'hello@emails.com');

      await user.click(submitButton);

      expect(
        screen.queryByRole('alert', { name: 'Email confirm error' })
      ).toHaveTextContent(/^Confirm email is required$/);

      await user.type(confirmEmailField, 'hello@email.com');

      await user.click(submitButton);

      expect(
        screen.queryByRole('alert', { name: 'Email confirm error' })
      ).toHaveTextContent(/^Confirm email must match email$/);
    });
  });
});
