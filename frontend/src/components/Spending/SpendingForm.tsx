import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SpendingType } from '../../types/spending';
import { RootState } from '../../store';
import { spendingActions } from '../../store/spending';
import { modalActions } from '../../store/modal';
import useInput from '../../hooks/useInput';
import Form from '../UI/Form';
import { addSpending, updateSpending } from '../../api/spending';
import { convertToDateTimeLocalString, parseDateString } from '../../utils/date';
import './SpendingForm.css';

const SpendingForm: React.FC = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { payload: modalPayload } = useSelector((state: RootState) => state.modal);
    const { user: username, user_id } = useSelector((state: RootState) => state.auth);

    const [name, handleNameChange, setName] = useInput(modalPayload?.username || username || "");
    const [date, handleDateChange, setDate] = useInput(
        modalPayload?.created_at
            ? convertToDateTimeLocalString(parseDateString(modalPayload.created_at))
            : convertToDateTimeLocalString(new Date())
    );
    const [amount, handleAmountChange, setAmount] = useInput(modalPayload?.amount.toString() || '');

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

    const resetForm = useCallback(() => {
        setName('');
        setDate(convertToDateTimeLocalString(new Date()));
        setAmount('');
    }, [setName, setDate, setAmount])

    const handleSubmit = useCallback((event: React.FormEvent) => {
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
    }, [name, date, amount, modalPayload, user_id, mutation])

    const formFields = [
        {
            label: "Who:",
            id: "name",
            type: "text",
            value: name,
            onChange: handleNameChange,
            readOnly: !!username,
        },
        {
            label: "Date:",
            id: "date",
            type: "datetime-local",
            value: date,
            onChange: handleDateChange,
        },
        {
            label: "Amount:",
            id: "amount",
            type: "text",
            value: amount,
            onChange: handleAmountChange,
        },
    ];

    return (
        <Form
            formFields={formFields}
            onSubmit={handleSubmit}
            resetForm={resetForm}
            submitButtonLabel='Submit'
        />
    );
};

export default SpendingForm;