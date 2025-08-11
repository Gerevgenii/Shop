import { useSelector } from 'react-redux';
import { HintError } from './error-hint';
import styles from './hints.module.css';
import { HintSuccess } from './success-hint';

const HintsLayout = ({ hints }) => {
	return (
		<div className={`${styles.hints} ${hints.length !== 0 ? styles.show : ''}`}>
			{hints.map(({ type, text }) =>
				type === 'error' ? (
					<HintError text={text} />
				) : (
					<HintSuccess text={text} />
				),
			)}
		</div>
	);
};

export const Hints = () => {
	const hints = useSelector((state) => state.shop.hints);
	return <HintsLayout hints={hints} />;
};
