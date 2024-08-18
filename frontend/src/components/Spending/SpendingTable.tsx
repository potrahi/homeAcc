import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpendingType } from '../../types/spending';
import { RootState } from '../../store';
import { spendingActions } from '../../store/spending';
import { getCurrentMonthSpendings } from '../../utils/spendings';
import { useFetchSpendings } from '../../hooks/useFetchSpendings';
import SpendingItem from './SpendingItem';
import Table from '../UI/Table';
import './SpendingTable.css';

interface SpendingTableProps {
    onEditDeleteSpending: (isDelete: boolean) => void;
}

const SpendingTable: React.FC<SpendingTableProps> = ({ onEditDeleteSpending }) => {
    const dispatch = useDispatch();
    const spendings = useSelector((state: RootState) => state.spending.spendings);

    const { data, error, isLoading } = useFetchSpendings();

    useEffect(() => {
        if (data) {
            const currentMonthSpendings = getCurrentMonthSpendings(data).sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            dispatch(spendingActions.setSpendings(currentMonthSpendings));
        }
    }, [data, dispatch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const headers = ["Who", "Amount", "When", ""];

    const renderRow = (item: SpendingType) => (
        item.id && (
            <tr key={item.id}>
                <SpendingItem
                    id={item.id}
                    username={item.username}
                    amount={item.amount}
                    created_at={new Date(item.created_at).toLocaleString()}
                    onEditDelete={onEditDeleteSpending}
                />
            </tr>
        )
    );


    return (
        <Table<SpendingType>
            headers={headers}
            data={spendings}
            keyExtractor={(item) => item.id || ""}
            renderRow={renderRow}
        />
    );
}

export default SpendingTable;