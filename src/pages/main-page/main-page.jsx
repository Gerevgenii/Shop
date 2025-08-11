import { useDispatch, useSelector } from 'react-redux';
import { Item } from './item/item';
import styles from './main-page.module.css';
import { useEffect } from 'react';
import { fetchItems } from '../../redux/shop-reducer';
import { Loader } from '../../components/loader/loader';

const MainPageLayout = ({ items }) => {
	return (
		<div className={styles.mainPage}>
			{items.map((item) => (
				<Item item={item} />
			))}
		</div>
	);
};

export const MainPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.shop.isLoading);
	const items = useSelector((state) => state.shop.items);

	useEffect(() => {
		dispatch(fetchItems());
	}, [dispatch]);

	if (isLoading) return <Loader />;
	return <MainPageLayout items={items} />;
};
