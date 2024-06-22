import { Link } from 'react-router-dom';
import styles from './index.module.css';

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h1>Error 404</h1>
      <p>Sorry, something went wrong.</p>
      <Link to="/" className={`${styles.btn} ${styles.btnPrimary}`}>
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
