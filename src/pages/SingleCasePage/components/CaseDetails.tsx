import { Box, Typography } from "@mui/material";
import { ICase } from "../../../core/types";

export const CaseDetails = ({ selectedCase }: { selectedCase: ICase }) => {
  return (
    <Box>
      <Typography variant="h4" textAlign="center" mb={2}>
        {selectedCase.name}
      </Typography>
      <Typography variant="body1" textAlign="center" mb={2}>
        {selectedCase.description}
      </Typography>
    </Box>
  );
};
