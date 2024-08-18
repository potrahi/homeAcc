import React from "react"

interface TableProps<T> {
    headers: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
    keyExtractor: (item: T, index: number | string) => string | number;
}

const Table = <T,>({ headers, data, renderRow, keyExtractor }: TableProps<T>) => {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <React.Fragment key={keyExtractor(item, index)}>
                        {renderRow(item, index)}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default Table;