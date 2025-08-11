import { useDispatch, useSelector } from 'react-redux';
import styles from './add-button.module.css';
import { addToHints, removeFromHints } from '../../../../redux/shop-reducer';
import { updateItemInUserBin } from '../../../../redux/user-reducer';
import { CountPanel } from './count-panel/count-panel';

export const AddButtonLayout = ({ onClick, itemInfo, itemID, isPossibleToDelete }) => {
	return (
		<>
			{itemInfo === undefined ? (
				<button className={styles.addButton} onClick={onClick}>
					В корзину
				</button>
			) : (
				<CountPanel itemID={itemID} isPossibleToDelete={isPossibleToDelete} />
			)}
		</>
	);
};

export const AddButton = ({ itemID, isPossibleToDelete }) => {
	const userID = useSelector((state) => state.user.userID);
	const itemInfo = useSelector((state) => state.user.shopBin)[itemID];
	const dispatch = useDispatch();
	const onClick = async () => {
		if (userID !== '') {
			dispatch(
				updateItemInUserBin({
					userID: userID,
					productId: itemID,
					quantity: 1,
				}),
			);
		}
		dispatch(
			addToHints({
				type: userID === '' ? 'error' : 'success',
				text:
					userID === ''
						? 'Для добавления в корзину, пожалуйста, войдите или зарегистрируйтесь'
						: `Успешно добавился 1 товар`,
			}),
		);
		setTimeout(() => {
			dispatch(removeFromHints());
		}, 2000);
	};
	return (
		<AddButtonLayout
			onClick={onClick}
			itemInfo={itemInfo}
			itemID={itemID}
			isPossibleToDelete={isPossibleToDelete}
		/>
	);
};
