import React, { forwardRef, useId } from 'react'

const Select = forwardRef(({ label, selectName = "Select", options = [], optionKeys = ["value", "title"], error, isAsterisk = true, ...props }, ref) => {

    const selectId = useId();

    return (
        <>
            {/* <p className="form-row form-row-wide address-field update_totals_on_change form-group single-country validate-required" id="billing_country_field" data-priority="40">
                <label for="billing_country" className="control-label">Country&nbsp;<abbr className="required" title="required">*</abbr></label>
                <span className="woocommerce-input-wrapper">
                    <select name="billing_country" id="billing_country" className="country_to_state country_select select2-hidden-accessible form-control" autocomplete="country" tabindex="-1" aria-hidden="true">

                    </select>
                    <noscript><button
                        type="submit"
                        name="woocommerce_checkout_update_totals"
                        value="Update country">Update country</button></noscript>
                </span>
            </p> */}

            {/* <p className="form-row form-row-wide address-field form-group validate-required validate-state" id="billing_state_field" data-priority="80" data-o_className="form-row form-row-wide address-field form-group validate-required validate-state">
                <label for="billing_state" className="control-label">
                    District&nbsp;<abbr className="required" title="required">*</abbr>
                </label>
                <span className="woocommerce-input-wrapper">
                    <select name="billing_state" id="billing_state" className="state_select form-control input-lg select2-hidden-accessible" data-plugin="select2" data-allow-clear="true" aria-hidden="true" autocomplete="address-level1" data-placeholder="Select an option…" tabindex="-1">
                        <option value="">Select an option…</option>
                    </select>

                </span>
            </p> */}


            <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                {label && <label htmlFor={selectId}>
                    {label}&nbsp;{isAsterisk && <span className="required">*</span>}
                </label>}

                <select id={selectId} ref={ref} className="form-control" {...props}>
                    <option value="">Select</option>
                    {options.map((option, index) => <option key={index} value={option[optionKeys[0]]}>
                        {option[optionKeys[1]]}
                    </option>)}
                </select>

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

export default Select