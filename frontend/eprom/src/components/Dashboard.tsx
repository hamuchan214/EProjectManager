import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // ページ遷移用

  const handleLogout = () => {
    navigate("/login"); // ログアウト時にログインページへ
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
