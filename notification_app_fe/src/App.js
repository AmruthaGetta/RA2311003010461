import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tab,
  Tabs,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Badge,
  IconButton,
  Avatar,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationList from "./components/NotificationList";
import PriorityPage from "./components/PriorityPage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1a1a2e" },
    secondary: { main: "#e94560" },
    background: { default: "#f0f2f5", paper: "#ffffff" },
  },
});

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 3 }}>{children}</Box> : null;
}

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#f8bbd0",
          color: "#000",
        }}
      >
        <Toolbar>
          <NotificationsNoneIcon sx={{ mr: 1 }} />
          <Typography variant="h6">NotifyHub</Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton sx={{ color: "#000" }}>
            <Badge badgeContent={0} color="secondary">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Avatar sx={{ bgcolor: "#e94560" }}>U</Avatar>
        </Toolbar>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="All Notifications" />
          <Tab label="Priority Notifications" />
        </Tabs>
      </AppBar>

      <Box sx={{ py: 3 }}>
        <Container maxWidth="md">
          <TabPanel value={tab} index={0}>
            <NotificationList />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <PriorityPage />
          </TabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}