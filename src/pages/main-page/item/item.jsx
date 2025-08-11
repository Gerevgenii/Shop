import { AddButton } from './add-button';
import styles from './item.module.css';

export const Item = ({ item, totalAmount, isPossibleToDelete }) => {
	return (
		<div className={styles.item}>
			<div className={styles.mainInfo}>
				<h2>{item.name}</h2>
				<h2>{item.amount}$</h2>
			</div>
			<h3>{item.description}</h3>
			<h3>Tag: {item.tag}</h3>
			{totalAmount && <h3>Total prise: {totalAmount}</h3>}
			<div className={styles.addButton1}>
				<AddButton itemID={item.itemID} isPossibleToDelete={isPossibleToDelete} />
			</div>
		</div>
	);
};
