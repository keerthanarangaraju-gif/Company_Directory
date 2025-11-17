import React from "react";
import { AppBar, Toolbar, Typography, TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const Header = ({ searchValue, onSearchChange }) => {
  return (
   <AppBar
  position="static"
  sx={{
    backgroundImage: `url(${process.env.PUBLIC_URL + '/SearchImage.png'})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "80px 0",
    textAlign: "center",
  }}
>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",  
          alignItems: "center",
          gap: 2,                 
        }}
      >
       <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "48px",
          }}
        >
         Organisation Directory
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Search and Land on Your Dream Company
        </Typography>
        <Box sx={{ width: "60%", maxWidth: "500px" }}>
          <TextField
            fullWidth
            size="medium"
            placeholder="Search companies…"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              background: "white",
              borderRadius: "6px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
