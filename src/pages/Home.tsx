import styles from './home.module.scss';

const Home = () => (
  <>
    <header>
      <h1>Broccoli & Co.</h1>
    </header>
    <main className={styles.main}></main>
    <footer>
      <p>Made with ❤ in Melbourne.</p>
      <p>© 2016 Broccoli & Co. All rights reserved.</p>
    </footer>
  </>
);

export default Home;
