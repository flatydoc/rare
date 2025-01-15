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
import { useEffect } from "react";

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
    balance: 8000,
    energy: 100,
    exp: 50,
    level: 2,
    cards: [101, 102],
    cases: [21],
    gems: [4, 5],
    completedPVE: null,
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, []);

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
