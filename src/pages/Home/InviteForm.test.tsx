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

  describe('submit', () => {
    test('when fields are invalid should not call onSubmit', async () => {
      const onSubmit = vi.fn();

      const user = userEvent.setup();

      render(<InviteForm onSubmit={onSubmit} />);

      await user.click(screen.getByRole('button'));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    test('when fields are valid should call onSubmit', async () => {
      const onSubmit = vi.fn();

      const user = userEvent.setup();

      render(<InviteForm onSubmit={onSubmit} />);
      await user.type(
        screen.getByRole('textbox', { name: 'Full name' }),
        'Nic Cage'
      );
      await user.type(
        screen.getByRole('textbox', { name: 'Email' }),
        'nic@emails.com'
      );
      await user.type(
        screen.getByRole('textbox', { name: 'Confirm email' }),
        'nic@emails.com'
      );

      await user.click(screen.getByRole('button'));

      expect(onSubmit).toHaveBeenCalled();
    });

    test('while submitting is true button should be disabled and show alt text', () => {
      render(<InviteForm onSubmit={() => ({})} submitting />);

      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByRole('button')).toHaveTextContent(
        /^Sending, please wait\.\.\.$/
      );
    });

    test('should display submission error', () => {
      render(
        <InviteForm
          onSubmit={() => ({})}
          submissionError="There was a problem"
        />
      );

      expect(
        screen.getByRole('alert', { name: 'Form submission error' })
      ).toHaveTextContent('There was a problem');
    });
  });
});
