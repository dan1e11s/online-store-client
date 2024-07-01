import { useCart } from '../../store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';

import { MdDelete } from 'react-icons/md';
import { FiPlusCircle } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';

import styles from './index.module.css';

const CartPage = () => {
  const { cartItems, getCartItems, deleteCartItem, addToCart, clearCartItems } =
    useCart((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        (item.product.sale !== 0
          ? item.product.price - (item.product.price * item.product.sale) / 100
          : item.product.price) *
          item.quantity
      );
    }, 0);
  };

  const placeOrder = () => {
    clearCartItems();
    navigate('/');
  };

  return (
    <div className={styles.cartPage}>
      <Container>
        {cartItems.length > 0 ? (
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.product.images[0]} alt={item.product.title} />
                <div>
                  <h3>{item.product.title}</h3>
                  <p>
                    Цена: $
                    {item.product.sale !== 0
                      ? item.product.price -
                        (item.product.price * item.product.sale) / 100
                      : item.product.price}
                  </p>
                  <p>Количество: {item.quantity}</p>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => addToCart(item.product.id)}>
                    <FiPlusCircle size={24} />
                  </button>
                  <button onClick={() => deleteCartItem(item.product.id)}>
                    <MdDelete size={24} color="red" />
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.cartSummary}>
              <h3>Сумма: ${getTotalPrice().toFixed(2)}</h3>
              <button onClick={placeOrder}>Заказать</button>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCartContainer}>
            <FaShoppingCart className={styles.icon} />
            <p className={styles.message}>Корзина пустая!</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
