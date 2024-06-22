import Container from '../../components/Container/Container';
import ProductsList from '../../components/ProductsList/ProductsList';
import Sidebar from '../../components/Sidebar/Sidebar';

import styles from './index.module.css';

const MainPage = () => {
  return (
    <div className={styles.main}>
      <main>
        <Container>
          <div className={styles.wrapper}>
            <Sidebar />
            <ProductsList />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default MainPage;
