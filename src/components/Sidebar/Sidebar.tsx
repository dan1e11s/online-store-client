import useCategory from '../../hooks/use-category';
import { useProducts } from '../../store';

import styles from './index.module.css';

const Sidebar = () => {
  const { products, activeCategory, setActiveCategory } = useProducts(
    (state) => state
  );
  const categories = useCategory(products || []);

  return (
    <div className={styles.sidebar}>
      {categories.length !== 0 &&
        categories.map((tag) => (
          <div
            className={`${styles.tag} ${
              tag === activeCategory ? styles.active : ''
            }`}
            key={tag}
            onClick={() => setActiveCategory(tag)}
          >
            {tag}
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
