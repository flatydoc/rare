import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  useMiniApp,
  useSwipeBehavior,
  useViewport,
} from "@telegram-apps/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { config } from "./core/configs";
import { theme } from "./core/theme/theme";
// import { useAuth } from "./core/hooks/useAuth";
import { useUserStore } from "./core/store/useUserStore";

export const Root = () => {
  const miniApp = useMiniApp();
  const viewport = useViewport();
  const swipeBehavior = useSwipeBehavior();
  // const { isLoading, user } = useAuth();
  const setUser = useUserStore((state) => state.setUser);

  miniApp.ready();
  viewport?.expand();

  if (swipeBehavior.supports("disableVerticalSwipe")) {
    swipeBehavior.disableVerticalSwipe();
  }

  const user = {
    id: 1,
    telegramId: 123,
    username: "user",
    balance: 123,
    energy: 123123132,
  };

  if (user) {
    setUser(user);
  }
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  if (!user) return null;

  return (
    <TonConnectUIProvider
      actionsConfiguration={{
        twaReturnUrl: config.botUrl,
      }}
      manifestUrl="https://app.tonkitties.io/tonconnect-manifest.json"
    >
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </TonConnectUIProvider>
  );
};
