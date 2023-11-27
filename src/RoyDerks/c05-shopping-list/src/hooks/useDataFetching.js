import { useEffect, useState } from "react";

function useDataFetching(dataSourceUri) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function tryFetchData() {
            try {
                const response = await fetch(dataSourceUri);
                const result = await response.json();

                if (result) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        }

        tryFetchData();
    }, [dataSourceUri]);

    return [loading, error, data];
}

export default useDataFetching;