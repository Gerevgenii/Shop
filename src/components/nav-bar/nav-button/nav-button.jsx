import { NavLink } from 'react-router-dom';
import styles from './nav-button.module.css';

export const NavButton = ({ to, text }) => {
	return (
		<NavLink to={to} className={styles.button}>
			{text}
		</NavLink>
	);
};
