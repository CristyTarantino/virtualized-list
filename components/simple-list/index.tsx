import {ProductListItem} from '@/interfaces';
import styles from './index.module.css';

interface SimpleListProps {
    items: ProductListItem[];
}

const SimpleList = ({items}: SimpleListProps) => {
    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SimpleList;
