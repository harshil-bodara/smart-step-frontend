import React from 'react'
// import { FiLoader } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { GIF_LOADER_WHITE } from '../Images';

const SubmitBtn = ({ children, isLoading }) => {
    return (
        <button
            type="submit"
            className="woocommerce-Button button"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
            disabled={isLoading}
        >
            {children}
            {/* &nbsp;<img src={GIF_LOADER_WHITE} alt="Loader" /> */}
            {isLoading && <LuLoader2 className='loader-rotate' style={{ strokeWidth: 3 }} />}
        </button>
    )
}

export default SubmitBtn