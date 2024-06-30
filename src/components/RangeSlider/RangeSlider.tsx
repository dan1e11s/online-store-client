import { useEffect } from 'react';
import { useModal, useProducts } from '../../store';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './index.module.css';

const RangeSlider: React.FC = () => {
  const { products } = useProducts((state) => state);
  const { range, setRange } = useModal((state) => state);

  const handleChange = (newRange: number | number[]) => {
    if (Array.isArray(newRange) && newRange.length === 2) {
      setRange([newRange[0], newRange[1]]);
    }
  };

  useEffect(() => {
    const allPrices = products.map((item) => +item.price).sort((a, b) => a - b);
    setRange([allPrices[0], allPrices[allPrices.length - 1]]);
  }, [products]);

  return (
    <div className={styles.slider}>
      <div className={styles.priceInput}>
        <div className={styles.field}>
          <span>Min</span>
          <input
            type="number"
            className={styles.inputMin}
            value={range[0]}
            onChange={() => console.log('min value')}
          />
        </div>
        <div className={styles.separator}>-</div>
        <div className={styles.field}>
          <span>Max</span>
          <input
            type="number"
            className={styles.inputMax}
            value={range[1]}
            onChange={() => console.log('min value')}
          />
        </div>
      </div>
      <Slider
        range
        min={0}
        max={500}
        onChange={handleChange}
        defaultValue={range}
        value={range}
        trackStyle={[{ backgroundColor: 'black' }]}
        handleStyle={[
          { borderColor: 'black', outline: 'none', boxShadow: 'none' },
          { borderColor: 'black', outline: 'none', boxShadow: 'none' },
        ]}
        railStyle={{ backgroundColor: '#c9c9c9' }}
      />
    </div>
  );
};

export default RangeSlider;
