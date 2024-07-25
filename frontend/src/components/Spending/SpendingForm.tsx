import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { spendingActions } from '../../store/spending';
import { modalActions } from '../../store/modal';
import './styles/SpendingForm.css';

const SpendingForm: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        date: new Date().toISOString().slice(0, 16),
        amount: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { name, date, amount } = formData;

        if (!name || !date || !amount) {
            return;
        }

        console.log(formData);
        dispatch(spendingActions.addSpend({ name, date, amount: parseFloat(amount) }));
        dispatch(modalActions.closeModal());
        setFormData({ name: '', date: '', amount: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="spending-form">
            <div className="form-group">
                <label htmlFor="name">Who:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-submit">Submit</button>
        </form>
    );
};

export default SpendingForm;