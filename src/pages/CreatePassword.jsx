import { Container } from "@mui/material";

import FormCreatePassword from "../components/ComponentForm/FormCreatePassword";

const CreatePassword = () => {
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
        <FormCreatePassword />
      </Container>
    </>
  );
};

export default CreatePassword;
