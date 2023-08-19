import { InviteFormValues } from './InviteForm';

const Validation = {
  name: {
    validate: {
      minLength: (name: string) =>
        name.length >= 3 || 'Full name must be at least 3 characters',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email is invalid',
    },
  },
  confirmEmail: {
    required: 'Confirmation email is required',
    validate: {
      matchesEmail: (email: string, formValues: InviteFormValues) =>
        email === formValues.email || 'Confirmation email must match email',
    },
  },
};

export default Validation;
