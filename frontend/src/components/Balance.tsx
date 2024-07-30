import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { settingsActions } from "../store/settings";
import { useSetting } from "../hooks/useSettings";

const Balance: React.FC = () => {
    const dispatch = useDispatch();
    const { data: dbBudget, isLoading, isError } = useSetting("monthly_budget");

    useEffect(() => {
        if (dbBudget) dispatch(settingsActions.setMonthlyBudget(dbBudget));
    }, [dbBudget, dispatch]);

    const spendings = useSelector((state: RootState) => state.spending.spendings);
    const monthlyBudget = useSelector((state: RootState) => state.settings.monthlyBudget);

    if (isLoading) return <span>Loading...</span>;
    if (isError) return <span>Error loading balance</span>;

    const totalSpending = spendings.reduce((acc, item) => {
        const amount = parseFloat(item.amount.toString());
        return acc + (isNaN(amount) ? 0 : amount)
    }, 0);

    const currentBalance = monthlyBudget - totalSpending;

    const balanceColor = currentBalance < 0 ? "red" : "#333";

    return (
        <span>Balance:
            <span style={{ color: balanceColor }}>
                {isNaN(currentBalance) ? "Invalid Balance" : currentBalance.toFixed(2)}
            </span>
        </span>
    );
}

export default Balance;