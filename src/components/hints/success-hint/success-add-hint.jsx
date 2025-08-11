import styles from './success-add-hint.module.css';

export const HintSuccess = ({ text }) => {
	return (
		<div className={styles.successAddHint}>
			<p>{text}</p>
		</div>
	);
};
