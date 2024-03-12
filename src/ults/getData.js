import newRequest from "./newRequest"
export const getData = async (url, setIsLoading, setError) =>{
    try {
        setIsLoading(true);
        const response = await newRequest.get(url);
        setIsLoading(false);
        setError(false);
        console.log(response.data);
        return response.data;
    } catch (error) {
        setIsLoading(true);
        setError(error.response.data);
        console.log(error.response.data);
        return "loi";
    }
}


