import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { modalActions } from '../../store/modal';
import { balanceActions } from '../../store/balance';
import useInput from '../../hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { updateBalance } from '../../api/balance';

const SettingsForm: React.FC = () => {
    const dispatch = useDispatch();
    const current_balance = useSelector((state: RootState) => state.balance.balance);

    const [balance, handleBalanceChange, setBalance] = useInput(current_balance.toString());

    const mutation = useMutation({
        mutationFn: updateBalance,
        onSuccess: () => {
            dispatch(balanceActions.setBalance(parseFloat(balance)));
            dispatch(modalActions.closeModal());
            setBalance('');
        },
        onError: (error: Error) => {
            console.error("Error updating balance: ", error);
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const parseBalance = parseFloat(balance);

        if (isNaN(parseBalance)) {
            console.log("Invalid balance");
            return;
        }

        mutation.mutate(parseBalance);
    };

    return (
        <form onSubmit={handleSubmit} className="spending-form">
            <div className="form-group">
                <label htmlFor="balance">Balance:</label>
                <input
                    type="text"
                    id="balance"
                    name="balance"
                    value={balance}
                    onChange={handleBalanceChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-submit">Save</button>
        </form>
    );
};

export default SettingsForm;