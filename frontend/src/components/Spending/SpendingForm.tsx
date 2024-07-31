import React from 'react';
import { useDispatch } from 'react-redux';
import { spendingActions } from '../../store/spending';
import { modalActions } from '../../store/modal';
import './SpendingForm.css';
import useInput from '../../hooks/useInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSpending } from '../../api/spending';
import { SpendingType } from '../../types/spending';

const SpendingForm: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const username = useSelector((state: RootState) => state.auth.user);
    const user_id = useSelector((state: RootState) => state.auth.user_id);

    const [name, handleNameChange, setName] = useInput(username || "");
    const [date, handleDateChange, setDate] = useInput(new Date().toISOString().slice(0, 16));
    const [amount, handleAmountChange, setAmount] = useInput('');

    const mutation = useMutation({
        mutationFn: addSpending,
        onSuccess: (newSpending: SpendingType) => {
            queryClient.invalidateQueries({ queryKey: ['spendings'] });
            dispatch(spendingActions.addSpendings({
                ...newSpending, username: username || ''
            }));
            dispatch(modalActions.closeModal());
            setName('');
            setDate(new Date().toISOString().slice(0, 16));
            setAmount('');
        },
        onError: (error: Error) => {
            alert(error.message);
        }
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !date || !amount) {
            return;
        }

        console.log(name, date, amount);
        const newSpending: SpendingType = {
            user_id,
            amount: parseFloat(amount),
            created_at: date
        };
        mutation.mutate(newSpending);
    }

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
                    readOnly={!!username}
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