import React, { useState } from 'react';

const SpendForm: React.FC = () => {
    const [who, setWho] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');


    const handleWhoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWho(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Who:
                <input type="text" value={who} onChange={handleWhoChange} />
            </label>
            <br />
            <label>
                Date:
                <input type="text" value={date} onChange={handleDateChange} />
            </label>
            <br />
            <label>
                Amount:
                <input type="text" value={amount} onChange={handleAmountChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SpendForm;