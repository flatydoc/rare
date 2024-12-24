import {
  Box,
  // Input,
  //  SvgIcon,
  Typography,
} from "@mui/material";

import { IUser } from "../../../core/types";
import {
  TonConnectButton,
  //   useTonAddress,
  //   useTonConnectModal,
  //   useTonConnectUI,
  //   useTonWallet,
} from "@tonconnect/ui-react";

export const Header = ({ user }: { user: IUser }) => {
  //   const wallet = useTonWallet();
  //   const [tonConnectUI] = useTonConnectUI();
  //   const userFriendlyAddress = useTonAddress();
  //   const { open } = useTonConnectModal();
  //   const isConnectTonWallet = wallet?.account.address;

  //   const handleConnect = async () => {
  //     if (!isConnectTonWallet) {
  //       open();
  //     }
  //   };

  return (
    <Box
      sx={{
        m: "12px",
        p: "12px",
        backgroundColor: "rgb(35, 35, 35)",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <Typography>{`@${user.username || user.id}`}</Typography>
      <TonConnectButton />
    </Box>
  );
};
