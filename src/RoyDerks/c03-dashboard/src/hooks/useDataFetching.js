import { useState, useEffect } from "react";

function useDataFetching(dataSourceUri) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(dataSourceUri);
                const result = await response.json();

                if (result) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, [dataSourceUri]);

    return [loading, error, data];
}

export default useDataFetching;
