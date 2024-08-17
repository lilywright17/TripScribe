export const fetchApiKey = async () => {
	try {
	  const response = await fetch('/api/apikey');
	  const data = await response.json();
	  return data.apiKey;
	} catch (error) {
	  console.error('Error fetching API key:', error);
	  throw error;
	}
  };