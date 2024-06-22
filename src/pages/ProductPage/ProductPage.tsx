import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../store';

import Container from '../../components/Container/Container';

import styles from './index.module.css';

const ProductPage = () => {
  const { oneProduct, getOneProduct } = useProducts((state) => state);

  const { id } = useParams();

  useEffect(() => {
    getOneProduct(id as string);
  }, [id]);

  return (
    <div>
      <main className={styles.main}>
        <Container>
          {oneProduct ? (
            <div className={styles.card}>
              <div className={styles.image}>
                <img src={oneProduct.images[0]} alt={oneProduct.title} />
              </div>
              <div className={styles.content}>
                <h2>{oneProduct.title}</h2>
                <div className={styles.parametres}>
                  <p>Price: ${oneProduct.price}</p>
                  <p>
                    Category:{' '}
                    {oneProduct.category.charAt(0).toUpperCase() +
                      oneProduct.category.slice(1)}
                  </p>
                </div>
                <p className={styles.description}>{oneProduct.description}</p>
                <button className={styles.btn}>Add To Cart</button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default ProductPage;
