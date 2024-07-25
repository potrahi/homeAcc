import type { SpendingType } from "../../types/spending";


export default function SpendingItem({ id, name, amount, date }: SpendingType) {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{date}</td>
        </tr>
    );
}