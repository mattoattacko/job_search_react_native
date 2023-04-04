import { useState, useEffect } from 'react'
import axios from 'axios'

// Gets our data from the API //
const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '229f753b2cmshf0d1c81f49d91f8p1c7171jsnf13d6709e53d',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('Error in fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  // Runs the fetchData function when the component mounts //
  useEffect(() => {
    fetchData();
  }, []);

  //sometimes there is a problem refetching the data. Like when we click the button it wasn't properly loading. So we created a refetch function that we can call when we need to refetch the data
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  //return the actual data so that we can use it in our Popularjobs component etc
  return { data, isLoading, error, refetch };
};

export default useFetch;