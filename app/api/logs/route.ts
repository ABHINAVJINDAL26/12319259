import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const LOG_API = 'http://4.224.186.213/evaluation-service/logs';
const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpbmF2amluZGFsMjNAbHB1LmluIiwiZXhwIjoxNzc4NzYwODY5LCJpYXQiOjE3Nzg1OTk5NjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiNjJmOTc5Mi05NTI0LTQyNWUtODhjZC1lNWY5MDE3NjA3MDMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhYmhpbmF2IGppbmRhbCIsInN1YiI6IjRhMTcwMDgxLTE3YjQtNGZhOC1hMWRkLTYxNTU4NzgwYTRlYiJ9LCJlbWFpbCI6ImFiaGluYXZqaW5kYWwyM0BscHUuaW4iLCJuYW1lIjoiYWJoaW5hdiBqaW5kYWwiLCJyb2xsTm8iOiIxMjMxOTI1OSIsImFjY2Vzc0NvZGUiOiJUUnZaV3EiLCJjbGllbnRJRCI6IjRhMTcwMDgxLTE3YjQtNGZhOC1hMWRkLTYxNTU4NzgwYTRlYiIsImNsaWVudFNlY3JldCI6IktZVWhRY0hCakNUVmpHdUgifQ.ID4b0YcL3hj1CyjAH5PFq7gKYbVdRnZ6GavMgfTr0FY';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
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
