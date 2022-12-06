export const getBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const baseURL = reader.result;

            resolve(baseURL as string)
        }
    })
}