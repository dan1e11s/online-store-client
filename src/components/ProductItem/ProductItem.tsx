import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store';
import { Product } from '../../types';
import { BsCartPlusFill } from 'react-icons/bs';
import { BsCartCheckFill } from 'react-icons/bs';

import styles from './index.module.css';
import { useEffect, useState } from 'react';

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const [isHaveCart, setIsHaveCart] = useState(false);
  const { addToCart, cartItems, deleteCartItem } = useCart((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const isHave = cartItems.find((item) => item.product.id === product.id);
    isHave ? setIsHaveCart(true) : setIsHaveCart(false);
  }, [cartItems, product.id]);

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`product/${product.id}`)}
    >
      {+product.sale !== 0 && (
        <div className={styles.sale}>Sale {product.sale + '%'}</div>
      )}

      <div className={styles.image}>
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className={styles.title}>
        <p>{product.title}</p>
        {+product.sale !== 0 ? (
          <p>
            <span style={{ color: '#555555' }}>
              $
              <span style={{ textDecoration: 'line-through' }}>
                {product.price}
              </span>
            </span>{' '}
            ${product.price - Number(product.price * product.sale) / 100}
          </p>
        ) : (
          <p>${product.price}</p>
        )}
      </div>
      {isHaveCart ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCartItem(product.id);
          }}
        >
          <BsCartCheckFill size={24} color="green" />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id);
          }}
        >
          <BsCartPlusFill size={24} />
        </button>
      )}
    </div>
  );
};

export default ProductItem;
