import api from './apiCallConf.js';

/**
 * Generische API Call Funktion
 * @param {Object} options - Optionen für den API-Aufruf
 * @param {String} options.method - HTTP-Methode (GET, POST, PUT, DELETE)
 * @param {String} options.url - Endpunkt-URL (z. B. '/delete/asset/1')
 * @param {Object} [options.data=null] - Request-Body (für POST, PUT)
 * @param {Object} [options.params=null] - Query-Parameter (z. B. für GET)
 * @param {Object} [options.headers={}] - Zusätzliche Header
 * @returns {Promise<Object>} - Die Antwortdaten (JSON)
 */
export async function apiCall({ method = 'GET', url, data = null, params = null, headers = {} }) {
    try {
        const response = await api({
            method,
            url,
            data: method === 'GET' || method === 'DELETE' ? [] : data, // Nur POST/PUT brauchen `data`
            params: method === 'GET' || method === 'DELETE' ? params : null, // Nur GET/DELETE brauchen `params`
            headers,
        });
        return response.data; // Rückgabe der JSON-Daten
    } catch (error) {
        console.error('API Call Error:', error);

        if (error.response) {
            throw new Error(
                `Error: ${error.response.status} - ${error.response.data.message || 'Unknown Error'}`
            );
        } else if (error.request) {
            throw new Error('No response received from the server.');
        } else {
            throw new Error(`Request Error: ${error.message}`);
        }
    }
}
