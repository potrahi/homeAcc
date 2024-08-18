import React from "react";

interface FormProps {
    formFields: {
        label: string;
        id: string;
        type: string;
        value: string | number;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        readOnly?: boolean;
    }[];
    onSubmit: (e: React.FormEvent) => void;
    resetForm?: () => void;
    submitButtonLabel?: string;
}

const Form: React.FC<FormProps> = ({
    formFields, onSubmit, submitButtonLabel = "Submit"
}) => {
    return (
        <form onSubmit={onSubmit} className="generic-form">
            {formFields.map((field) => (
                <div key={field.id} className="form-group">
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={field.value}
                        onChange={field.onChange}
                        className="form-control"
                        readOnly={field.readOnly}
                    />
                </div>
            ))}
            <button type="submit" className="btn-submit">
                {submitButtonLabel}
            </button>
        </form>
    )
}

export default Form;
