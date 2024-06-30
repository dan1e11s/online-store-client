import { useCart } from '../../store';
import { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { FiPlusCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Container from '../../components/Container/Container';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

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
    withReactContent(Swal)
      .fire({
        title: 'Good job!',
        text: 'Order placed!',
        icon: 'success',
      })
      .then((res) => {
        if (res.isConfirmed) {
          navigate('/');
        }
      });
    clearCartItems();
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
                    Price: $
                    {item.product.sale !== 0
                      ? item.product.price -
                        (item.product.price * item.product.sale) / 100
                      : item.product.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
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
              <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
              <button onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCartContainer}>
            <FaShoppingCart className={styles.icon} />
            <p className={styles.message}>Cart is empty!</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
