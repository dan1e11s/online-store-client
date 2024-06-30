import { useEffect, useState } from 'react';
import { useModal, useProducts } from '../../store';
import styles from './index.module.css';

const Sizes = () => {
  const [sizes, setSizes] = useState<string[]>([]);
  const { products } = useProducts((state) => state);
  const { activeSizes, setActiveSizes } = useModal((state) => state);

  useEffect(() => {
    const filteredProducts = products.map((item) => item.size);
    setSizes(Array.from(new Set(filteredProducts)));
  }, [products]);

  const handleClick = (size: string) => {
    const findSize = activeSizes.find((item) => item === size);
    if (findSize) {
      setActiveSizes(activeSizes.filter((item) => item !== size));
    } else {
      const newColors = [...activeSizes, size];
      setActiveSizes(newColors);
    }
  };

  return (
    <div className={styles.size}>
      {sizes.map((size) => (
        <button
          className={activeSizes.includes(size) ? `${styles.active}` : ''}
          onClick={() => handleClick(size)}
          key={size}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default Sizes;
