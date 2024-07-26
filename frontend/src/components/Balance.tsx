import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Balance() {
    const balance = useSelector((state: RootState) => state.balance.balance);
    const spendings = useSelector((state: RootState) => state.spending.spendings);

    const total = spendings.reduce((acc, item) => {
        const amount = parseFloat(item.amount.toString());
        return acc + (isNaN(amount) ? 0 : amount)
    }, 0)

    const currentBalance = balance - total;

    const balanceColor = currentBalance < 0 ? "red" : "#333";

    return (
        <span>Balance:
            <span style={{ color: balanceColor }}>
                {isNaN(currentBalance) ? "Invalid Balance" : currentBalance.toString()}
            </span>
        </span>
    );
}