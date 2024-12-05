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

      <Typography variant="h6" mb={2}>
        Карточки, которые могут выпасть:
      </Typography>
    </Box>
  );
};
