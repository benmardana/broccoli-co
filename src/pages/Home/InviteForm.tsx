import { useForm } from 'react-hook-form';

export interface InviteFormValues {
  name: string;
  email: string;
  confirmEmail: string;
}

interface InviteFormProps {
  onSubmit: (data: InviteFormValues) => void;
  submitting?: boolean;
  submissionError?: string;
  className?: string;
}

const InviteForm = ({
  onSubmit,
  submitting,
  submissionError,
  className,
}: InviteFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="invite form"
        className={className}
      >
        <input
          {...register('name', {
            validate: {
              minLength: (name) =>
                name.length >= 3 || 'Full name must be at least 3 characters',
            },
          })}
          type="text"
          name="name"
          id="name"
          aria-label="Full name"
          placeholder="Full name"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name?.message && (
          <div role="alert" aria-label="Full name error">
            {errors.name.message}
          </div>
        )}
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Email is invalid',
            },
          })}
          name="email"
          id="email"
          aria-label="Email"
          placeholder="Email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email?.message && (
          <div role="alert" aria-label="Email error">
            {errors.email.message}
          </div>
        )}
        <input
          {...register('confirmEmail', {
            required: 'Confirm email is required',
            validate: {
              matchesEmail: (email, formValues) =>
                email === formValues.email || 'Confirm email must match email',
            },
          })}
          name="confirmEmail"
          id="confirmEmail"
          aria-label="Confirm email"
          placeholder="Confirm email"
          autoComplete="email"
          aria-invalid={errors.confirmEmail ? 'true' : 'false'}
        />
        {errors.confirmEmail?.message && (
          <div role="alert" aria-label="Email confirm error">
            {errors.confirmEmail.message}
          </div>
        )}
        <button
          style={{ display: 'block' }}
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Sending, please wait...' : 'Send'}
        </button>
        {submissionError && (
          <div role="alert" aria-label="Form submission error">
            {submissionError}
          </div>
        )}
      </form>
    </>
  );
};

export default InviteForm;
