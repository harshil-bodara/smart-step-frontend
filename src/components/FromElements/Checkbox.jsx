import React, { forwardRef, useId } from 'react'

const Checkbox = forwardRef(({ label, type = "text", error, ...props }, ref) => {

    const checkboxId = useId();

    return (
        <>
            <div>
                <label className="woocommerce-form__label woocommerce-form__label-for-checkbox">
                    <input
                        className="woocommerce-form__input woocommerce-form__input-checkbox"
                        type="checkbox"
                        id={checkboxId}
                        // value="forever"
                        ref={ref}
                        {...props}
                    /> <span>{label}</span>
                </label>
                {error && <p
                    className="required"
                    style={{ fontWeight: 400, letterSpacing: "0.2px", fontSize: 14, margin: 0 }}
                >
                    {error.message}
                </p>}
            </div>
        </>
    )
})

export default Checkbox