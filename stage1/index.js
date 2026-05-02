const axios = require("axios");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const WEIGHTS = {
    Placement: 3,
    Result: 2,
    Event: 1
};

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzZzQ3OThAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjY1MywiaWF0IjoxNzc3NzAxNzUzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTcwNzJhNDctZWMwMy00ZTUyLTk3NjEtMTE0ODJkZDZmZTAxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ2V0dGEgc2F0eWEgYW1ydXRoYSIsInN1YiI6ImIxMTdjOWFjLTdjOTAtNDMyNC1iZjY2LWY3ZDA2NjRjNmJiYyJ9LCJlbWFpbCI6InNnNDc5OEBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImdldHRhIHNhdHlhIGFtcnV0aGEiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTA0NjEiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiMTE3YzlhYy03YzkwLTQzMjQtYmY2Ni1mN2QwNjY0YzZiYmMiLCJjbGllbnRTZWNyZXQiOiJYQWdYeUJNYnB4cU5Ca2dtIn0.jHHIpj34gkKUBrIntuQt2m9_2kOPFqd-GiWRdOxIDms";

class NotificationService {
    constructor(topN = 10) {
        this.topN = topN;
    }

    async fetchNotifications() {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
        return res.data.notifications;
    }

    calculatePriority(n) {
        return WEIGHTS[n.Type] + new Date(n.Timestamp).getTime();
    }

    async getTopNotifications() {
        const data = await this.fetchNotifications();

        return data
            .sort((a, b) => this.calculatePriority(b) - this.calculatePriority(a))
            .slice(0, this.topN);
    }
}

(async () => {
    const service = new NotificationService();
    const result = await service.getTopNotifications();

    console.log("\nTop Notifications:\n");

    result.forEach((n, i) => {
        console.log(`${i + 1}. [${n.Type}] ${n.Message} - ${n.Timestamp}`);
    });
})();