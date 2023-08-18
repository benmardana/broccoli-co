import { useRef } from 'react';
import Dialog, { DialogRefProps } from '../../components/Dialog/Dialog';
import styles from './home.module.scss';
import InviteForm from './InviteForm';

const Home = () => {
  const dialogRef = useRef<DialogRefProps>(null);

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
        <InviteForm onSubmit={() => ({})} />
      </Dialog>
    </>
  );
};

export default Home;
