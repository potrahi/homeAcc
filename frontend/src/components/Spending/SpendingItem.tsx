import type { SpendingType } from "../../types/spending";


export default function SpendingItem({ id, username, amount, created_at }: SpendingType) {
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{amount}</td>
            <td>{created_at}</td>
        </tr>
    );
}