import styles from './sign-in.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchUserByEmailAndPassword } from '../../redux/user-reducer';
import { addToHints, removeFromHints } from '../../redux/shop-reducer';
import { NavLink, useNavigate } from 'react-router-dom';

const SignInLayout = ({ email, changeEmail, password, changePassword, onSubmit }) => {
	return (
		<div className={styles.signIn}>
			<div className={`${styles.mainMyForm} ${styles.colorize}`}>
				<form className={styles.formBody} onSubmit={onSubmit}>
					<div>
						<h3>Введите email: </h3>
						<input
							type="email"
							name="email"
							value={email}
							onChange={changeEmail}
							className={styles.inputMyForm}
						></input>
					</div>
					<div>
						<h3>Введите пароль: </h3>
						<input
							type="password"
							value={password}
							onChange={changePassword}
							className={styles.inputMyForm}
						></input>
					</div>
					<div>
						<NavLink to={'/registration'} className={styles.linkButton}>
							Зарегестрироваться
						</NavLink>
						<button type="submit" className={styles.button}>
							Войти
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const changeEmail = ({ target }) => setEmail(target.value);
	const changePassword = ({ target }) => setPassword(target.value);
	const userError = useSelector((state) => state.user.error);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		data.preventDefault();
		try {
			const resultAction = await dispatch(
				fetchUserByEmailAndPassword({
					email,
					password,
				}),
			);

			if (fetchUserByEmailAndPassword.fulfilled.match(resultAction)) {
				navigate('/');
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (userError !== null) {
			dispatch(clearError());
			dispatch(
				addToHints({
					type: 'error',
					text: 'Неверный логин или пароль',
				}),
			);
			setTimeout(() => {
				dispatch(removeFromHints());
			}, 2000);
		}
	}, [dispatch, userError]);

	return (
		<SignInLayout
			email={email}
			changeEmail={changeEmail}
			password={password}
			changePassword={changePassword}
			onSubmit={onSubmit}
		/>
	);
};
