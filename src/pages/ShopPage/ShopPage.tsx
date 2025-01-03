import { Box, Tab, Tabs } from "@mui/material";
import { useMemo, useState } from "react";

import { CasesList } from "./components/CasesList";
import { useCaseStore } from "../../core/store/useCaseStore";
import { CaseCategory } from "../../core/types";

export const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    CaseCategory | "all"
  >("all");

  const cases = useCaseStore((state) => state.cases);
  const getCasesByCategory = useCaseStore((state) => state.getCasesByCategory);

  const filteredCases = useMemo(() => {
    return selectedCategory === "all"
      ? cases
      : getCasesByCategory(selectedCategory);
  }, [cases, selectedCategory, getCasesByCategory]);

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        p: "12px 0 104px 0",
      }}
    >
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
          <Tab label="All" value="all" />
          <Tab label="Free" value="free" />
          <Tab label="Exclusive" value="exclusive" />
        </Tabs>
      </Box>
      <CasesList cases={filteredCases} />
    </Box>
  );
};
