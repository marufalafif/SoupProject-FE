import { Container } from "@mui/material";

import FormRegister from "../components/ComponentForm/FormRegister";

const Register = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: { xs: "60px", md: "75px" },
        }}
      >
        <FormRegister />
      </Container>
    </>
  );
};

export default Register;
