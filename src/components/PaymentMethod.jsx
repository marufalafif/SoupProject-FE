import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import ButtonCombo from "./utils/ButtonCombo";

import bca from "../assets/payment/bca.png";
import bni from "../assets/payment/bni.png";
import mandiri from "../assets/payment/mandiri.png";
import ovo from "../assets/payment/ovo.png";
import gopay from "../assets/payment/gopay.png";
import dana from "../assets/payment/dana.png";

const choiseMethod = [
  { no: 1, name: "Gopay", image: gopay },
  { no: 2, name: "Ovo", image: ovo },
  { no: 3, name: "Dana", image: dana },
  { no: 4, name: "BNI", image: bni },
  { no: 5, name: "BCA", image: bca },
  { no: 6, name: "Mandiri", image: mandiri },
];

const PaymentMethod = ({ onClose, open }) => {
  const handleListItemClick = (method) => {
    onClose(method);
  };

  return (
    <Dialog onClose={() => onClose(null)} open={open}>
      <DialogTitle>Select Payment Method</DialogTitle>
      <List>
        {choiseMethod.map((method) => (
          <ListItem key={method.no} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(method)}>
              <ListItemIcon>
                <img src={method.image} alt={method.name} />
              </ListItemIcon>
              <ListItemText primary={method.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ButtonCombo
          first="Cancel"
          last="Pay Now"
          firstLink="/checkout"
          lastLink="/purchaseConfirmation"
        />
      </List>
    </Dialog>
  );
};

export default PaymentMethod;
