import React from 'react';
import { useDispatch } from 'react-redux';
import { spendingActions } from '../../store/spending';
import { modalActions } from '../../store/modal';
import './styles/SpendingForm.css';
import useInput from '../../hooks/useInput';

const SpendingForm: React.FC = () => {
    const dispatch = useDispatch();
    const [name, handleNameChange, setName] = useInput('');
    const [date, handleDateChange, setDate] = useInput(new Date().toISOString().slice(0, 16));
    const [amount, handleAmountChange, setAmount] = useInput('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !date || !amount) {
            return;
        }

        console.log(name, date, amount);

        dispatch(spendingActions.addSpend({ name, date, amount: parseFloat(amount) }));
        dispatch(modalActions.closeModal());
        setName('');
        setDate(new Date().toISOString().slice(0, 16));
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit} className="spending-form">
            <div className="form-group">
                <label htmlFor="name">Who:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-submit">Submit</button>
        </form>
    );
};

export default SpendingForm;