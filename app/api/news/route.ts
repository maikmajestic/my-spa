import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=bf77250503694f40b8f4e2cbcf5bff10";
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return NextResponse.json({ error: error });
  }
}
