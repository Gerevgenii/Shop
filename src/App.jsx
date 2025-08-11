import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { Hints, NavBar } from './components';
import { MainPage, ShopingBin, SignIn } from './pages';
import { RegisterForm } from './pages/registration/register-form';

const AppLayout = () => {
	return (
		<div className={styles.App}>
			<Hints />
			<NavBar />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/shopingBin" element={<ShopingBin />} />
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/registration" element={<RegisterForm />} />
			</Routes>
		</div>
	);
};

export const App = () => {
	return <AppLayout />;
};
