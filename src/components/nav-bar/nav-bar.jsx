import { useDispatch, useSelector } from 'react-redux';
import styles from './nav-bar.module.css';
import { NavButton } from './nav-button/nav-button';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/user-reducer';

const NavBarLayout = ({ userID, count, userName, onClick }) => {
	return (
		<div className={styles.navBar}>
			<div className={styles.leftButtons}>
				<div className={styles.navItem}>
					<NavButton to={'/'} text={'Главная'} />
				</div>
				{userID !== '' && (
					<div className={`${styles.navItem} ${styles.bin}`}>
						<NavButton to={'/shopingBin'} text={`Корзина: ${count}`} />
					</div>
				)}
			</div>
			{userName === '' ? (
				<div className={styles.rightButtons}>
					<div className={styles.navItem}>
						<NavButton to={'/signIn'} text={'Войти'} />
					</div>
					<div className={styles.linkButton}>
						<NavButton to={'/registration'} text={'Зарегистрироваться'} />
					</div>
				</div>
			) : (
				<div className={styles.rightButtons}>
					<div className={styles.navItem}>{userName}</div>
					<div className={styles.navItem}>
						<button className={styles.exitButton} onClick={onClick}>
							Выйти
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export const NavBar = () => {
	const count = Object.entries(useSelector((state) => state.user.shopBin)).reduce(
		(acc, [, count]) => acc + Number(count),
		0,
	);
	const userID = useSelector((state) => state.user.userID);
	const userName = useSelector((state) => state.user.name);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onClick = () => {
		dispatch(clearUser());
		navigate('/');
	};
	return (
		<NavBarLayout
			userID={userID}
			count={count}
			userName={userName}
			onClick={onClick}
		/>
	);
};
