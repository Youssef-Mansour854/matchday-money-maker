import { corsHeaders } from '../_shared/cors.ts';

const API_KEY = '6537cc414b9f4a2984021d64f52eda56';
const BASE_URL = 'https://api.football-data.org/v4';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint');
    const params = url.searchParams.get('params');
    
    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: 'Missing endpoint parameter' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Build the API URL
    let apiUrl = `${BASE_URL}${endpoint}`;
    
    // Add query parameters if provided
    if (params) {
      const parsedParams = JSON.parse(params);
      const searchParams = new URLSearchParams();
      
      Object.entries(parsedParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      
      if (searchParams.toString()) {
        apiUrl += `?${searchParams.toString()}`;
      }
    }

    // Make the API request
    const response = await fetch(apiUrl, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in football-proxy:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch data from football API',
        message: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});