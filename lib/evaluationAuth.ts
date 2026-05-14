type AuthTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
};

const AUTH_URL = 'http://4.224.186.213/evaluation-service/auth';

const authBody = {
  email: 'abhinavjindal23@lpu.in',
  name: 'abhinav jindal',
  rollNo: '12319259',
  accessCode: 'TRvZWq',
  clientID: '4a170081-17b4-4fa8-a1dd-61558780a4eb',
  clientSecret: 'KYUhQcHBjCTVjGuH',
};

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export async function getEvaluationToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authBody),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Auth Error: ${response.status}`);
  }

  const data = (await response.json()) as AuthTokenResponse;
  cachedToken = data.access_token;
  tokenExpiresAt = now + Math.max(0, data.expires_in) * 1000;
  return cachedToken;
}
