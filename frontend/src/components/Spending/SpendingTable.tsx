import { useSelector } from 'react-redux';
import SpendingItem from './SpendingItem';
import type { SpendingType } from '../../types/spending';
import { RootState } from '../../store';

export default function SpendingTable() {
    const spendings = useSelector((state: RootState) => state.spending.spendings);

    return (
        <table>
            <thead>
                <tr>
                    <th>Who</th>
                    <th>Amount</th>
                    <th>When</th>
                </tr>
            </thead>
            <tbody>
                {
                    spendings.map((item: SpendingType, index: number) => (
                        <SpendingItem
                            key={index}
                            id={item.id}
                            name={item.name}
                            amount={item.amount}
                            date={item.date}
                        />
                    ))
                }
            </tbody>
        </table>
    );
}