import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import Header from "./Company-module/Header";
import CompanyTables from "./Company-module/CompanyTable";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Box sx={{ width: "100%", mb: 4}}>
        <Header
          searchValue={search}
          onSearchChange={(value) => setSearch(value)}
        />
      </Box>
      <Box
        sx={{
          width: "100%"
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%"
          }}
        >
          <CompanyTables searchValue={search} />
        </Paper>
      </Box>

    </>
  );
}

export default App;
