import { MdOutlineShoppingCart } from 'react-icons/md';

import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store';
import { useEffect } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';

const Navbar = () => {
  const { cartItems, itemCount, setItemCount } = useCart((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    setItemCount(cartItems.length);
  }, [cartItems.length, setItemCount]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        Fake Shop
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <div className={styles.actions}>
        <button onClick={() => navigate('cart')} className={styles.cartButton}>
          <MdOutlineShoppingCart size={24} />
          {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
