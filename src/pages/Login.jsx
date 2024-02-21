import { Container } from "@mui/material";

import FormLogin from "../components/ComponentForm/FormLogin";

const Login = () => {
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
        <FormLogin />
      </Container>
    </>
  );
};

export default Login;
