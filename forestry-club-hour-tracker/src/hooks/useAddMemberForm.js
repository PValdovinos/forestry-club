import { useState } from "react"
import { BASE_URL, USER_ACTIVATED } from "../projectVariables"
import { validateEmail, validateName, validatePassword } from "../helpers/validation"

export default function useAddMemberForm() {
    const [fields, setFields] = useState({
        email: "",
        fname: "",
        lname: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: { isValid: true, message: "" },
        fname: { isValid: true, message: "" },
        lname: { isValid: true, message: "" },
        password: { isValid: true, message: "" }
    })

    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success"
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setFields(prev => ({ ...prev, [id]: value }))
    }

    const validate = () => {
        const newErrors = {
            email: validateEmail(fields.email),
            fname: validateName(fields.fname, "first"),
            lname: validateName(fields.lname, "last"),
            password: validatePassword(fields.password)
        }
        setErrors(newErrors)
        return Object.values(newErrors).every(e => e.isValid)
    }

    const handleSubmit = async () => {
        if (!validate()) return

        const newMember = {
            ...fields,
            user_flags: USER_ACTIVATED
        }

        try {
            let response = await fetch(`${BASE_URL}/api/users.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMember)
            })
            const result = await response.json()

            if (result.success) {
                setToast({ open: true, message: result.message, severity: "success" })
                setFields({ email: "", fname: "", lname: "", password: "" })
                setErrors({
                    email: { isValid: true, message: "" },
                    fname: { isValid: true, message: "" },
                    lname: { isValid: true, message: "" },
                    password: { isValid: true, message: "" }
                })
            } else {
                setToast({ open: true, message: result.message || "Failed to create account.", severity: "error" })
            }
        } catch (err) {
            setToast({ open: true, message: "Network error. Please try again.", severity: "error" })
        }
    }

    const resetToast = () => setToast(prev => ({ ...prev, open: false }))

    return {
        fields,
        errors,
        toast,
        handleChange,
        handleSubmit,
        resetToast
    }
}