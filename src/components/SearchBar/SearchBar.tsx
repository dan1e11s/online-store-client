import { useProducts } from '../../store';
import { ChangeEvent } from 'react';
import styles from './index.module.css';

export const SearchBar = () => {
  const { query, setQuery, getProducts } = useProducts((state) => state);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    await getProducts();
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className={styles.input}
      />
    </div>
  );
};
