import { useModal } from '../../store';

// import RangeSlider from '../RangeSlider/RangeSlider';
import Colors from '../Colors/Colors';
import Sizes from '../Sizes/Sizes';
// import SortBy from '../SortBy/SortBy';
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
        <h3>Price</h3>
        {/* <RangeSlider /> */}
      </div>
      <div>
        <h3>Color</h3>
        <Colors />
      </div>
      <div>
        <h3>Size</h3>
        <Sizes />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Sort</h3>
        {/* <SortBy /> */}
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
          apply
        </button>
      </div>
    </div>
  );
};

export default Modal;
