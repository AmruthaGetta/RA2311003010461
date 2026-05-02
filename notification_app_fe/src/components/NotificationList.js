import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
} from "@mui/material";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzZzQ3OThAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNzQ1OSwiaWF0IjoxNzc3NzA2NTU5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjk5Zjk3YjctMGQ3Yi00YTIxLTljZTYtOTZjNTE2MTgzYzgxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ2V0dGEgc2F0eWEgYW1ydXRoYSIsInN1YiI6ImIxMTdjOWFjLTdjOTAtNDMyNC1iZjY2LWY3ZDA2NjRjNmJiYyJ9LCJlbWFpbCI6InNnNDc5OEBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImdldHRhIHNhdHlhIGFtcnV0aGEiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA0NjEiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiMTE3YzlhYy03YzkwLTQzMjQtYmY2Ni1mN2QwNjY0YzZiYmMiLCJjbGllbnRTZWNyZXQiOiJYQWdYeUJNYnB4cU5Ca2dtIn0.OUeZwL8kzAFkWYEo2u-R5A5RsRNyAG_jVCVT4_PhoV0";

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications?page=1&limit=10",
      {
        headers: { Authorization: "Bearer " + TOKEN },
      }
    );
    setNotifications(res.data.notifications);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: 700, color: "#1a1a2e" }}
      >
        All Notifications
      </Typography>

      {notifications.map((n) => (
        <Card
          key={n.ID}
          sx={{
            mb: 2,
            borderRadius: 3,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 6px 22px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={1} mb={1}>
              <Chip
                label={n.Type}
                sx={{
                  backgroundColor:
                    n.Type === "Placement"
                      ? "#e3f2fd"
                      : n.Type === "Result"
                      ? "#e8f5e9"
                      : "#fff3e0",
                  color:
                    n.Type === "Placement"
                      ? "#1565c0"
                      : n.Type === "Result"
                      ? "#2e7d32"
                      : "#e65100",
                  fontWeight: 600,
                }}
              />

              {read.includes(n.ID) && (
                <Chip label="Read" color="success" />
              )}
            </Stack>

            <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
              {n.Message}
            </Typography>

            <Typography variant="caption" sx={{ color: "#777" }}>
              {n.Timestamp}
            </Typography>

            {!read.includes(n.ID) && (
              <Button
                variant="contained"
                size="small"
                onClick={() => setRead([...read, n.ID])}
                sx={{
                  mt: 1.5,
                  backgroundColor: "#1a1a2e",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#e94560",
                  },
                }}
              >
                Mark Read
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}