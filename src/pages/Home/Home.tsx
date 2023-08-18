import { useRef } from 'react';
import Dialog, { DialogRefProps } from '../../components/Dialog/Dialog';
import styles from './home.module.scss';
import InviteForm, { InviteFormValues } from './InviteForm';
import usePost from '../../hooks/usePost';

const Home = () => {
  const dialogRef = useRef<DialogRefProps>(null);
  const { post, isLoading, error } = usePost(
    'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'
  );

  const onSubmit = (data: InviteFormValues) => {
    post({ name: data.name, email: data.email });
    dialogRef.current?.close();
  };

  return (
    <>
      <header>
        <h1>Broccoli & Co.</h1>
      </header>
      <main className={styles.main}>
        <h2>A better way to enjoy every day.</h2>
        <h3>Be the first to know when we launch.</h3>
        <button onClick={() => dialogRef.current?.open()}>
          Request an invite
        </button>
      </main>
      <footer>
        <p>Made with ❤ in Melbourne.</p>
        <p>© 2016 Broccoli & Co. All rights reserved.</p>
      </footer>
      <Dialog ref={dialogRef}>
        <InviteForm
          onSubmit={onSubmit}
          submitting={isLoading}
          submissionError={error instanceof Error ? error.message : undefined}
        />
      </Dialog>
    </>
  );
};

export default Home;
