import { Product } from '../types';

const useCategory = (products: Product[]): string[] => {
  const categories = products
    .map((product) => product.category)
    .filter((category, index, self) => self.indexOf(category) === index)
    .map((category) => category.charAt(0).toUpperCase() + category.slice(1));

  categories.unshift('All Categories');

  return categories;
};

export default useCategory;
