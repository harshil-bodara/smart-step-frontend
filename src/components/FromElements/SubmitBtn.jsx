import React from 'react'
import { LuLoader2 } from "react-icons/lu";

const SubmitBtn = ({ children, isLoading }) => {
    return (
        <button
            type="submit"
            className="woocommerce-Button button"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
            disabled={isLoading}
        >
            {children}
            {isLoading && <LuLoader2 className='loader-rotate' style={{ strokeWidth: 3 }} />}
        </button>
    )
}

export default SubmitBtn