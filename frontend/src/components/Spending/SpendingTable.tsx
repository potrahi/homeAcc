import { useSelector } from 'react-redux';
import SpendingItem from './SpendingItem';
import type { SpendingType } from '../../types/spending';
import { RootState } from '../../store';
import './SpendingTable.css';
import { useFetchSpendings } from '../../hooks/useFetchSpendings';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { spendingActions } from '../../store/spending';
import { getCurrentMonthSpendings } from '../../utils/spendings';

export default function SpendingTable() {
    const dispatch = useDispatch();
    const spendings = useSelector((state: RootState) => state.spending.spendings);

    const { data, error, isLoading } = useFetchSpendings();

    useEffect(() => {
        if (data) {
            const currentMonthSpendings = getCurrentMonthSpendings(data);
            dispatch(spendingActions.setSpendings(currentMonthSpendings));
        }
    }, [data, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Who</th>
                    <th>Amount</th>
                    <th>When</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    spendings.map((item: SpendingType, index: number) => (
                        <SpendingItem
                            key={index}
                            id={item.id}
                            username={item.username}
                            amount={item.amount}
                            created_at={new Date(item.created_at).toLocaleString()}
                        />
                    ))
                }
            </tbody>
        </table>
    );
}