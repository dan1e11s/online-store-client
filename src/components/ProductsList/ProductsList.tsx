import { useEffect } from 'react';
import { useModal, useProducts } from '../../store';
import ProductItem from '../ProductItem/ProductItem';

import styles from './index.module.css';
import Loader from '../Loader/Loader';

const ProductsList = () => {
  const { getProducts, activeCategory } = useProducts((state) => state);
  const { filters } = useModal((state) => state);

  const products = useProducts((state) => {
    let filteredProducts = state.products;

    if (activeCategory !== 'All Categories') {
      if (activeCategory === 'New') {
        filteredProducts = filteredProducts.filter(
          (product) => product.isNew === true
        );
      } else if (activeCategory === 'Sale') {
        filteredProducts = filteredProducts.filter(
          (product) => +product.sale !== 0
        );
      } else {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === activeCategory.toLowerCase()
        );
      }
    }

    if (filters?.range && filters.range.length === 2) {
      const [minPrice, maxPrice] = filters.range;
      filteredProducts = filteredProducts.filter(
        (product) => +product.price >= minPrice && +product.price <= maxPrice
      );
    }

    if (filters?.activeColors && filters.activeColors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.activeColors.includes(product.color)
      );
    }

    if (filters?.activeSizes && filters.activeSizes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.activeSizes.includes(product.size)
      );
    }

    if (filters?.sortOption) {
      if (filters.sortOption === 'increasing price') {
        filteredProducts = filteredProducts.sort((a, b) => +a.price - +b.price);
      } else if (filters.sortOption === 'descending price') {
        filteredProducts = filteredProducts.sort((a, b) => +b.price - +a.price);
      }
    }

    return filteredProducts;
  });

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className={styles.list}>
      {products.length !== 0 ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductsList;
