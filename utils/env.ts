export const getAdminURL = () => {
    return process.env.API_BASE_URL || 'https://localhost:9000'
}