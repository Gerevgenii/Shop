import { useDispatch, useSelector } from 'react-redux';
import styles from './count-panel.module.css';
import {
	removeItemFromUserBin,
	updateItemInUserBin,
} from '../../../../../redux/user-reducer';
import { useState } from 'react';
import { DeleteButton } from './delete-button/delete-button';
import { addToHints, removeFromHints } from '../../../../../redux/shop-reducer';

const CountPanelLayout = ({
	decreaseCount,
	count,
	onChange,
	increaseCount,
	isPossibleToDelete,
	deleteItem,
}) => {
	return (
		<div className={styles.countPanel}>
			<button className={styles.button} onClick={decreaseCount}>
				-
			</button>
			<input
				type="text"
				className={styles.input}
				value={count}
				onChange={onChange}
			></input>
			<button className={styles.button} onClick={increaseCount}>
				+
			</button>
			{isPossibleToDelete && <DeleteButton deleteItem={deleteItem} />}
		</div>
	);
};

export const CountPanel = ({ itemID, isPossibleToDelete }) => {
	const itemCount = useSelector((state) => state.user.shopBin)[itemID];
	const itemName = useSelector((state) => state.shop.items).find(
		(item) => item.itemID === itemID,
	).name;
	const userID = useSelector((state) => state.user.userID);
	const dispatch = useDispatch();

	const [count, setCount] = useState(Number(itemCount));

	const doDispatch = (val) => {
		if (Number(val) === 0) {
			dispatch(
				removeItemFromUserBin({
					userID: userID,
					productId: itemID,
				}),
			);
		} else {
			dispatch(
				updateItemInUserBin({
					userID: userID,
					productId: itemID,
					quantity: Number(val) - itemCount,
				}),
			);
			if (Number(val) - itemCount > 0) {
				dispatch(
					addToHints({
						type: 'success',
						text: `Теперь колличество товара "${itemName}": ${Number(val)} `,
					}),
				);
				setTimeout(() => {
					dispatch(removeFromHints());
				}, 2000);
			}
		}
	};

	const onChange = ({ target }) => {
		setCount(target.value);
		doDispatch(target.value);
	};

	const decreaseCount = () => {
		setCount(count - 1);
		doDispatch(itemCount - 1);
	};

	const increaseCount = () => {
		setCount(count + 1);
		doDispatch(itemCount + 1);
	};
	const deleteItem = () => {
		setCount(0);
		dispatch(
			removeItemFromUserBin({
				userID: userID,
				productId: itemID,
			}),
		);
	};

	return (
		<CountPanelLayout
			decreaseCount={decreaseCount}
			count={count}
			onChange={onChange}
			increaseCount={increaseCount}
			isPossibleToDelete={isPossibleToDelete}
			deleteItem={deleteItem}
		/>
	);
};
