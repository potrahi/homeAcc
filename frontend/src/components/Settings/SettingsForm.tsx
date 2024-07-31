import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { modalActions } from '../../store/modal';
import { settingsActions } from '../../store/settings';
import useInput from '../../hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { updateSettings } from '../../api/settings';
import { useSetting } from '../../hooks/useSettings';

const SettingsForm: React.FC = () => {
    const dispatch = useDispatch();

    const dbBudget = useSetting("monthly_budget");
    const dbCurrency = useSetting("currency");

    useEffect(() => {
        if (dbBudget.data) dispatch(settingsActions.setMonthlyBudget(dbBudget.data));
        if (dbCurrency.data) dispatch(settingsActions.setCurrency(dbCurrency.data));
    }, [dbBudget.data, dbCurrency.data, dispatch]);

    const monthlyBudget = useSelector((state: RootState) => state.settings.monthlyBudget);
    const currecntCurrency = useSelector((state: RootState) => state.settings.currency);

    const [budget, handleBudgetChange, setBudget] = useInput(monthlyBudget.toString());
    const [currency, handleCurrencyChange, setCurrency] = useInput(currecntCurrency);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            setIsSubmitting(false);
            dispatch(modalActions.closeModal())
        },
        onError: (error: Error) => {
            setIsSubmitting(false);
            alert(error.message);
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const parseBudget = parseFloat(budget);

        if (isNaN(parseBudget)) {
            alert("Invalid budget");
            return;
        }
        if (monthlyBudget === parseBudget && currecntCurrency === currency) {
            dispatch(modalActions.closeModal());
            return;
        }

        setIsSubmitting(true);
        dispatch(settingsActions.setMonthlyBudget(parseFloat(budget)));
        dispatch(settingsActions.setCurrency(currency));

        mutation.mutate([
            { setting: "monthly_budget", value: parseBudget },
            { setting: "currency", value: currency }
        ]);

        setBudget('');
        setCurrency('');
    };

    return (
        <form onSubmit={handleSubmit} className="spending-form">
            <div className="form-group">
                <label htmlFor="budget">Budget:</label>
                <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="currency">Currency:</label>
                <input
                    type="text"
                    id="currency"
                    name="currency"
                    value={currency}
                    onChange={handleCurrencyChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn-submit">{isSubmitting ? 'Saving...' : 'Save'}</button>
        </form>
    );
};

export default SettingsForm;