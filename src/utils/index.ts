export const isValidJSON = (data: string) => {
    try {
        JSON.parse(data)
        return true;
    } catch (error) {
        return false;
    }
}