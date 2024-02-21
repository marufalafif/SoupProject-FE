import { Container } from "@mui/material";
import TableDetail from "../components/TableDetail";

const DetailInvoice = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "90px",
          marginBottom: "200px",
          paddingX: { xs: "5px", sm: "20px" },
        }}
      >
        <TableDetail />
      </Container>
    </>
  );
};

export default DetailInvoice;
