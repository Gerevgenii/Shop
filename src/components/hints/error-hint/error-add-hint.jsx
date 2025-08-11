import styles from './error-add-hint.module.css';

export const HintError = ({ text }) => {
	return (
		<div className={styles.errorAddHint}>
			<p>{text}</p>
		</div>
	);
};
