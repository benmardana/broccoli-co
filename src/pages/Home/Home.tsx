import { useRef } from 'react';
import Dialog, { DialogRefProps } from '../../components/Dialog/Dialog';
import styles from './home.module.scss';
import InviteForm, { InviteFormValues } from './InviteForm';
import usePost from '../../hooks/usePost';

const Home = () => {
  const dialogRef = useRef<DialogRefProps>(null);
  const { post, isLoading, error, response } = usePost<
    Pick<InviteFormValues, 'name' | 'email'>,
    string
  >(
    'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'
  );

  const onSubmit = (data: InviteFormValues) => {
    post({ name: data.name, email: data.email });
  };

  const submissionError =
    error instanceof Error
      ? error.message.replace('Bad Request: ', '')
      : undefined;

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.primaryHeading}>Broccoli & Co.</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.mainHeading}>
          A better way
          <br /> to enjoy every day.
        </h2>
        <h3 className={styles.mainSubheading}>
          Be the first to know when we launch.
        </h3>
        <button
          onClick={() => dialogRef.current?.open()}
          className={styles.mainCTA}
        >
          Request an invite
        </button>
      </main>
      <footer className={styles.footer}>
        <p>Made with ❤ in Melbourne.</p>
        <p>© 2016 Broccoli & Co. All rights reserved.</p>
      </footer>
      <Dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogContent}>
          {response ? (
            <>
              <h2 className={styles.dialogHeading}>All done!</h2>
              <div className={styles.dialogSuccessContent}>
                <p className={styles.dialogSuccessMessage}>
                  You will be one of the first to experience Broccoli & Co. when
                  we launch.
                </p>
                <button onClick={() => dialogRef.current?.close()}>OK</button>
              </div>
            </>
          ) : (
            <>
              <h2 className={styles.dialogHeading}>Request an invite</h2>
              <InviteForm
                onSubmit={onSubmit}
                submitting={isLoading}
                submissionError={submissionError}
                className={styles.inviteForm}
              />
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Home;
