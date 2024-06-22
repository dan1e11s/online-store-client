import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store';
import { Product } from '../../types';
import { BsCartPlusFill } from 'react-icons/bs';

import styles from './index.module.css';

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const { addToCart } = useCart((state) => state);
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`product/${product.id}`)}
    >
      <div className={styles.image}>
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className={styles.title}>
        <p>{product.title}</p>
        <p>${product.price}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product.id);
        }}
      >
        <BsCartPlusFill size={24} />
      </button>
    </div>
  );
};

export default ProductItem;
