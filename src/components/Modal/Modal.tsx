import { useModal } from '../../store';

import RangeSlider from '../RangeSlider/RangeSlider';
import Colors from '../Colors/Colors';
import Sizes from '../Sizes/Sizes';
import SortBy from '../SortBy/SortBy';
import { IoClose } from 'react-icons/io5';

import styles from './index.module.css';

const Modal = () => {
  const {
    setFilters,
    range,
    activeColors,
    activeSizes,
    sortOption,
    setCloseModal,
  } = useModal((state) => state);

  return (
    <div className={styles.modal}>
      <div className={styles.close} onClick={setCloseModal}>
        <IoClose size={24} />
      </div>
      <div>
        <h3>Цена</h3>
        <RangeSlider />
      </div>
      <div className={styles.color}>
        <h3>Цвет</h3>
        <Colors />
      </div>
      <div className={styles.size}>
        <h3>Размер</h3>
        <Sizes />
      </div>
      <div className={styles.sortOp}>
        <h3 style={{ marginBottom: '5px' }}>Сортировать по</h3>
        <SortBy />
      </div>
      <div className={styles.apply}>
        <button
          onClick={() => {
            setFilters({
              range,
              activeColors,
              activeSizes,
              sortOption,
            });
            setCloseModal();
          }}
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default Modal;
