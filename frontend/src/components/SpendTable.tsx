import { useState, useEffect } from 'react';

interface SpendItem {
    who: string;
    amount: number;
    when: string;
}

export default function SpendTable() {
    const [spendItems, setSpendItems] = useState<SpendItem[]>([]);

    useEffect(() => {
        // Simulating API call to fetch spend items from the backend
        fetch('/api/spendItems')
            .then(response => response.json())
            .then((data: SpendItem[]) => setSpendItems(data));
    }, []);


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
                    spendItems.map((item: SpendItem, index: number) => (
                        <tr key={index}>
                            <td>{item.who}</td>
                            <td>{item.amount}</td>
                            <td>{item.when}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}