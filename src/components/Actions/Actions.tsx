import { useModal } from '../../store';
import styles from './index.module.css';

const Actions = () => {
  const { setOpenModal } = useModal((state) => state);

  return (
    <div className={styles.actions}>
      <button onClick={setOpenModal}>Фильтрация</button>
    </div>
  );
};

export default Actions;
