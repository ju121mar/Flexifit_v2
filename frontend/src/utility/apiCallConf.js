import axios from 'axios';

// Erstelle eine Axios-Instanz mit Base URL
const api = axios.create({
    baseURL: 'http://localhost:1337', // Deine Base URL
    withCredentials: true,
    timeout: 30000, // Optional: Timeout in Millisekunden
    headers: {
        'Content-Type': 'application/json', // Optional: Standard-Header
    },
});

export default api;
