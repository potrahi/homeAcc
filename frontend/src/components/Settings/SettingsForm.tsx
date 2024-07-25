import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { modalActions } from '../../store/modal';
import { balanceActions } from '../../store/balance';

const SettingsForm: React.FC = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state: RootState) => state.balance.balance);

    const [formData, setFormData] = useState({
        balance: balance.toString(),
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
        const { balance } = formData;

        console.log(formData);
        dispatch(balanceActions.setBalance({ balance: parseFloat(balance) }));
        dispatch(modalActions.closeModal());
    };

    console.log("test")


    return (
        <form onSubmit={handleSubmit} className="spending-form">
            <div className="form-group">
                <label htmlFor="balance">Who:</label>
                <input
                    type="text"
                    id="balance"
                    name="balance"
                    value={formData.balance}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-submit">Save</button>
        </form>
    );
};

export default SettingsForm;