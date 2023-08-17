import styles from './home.module.scss';

const Home = () => (
  <>
    <header>
      <h1>Broccoli & Co.</h1>
    </header>
    <main className={styles.main}>
      <h2>A better way to enjoy every day.</h2>
      <h3>Be the first to know when we launch.</h3>
      <button>Request an invite</button>
    </main>
    <footer>
      <p>Made with ❤ in Melbourne.</p>
      <p>© 2016 Broccoli & Co. All rights reserved.</p>
    </footer>
  </>
);

export default Home;
