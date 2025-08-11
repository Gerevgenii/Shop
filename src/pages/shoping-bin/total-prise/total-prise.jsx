import { useDispatch, useSelector } from 'react-redux';
import { removeUserBin } from '../../../redux/user-reducer';
import styles from './total-prise.module.css';
import { addToHints, removeFromHints } from '../../../redux/shop-reducer';

const TotalPriseLayout = ({ totalPrise, onClick }) => {
	return (
		<div className={styles.block}>
			<div className={styles.totalPrise}>
				<h3>Общая стоимость: {totalPrise}$</h3>
				<button className={styles.button} onClick={onClick}>
					Оплатить
				</button>
			</div>
		</div>
	);
};

export const TotalPrise = ({ totalPrise }) => {
	const dispatch = useDispatch();
	const userID = useSelector((state) => state.user.userID);
	const onClick = () => {
		dispatch(removeUserBin({ userID: userID }));
		dispatch(
			addToHints({
				type: 'success',
				text: 'Спасибо за покупку!',
			}),
		);
		setTimeout(() => {
			dispatch(removeFromHints());
		}, 2000);
	};
	return <TotalPriseLayout totalPrise={totalPrise} onClick={onClick} />;
};
