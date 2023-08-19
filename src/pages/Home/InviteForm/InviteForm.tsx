import { useForm } from 'react-hook-form';
import Validation from './Validation';

export interface InviteFormValues {
  name: string;
  email: string;
  confirmEmail: string;
}

interface InviteFormProps {
  onSubmit: (data: InviteFormValues) => void;
  isSubmitting?: boolean;
  submissionError?: string;
  className?: string;
}

const InviteForm = ({
  onSubmit,
  isSubmitting,
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
          {...register('name', { ...Validation.name })}
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
          {...register('email', { ...Validation.email })}
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
          {...register('confirmEmail', { ...Validation.confirmEmail })}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending, please wait...' : 'Send'}
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
