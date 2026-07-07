import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/results"
});

export const getMyResults = (token) =>
    API.get("/my-results", {
        headers: { Authorization: `Bearer ${token}` }
    });

export const downloadResultPDF = (resultId, token) =>
    API.get(`/${resultId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob"
    });

export default API;
