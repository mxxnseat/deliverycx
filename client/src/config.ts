export const config = {
    REACT_APP_API_URL: process.env.NODE_ENV === "development" ? "http://localhost:6661" : "/api"
}