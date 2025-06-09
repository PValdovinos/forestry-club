import { Container, Typography, TextField, Button } from "@mui/material"
import StyledContainer from "../components/StyledContainer"
import ContainerNav from "../components/ContainerNav"
import Toast from "../components/Toast"
import useAddMemberForm from "../hooks/useAddMemberForm"

export default function AddMember() {
    const {
        fields,
        errors,
        toast,
        handleChange,
        handleSubmit,
        resetToast
    } = useAddMemberForm()

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1">Sign-up</Typography>
            <ContainerNav items={[{ label: "Back", to: "/" }]} />
            <StyledContainer component="form" sx={{ mt: 0 }} autoComplete="off">
                <TextField
                    id="fname"
                    label="First Name"
                    variant="filled"
                    required
                    value={fields.fname}
                    onChange={handleChange}
                    error={!errors.fname.isValid}
                    helperText={errors.fname.message || " "}
                />
                <TextField
                    id="lname"
                    label="Last Name"
                    variant="filled"
                    required
                    value={fields.lname}
                    onChange={handleChange}
                    error={!errors.lname.isValid}
                    helperText={errors.lname.message || " "}
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    required
                    value={fields.email}
                    onChange={handleChange}
                    error={!errors.email.isValid}
                    helperText={errors.email.message || " "}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    required
                    value={fields.password}
                    onChange={handleChange}
                    error={!errors.password.isValid}
                    helperText={errors.password.message || "Must be 8–16 characters."}
                />
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </StyledContainer>
            <Toast 
                open={toast.open}
                onClose={resetToast}
                message={toast.message}
                severity={toast.severity}
            />
        </Container>
    )
}