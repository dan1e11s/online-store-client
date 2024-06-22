import { useEffect } from 'react';
import { useProducts } from '../../store';
import ProductItem from '../ProductItem/ProductItem';

import styles from './index.module.css';

const ProductsList = () => {
  const { getProducts, activeCategory } = useProducts((state) => state);
  const products = useProducts((state) => {
    if (activeCategory === 'All Categories') {
      return state.products;
    } else {
      return state.products.filter(
        (product) => product.category === activeCategory.toLowerCase()
      );
    }
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.list}>
      {products.length !== 0 ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default ProductsList;
