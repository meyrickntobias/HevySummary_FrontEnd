import { useCallback, useState } from "react"

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Http error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const clearData = () => setData(undefined);

    return { fetchData, data, loading, error, clearData };
}

export default useFetch;