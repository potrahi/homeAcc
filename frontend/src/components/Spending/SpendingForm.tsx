import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SpendingType } from '../../types/spending';
import { RootState } from '../../store';
import { spendingActions } from '../../store/spending';
import { modalActions } from '../../store/modal';
import useInput from '../../hooks/useInput';
import { addSpending, updateSpending } from '../../api/spending';
import { convertToDateTimeLocalString } from '../../utils/format';
import './SpendingForm.css';

const SpendingForm: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { payload: modalPayload } = useSelector((state: RootState) => state.modal);
    const { user: username, user_id } = useSelector((state: RootState) => state.auth);

    const [name, handleNameChange, setName] = useInput(modalPayload?.username || username || "");
    const [date, handleDateChange, setDate] = useInput(
        modalPayload?.created_at
            ? convertToDateTimeLocalString(new Date(modalPayload.created_at))
            : convertToDateTimeLocalString(new Date())
    );
    const [amount, handleAmountChange, setAmount] = useInput(modalPayload?.amount.toString() || '');

    useEffect(() => {
        if (modalPayload) {
            setName(modalPayload.username || '');
            const formattedDate = modalPayload.created_at
                ? convertToDateTimeLocalString(new Date(modalPayload.created_at))
                : convertToDateTimeLocalString(new Date())
            setDate(formattedDate);
            setAmount(modalPayload.amount.toString());
            console.log('Original Date:', modalPayload?.created_at);
            console.log('Formatted Date:', formattedDate);
        }
    }, [modalPayload, setName, setDate, setAmount]);


    const mutation = useMutation({
        mutationFn: modalPayload ? updateSpending : addSpending,
        onSuccess: (spending: SpendingType) => {
            queryClient.invalidateQueries({ queryKey: ['spendings'] });
            const action = modalPayload
                ? spendingActions.updateSpendings
                : spendingActions.addSpendings;
            dispatch(action({ ...spending, username: username || "" }))
            dispatch(modalActions.closeModal());
            resetForm();
        },
        onError: (error: Error) => {
            alert(error.message);
        }
    })

    const resetForm = () => {
        setName('');
        setDate(convertToDateTimeLocalString(new Date()));
        setAmount('');
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !date || !amount) return;

        const newSpending: SpendingType = {
            id: modalPayload?.id,
            user_id,
            amount: parseFloat(amount),
            created_at: date,
            username: name
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