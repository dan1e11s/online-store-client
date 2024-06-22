import { MdOutlineShoppingCart } from 'react-icons/md';

import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        Online Store
      </div>
      <div className={styles.actions}>
        <button onClick={() => navigate('cart')}>
          <MdOutlineShoppingCart size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
