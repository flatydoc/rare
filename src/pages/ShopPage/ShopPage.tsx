import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import { CasesList } from "./components/CasesList";
import { cases } from "./constants";

export const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCases =
    selectedCategory === "all"
      ? cases
      : cases.filter((item) => item.category === selectedCategory);

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        p: "12px 0 104px 0",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={2}>
        Магазин кейсов
      </Typography>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          p: "0 12px 0 12px",
        }}
      >
        <Tabs
          value={selectedCategory}
          onChange={(_, value) => setSelectedCategory(value)}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTabs-flexContainer": {
              flexWrap: "nowrap",
            },
            display: "flex",
            whiteSpace: "nowrap",
            minWidth: "max-content",
          }}
        >
          <Tab label="Все" value="all" />
          <Tab label="Бесплатные" value="free" />
          <Tab label="Хитовые" value="hit" />
          <Tab label="Эксклюзивные" value="exclusive" />
          <Tab label="Событийные" value="event" />
          <Tab label="Промо" value="promo" />
        </Tabs>
      </Box>

      <CasesList filteredCases={filteredCases} />
    </Box>
  );
};
