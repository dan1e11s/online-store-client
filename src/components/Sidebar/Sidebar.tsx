import { useProducts } from '../../store';

import styles from './index.module.css';

const Sidebar = () => {
  const { activeCategory, setActiveCategory } = useProducts((state) => state);

  const categories = [
    'All Categories',
    'New',
    'Sale',
    'Mans',
    'Womans',
    'Kids',
  ];

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
