import { Container } from "@mui/material";

import FormResetPassword from "../components/ComponentForm/FormResetPassword";

const ResetPassword = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormResetPassword />
      </Container>
    </>
  );
};

export default ResetPassword;
