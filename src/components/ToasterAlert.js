import { toast } from "react-toastify"

const successToast = (message = "Success") => toast.success(message, {
    theme: "colored"
})

const errorToast = (message = "Error") => toast.error(message, {
    theme: "colored"
})

export { successToast, errorToast }