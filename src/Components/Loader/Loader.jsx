import Spinner from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <Spinner
            className={styles.spinner}
            type="Oval"
            color="#3h4h5f"
            height={50}
            width={50}
        />
    );
};

export default Loader;