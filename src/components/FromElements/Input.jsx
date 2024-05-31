import React, { forwardRef, useId } from 'react'

const Input = forwardRef(({ label, type = "text", isAsterisk = true, error, inputClass, ...props }, ref) => {

    const inputId = useId();

    return (
        <>
            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                {label && <label htmlFor={inputId}>
                    {label}&nbsp;{isAsterisk && <span className="required">*</span>}
                </label>}
                <input
                    type={type}
                    className={`woocommerce-Input woocommerce-Input--text input-text form-control ${inputClass}`}
                    id={inputId}
                    ref={ref}
                    {...props}
                />
                {error && <p
                    className="required"
                    style={{ fontWeight: 400, letterSpacing: "0.2px", fontSize: 14, margin: 0 }}
                >
                    {error.message}
                </p>}
            </p>
        </>
    )
})

export default Input