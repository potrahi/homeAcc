import type { SpendingType } from "../../types/spending";


export default function SpendingItem({ id, name, amount, date }: SpendingType) {
    return (
        <tr key={id}>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{date}</td>
        </tr>
    );
}