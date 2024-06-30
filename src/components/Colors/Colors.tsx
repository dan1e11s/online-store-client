import { useEffect, useState } from 'react';
import { useModal, useProducts } from '../../store';
import styles from './index.module.css';

interface ColorCount {
  title: string;
  quantity: number;
}

const Colors = () => {
  const [colors, setColors] = useState<ColorCount[]>([]);

  const { products } = useProducts((state) => state);
  const { activeColors, setActiveColors } = useModal((state) => state);

  const getColors = (colors: string[]) => {
    const colorsCountMap: { [key: string]: number } = {};

    colors.forEach((color: string) => {
      if (colorsCountMap[color]) {
        colorsCountMap[color]++;
      } else {
        colorsCountMap[color] = 1;
      }
    });

    const result: ColorCount[] = Object.keys(colorsCountMap).map((color) => ({
      title: color,
      quantity: colorsCountMap[color],
    }));

    return result;
  };

  useEffect(() => {
    const filteredProducts = products.map((item) => item.color);
    setColors(getColors(filteredProducts));
  }, [products]);

  const handleClick = (color: string) => {
    const findColor = activeColors.find((item) => item === color);

    if (findColor) {
      setActiveColors(activeColors.filter((item) => item !== color));
    } else {
      const newColors = [...activeColors, color];
      setActiveColors(newColors);
    }
  };

  return (
    <div className={styles.color}>
      {colors.map((color, i) => (
        <button
          className={
            activeColors.includes(color.title) ? `${styles.active}` : ''
          }
          onClick={() => handleClick(color.title)}
          key={i}
        >{`${color.title.charAt(0).toUpperCase() + color.title.slice(1)} (${
          color.quantity
        })`}</button>
      ))}
    </div>
  );
};

export default Colors;
