import Actions from '../../components/Actions/Actions';
import Container from '../../components/Container/Container';
import Modal from '../../components/Modal/Modal';
import ProductsList from '../../components/ProductsList/ProductsList';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useModal } from '../../store';

import styles from './index.module.css';

const MainPage = () => {
  const { isModal } = useModal((state) => state);

  return (
    <div className={styles.main}>
      {isModal && <div className={styles.overlay}></div>}
      <main>
        {isModal && <Modal />}
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.leftContent}>
              <Actions />
              <Sidebar />
            </div>
            <ProductsList />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default MainPage;
