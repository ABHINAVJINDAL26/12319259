import { NextRequest, NextResponse } from 'next/server';
import { getEvaluationToken } from '@/lib/evaluationAuth';

export const runtime = 'nodejs';

const LOG_API = 'http://4.224.186.213/evaluation-service/logs';

export async function POST(request: NextRequest) {
  try {
    const bearerToken = await getEvaluationToken();
    const body = await request.json();

    const response = await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(
      {
        ok: true,
        forwardedStatus: response.status,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to send log',
      },
      { status: 500 }
    );
  }
}
