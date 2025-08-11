import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './register-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, registerUser } from '../../redux/user-reducer';
import { addToHints, removeFromHints } from '../../redux/shop-reducer';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RegisterFormLayout = ({ handleSubmit, errors, register, reset, onSubmit }) => {
	return (
		<div className={styles.registration}>
			<div className={`${styles.mainMyForm} ${styles.colorize}`}>
				<form className={styles.formBody} onSubmit={handleSubmit(onSubmit)}>
					<div>
						<h3>Введите email: </h3>
						{errors.email && <p>{errors.email.message}</p>}
						<input
							type="email"
							name="email"
							className={styles.inputMyForm}
							{...register('email')}
						></input>
					</div>
					<div>
						<h3>Введите имя: </h3>
						{errors.name && <p>{errors.name.message}</p>}
						<input
							type="text"
							name="name"
							className={styles.inputMyForm}
							{...register('name')}
						></input>
					</div>
					<div>
						<h3>Введите пароль: </h3>
						{errors.password && <p>{errors.password.message}</p>}
						<input
							type="password"
							className={styles.inputMyForm}
							{...register('password')}
						></input>
					</div>
					<div>
						<h3>Повторите пароль: </h3>
						{errors.confirmPassword && (
							<p>{errors.confirmPassword.message}</p>
						)}
						<input
							type="password"
							className={styles.inputMyForm}
							{...register('confirmPassword')}
						></input>
					</div>
					<div>
						<button
							type="button"
							className={styles.button}
							onClick={() => reset()}
						>
							Сбросить
						</button>
						<button
							type="submit"
							className={styles.button}
							disabled={
								errors.email ||
								errors.name ||
								errors.password ||
								errors.confirmPassword
							}
						>
							Зарегистрироваться
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const schema = yup.object().shape({
	password: yup
		.string()
		.required('Пароль обязателен')
		.matches(/^[A-ZА-Я].*$/, 'Пароль должен начинаться с заглавной буквы')
		.min(8, "Пароль должен содержать не менее 8'и символов"),
	confirmPassword: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
	email: yup.string().required('Email обязателен!'),
	name: yup
		.string()
		.required('Имя обязательно')
		.min(3, "Имя должно содержать не менее 3'х символов"),
});

export const RegisterForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		try {
			const resultAction = await dispatch(
				registerUser({
					name: data.name,
					email: data.email,
					password: data.password,
				}),
			);

			if (registerUser.fulfilled.match(resultAction)) {
				navigate('/');
			}
		} catch (err) {
			console.error(err);
		}
	};

	const registerError = useSelector((state) => state.user.error);

	useEffect(() => {
		if (registerError !== null) {
			dispatch(clearError());
			dispatch(
				addToHints({
					type: 'error',
					text: 'Пользователь с таким email уже существует',
				}),
			);
			setTimeout(() => {
				dispatch(removeFromHints());
			}, 2000);
		}
	}, [registerError, dispatch]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onTouched',
		defaultValues: {
			password: '',
			confirmPassword: '',
			email: '',
			name: '',
		},
	});
	return (
		<RegisterFormLayout
			handleSubmit={handleSubmit}
			errors={errors}
			register={register}
			reset={reset}
			onSubmit={onSubmit}
		/>
	);
};
