
const BASE_URL = "https://expense-tracker-backend-esyo.onrender.com"

const USERS_URL = BASE_URL + "/api/v1/users"
const ACCOUNTS_URL = BASE_URL + "/api/v1/accounts"
const TRANSACTION_URL = BASE_URL + "/api/v1/transactions"

const API_URL_USER = `${USERS_URL}/profile`
const API_URL_LOGIN = `${USERS_URL}/login`


export {
    USERS_URL,
    API_URL_USER,
    API_URL_LOGIN,
    ACCOUNTS_URL,
    TRANSACTION_URL
}