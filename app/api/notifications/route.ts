import { NextRequest, NextResponse } from 'next/server';
import { getEvaluationToken } from '@/lib/evaluationAuth';

export const runtime = 'nodejs';

const API_URL = 'http://4.224.186.213/evaluation-service';

export async function GET(request: NextRequest) {
  try {
    const bearerToken = await getEvaluationToken();
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const url = `${API_URL}/notifications${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API Error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch notifications',
      },
      { status: 500 }
    );
  }
}
