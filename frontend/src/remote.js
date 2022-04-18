import axios from "axios";

export const baseUrl = "http://localhost:4000/api/v1";

export const http = axios.create({
    baseURL: baseUrl,
});