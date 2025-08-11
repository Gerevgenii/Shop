import styles from './shoping-bin.module.css';
import { useSelector } from 'react-redux';
import { Item } from '../main-page/item/item';
import { TotalPrise } from './total-prise/total-prise';

const ShopingBinLayout = ({ totalPrise, userShopingBin, items }) => {
	return (
		<div className={styles.shopingBin}>
			{totalPrise !== 0 ? (
				<>
					<ul className={styles.binItems}>
						{Object.entries(userShopingBin).map(([curItemID, count]) => {
							const item = items.find(
								(currItem) => currItem.itemID === curItemID,
							);
							return (
								<Item
									item={item}
									key={item.itemID}
									totalAmount={Number(item.amount) * Number(count)}
									isPossibleToDelete={true}
								/>
							);
						})}
					</ul>
					<TotalPrise totalPrise={totalPrise} />
				</>
			) : (
				<div className={styles.emptyBin}>Корзина пустует...</div>
			)}
		</div>
	);
};

export const ShopingBin = () => {
	const userShopingBin = useSelector((state) => state.user.shopBin);
	const items = useSelector((state) => state.shop.items);
	const totalPrise = Object.entries(userShopingBin).reduce(
		(acc, [curItemID, count]) =>
			acc +
			Number(items.find((currItem) => currItem.itemID === curItemID).amount) *
				Number(count),
		0,
	);

	return (
		<ShopingBinLayout
			totalPrise={totalPrise}
			userShopingBin={userShopingBin}
			items={items}
		/>
	);
};
