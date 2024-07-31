import { useSelector } from 'react-redux';
import SpendingItem from './SpendingItem';
import type { SpendingType } from '../../types/spending';
import { RootState } from '../../store';
import './SpendingTable.css';
import { useFetchSpendings } from '../../hooks/useFetchSpendings';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { spendingActions } from '../../store/spending';

export default function SpendingTable() {
    const dispatch = useDispatch();
    const spendings = useSelector((state: RootState) => state.spending.spendings);

    const { data, error, isLoading } = useFetchSpendings();

    useEffect(() => {
        if (data) dispatch(spendingActions.setSpendings(data));
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
                    <th>#</th>
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
                            username={item.username}
                            amount={item.amount}
                            created_at={item.created_at}
                        />
                    ))
                }
            </tbody>
        </table>
    );
}