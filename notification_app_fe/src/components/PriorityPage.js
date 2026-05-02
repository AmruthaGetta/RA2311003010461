import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzZzQ3OThAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNzQ1OSwiaWF0IjoxNzc3NzA2NTU5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjk5Zjk3YjctMGQ3Yi00YTIxLTljZTYtOTZjNTE2MTgzYzgxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ2V0dGEgc2F0eWEgYW1ydXRoYSIsInN1YiI6ImIxMTdjOWFjLTdjOTAtNDMyNC1iZjY2LWY3ZDA2NjRjNmJiYyJ9LCJlbWFpbCI6InNnNDc5OEBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImdldHRhIHNhdHlhIGFtcnV0aGEiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA0NjEiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiMTE3YzlhYy03YzkwLTQzMjQtYmY2Ni1mN2QwNjY0YzZiYmMiLCJjbGllbnRTZWNyZXQiOiJYQWdYeUJNYnB4cU5Ca2dtIn0.OUeZwL8kzAFkWYEo2u-R5A5RsRNyAG_jVCVT4_PhoV0";

const WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export default function PriorityPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: { Authorization: "Bearer " + TOKEN },
      }
    );

    const sorted = res.data.notifications
      .sort(
        (a, b) =>
          WEIGHTS[b.Type] + new Date(b.Timestamp).getTime() -
          (WEIGHTS[a.Type] + new Date(a.Timestamp).getTime())
      )
      .slice(0, 10);

    setNotifications(sorted);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: 700, color: "#161617" }}
      >
        Priority Notifications
      </Typography>

      {notifications.map((n, i) => (
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
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{
                  bgcolor:
                    i === 0
                      ? "#ffd700"
                      : i === 1
                      ? "#c0c0c0"
                      : i === 2
                      ? "#cd7f32"
                      : "#1a1a2e",
                  color: i < 3 ? "#000" : "#fff",
                }}
              >
                {i + 1}
              </Avatar>

              <Box>
                <Chip
                  label={n.Type}
                  sx={{
                    mb: 1,
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

                <Typography sx={{ fontWeight: 500 }}>
                  {n.Message}
                </Typography>

                <Typography variant="caption" sx={{ color: "#777" }}>
                  {n.Timestamp}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}