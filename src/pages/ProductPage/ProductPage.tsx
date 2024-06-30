import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart, useProducts } from '../../store';

import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import styles from './index.module.css';

const ProductPage = () => {
  const [isHaveCart, setIsHaveCart] = useState(false);
  const { oneProduct, getOneProduct } = useProducts((state) => state);
  const { addToCart, cartItems, deleteCartItem } = useCart((state) => state);

  const { id } = useParams();

  useEffect(() => {
    getOneProduct(id as string);
  }, [id, getOneProduct]);

  useEffect(() => {
    const isHave = cartItems.find((item) => item.product.id === oneProduct?.id);
    isHave ? setIsHaveCart(true) : setIsHaveCart(false);
  }, [cartItems, oneProduct?.id, setIsHaveCart]);

  const handleAddBtn = (id: number) => {
    addToCart(id);
    withReactContent(Swal).fire({
      title: 'Good job!',
      text: 'Added to cart!',
      icon: 'success',
    });
  };

  const handleRemoveBtn = (id: number) => {
    deleteCartItem(id);
    withReactContent(Swal).fire({
      title: 'Good job!',
      text: 'Removed to cart!',
      icon: 'success',
    });
  };

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
                  <p>
                    Price:{' '}
                    <span className={styles.text}>${oneProduct.price}</span>{' '}
                  </p>
                  <p>
                    Category:{' '}
                    <span className={styles.text}>
                      {oneProduct.category.charAt(0).toUpperCase() +
                        oneProduct.category.slice(1)}
                    </span>
                  </p>
                  <p>
                    Size: <span className={styles.text}>{oneProduct.size}</span>
                  </p>
                  <p>
                    Color:{' '}
                    <span className={styles.text}>
                      {oneProduct.color.charAt(0).toUpperCase() +
                        oneProduct.color.slice(1)}
                    </span>
                  </p>
                  {+oneProduct.sale !== 0 && (
                    <p>
                      Sale:{' '}
                      <span className={styles.text}>{oneProduct.sale}%</span>{' '}
                    </p>
                  )}
                </div>
                <p className={styles.description}>{oneProduct.description}</p>
                {isHaveCart ? (
                  <button
                    className={styles.btn}
                    onClick={() => handleRemoveBtn(oneProduct.id)}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className={styles.btn}
                    onClick={() => handleAddBtn(oneProduct.id)}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Container>
      </main>
    </div>
  );
};

export default ProductPage;
