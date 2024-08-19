
export const fetchApiKey = async () => {
	try {
	  const response = await fetch('/api/google-maps-key');
	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }
	  const data = await response.json();
	  if (!data.apiKey) {
		throw new Error('API key not found in response');
	  }
	  return data.apiKey;
	} catch (error) {
	  console.error('Error fetching API key:', error);
	  throw error;
	}
  };