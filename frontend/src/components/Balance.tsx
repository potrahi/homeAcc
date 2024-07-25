import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Balance() {
    const balance = useSelector((state: RootState) => state.balance.balance);
    const spendings = useSelector((state: RootState) => state.spending.spendings);

    const total = spendings.reduce((acc, item) => acc + item.amount, 0);

    const currentBalance = balance - total;

    const balanceColor = currentBalance < 0 ? "red" : "#333";

    return (
        <span>Balance:
            <span style={{ color: balanceColor }}>
                {currentBalance}
            </span>
        </span>
    );
}