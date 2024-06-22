import styles from './index.module.css';

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
