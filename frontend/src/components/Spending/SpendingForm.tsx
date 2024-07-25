import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { spendingActions } from '../../store/spending';
import { modalActions } from '../../store/modal';
import './styles/SpendingForm.css';

const SpendingForm: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        date: '',
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
        console.log(name, date, amount);
        dispatch(spendingActions.addSpend({ name, date, amount: parseFloat(amount) }));
        dispatch(modalActions.closeModal());
        setFormData({ name: '', date: '', amount: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Who:
                <input type="text" name='name' value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Date:
                <input type="datetime-local" name='date' value={formData.date} onChange={handleChange} />
            </label>
            <br />
            <label>
                Amount:
                <input type="text" name='amount' value={formData.amount} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SpendingForm;