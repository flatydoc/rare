import { useBackButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useBackBtn = (url?: string) => {
  const bb = useBackButton(true);
  const navigate = useNavigate();

  useEffect(() => {
    function onClick() {
      if (url) {
        navigate(url);
      } else {
        navigate(-1);
      }
    }

    if (bb) {
      bb.show();
      bb.on("click", onClick);
    }
    return () => {
      bb?.hide();
      bb?.off("click", onClick);
    };
  }, [bb, url]);
};
