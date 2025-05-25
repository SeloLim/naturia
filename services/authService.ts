// File: /services/authService.ts
import Cookies from 'js-cookie';

// Import tipe yang benar dari Next.js dan Node.js
import type { IncomingMessage } from 'http'; // Tipe untuk Pages Router req (Node.js)
import { NextRequest } from 'next/server'; // Tipe untuk App Router request


// Import User type
import type { User } from '@/types/auth'; // Sesuaikan path import Anda

// Buat interface minimal untuk CookieAttributes jika import dari 'js-cookie' error
// Atau coba import standar:
// import type { CookieAttributes } from 'js-cookie';
// Jika baris import di atas error, gunakan interface di bawah sebagai pengganti:
interface MinimalCookieAttributes {
    path?: string;
    expires?: number | Date;
    'max-age'?: number;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}
// Gunakan EffectiveCookieAttributes sebagai alias tipe
type EffectiveCookieAttributes = MinimalCookieAttributes; // Ganti dengan CookieAttributes jika import berhasil


// Define API response types
interface LoginResponse {
  access_token: string;
  refresh_token: string; // Assuming API returns it here initially
  user: User;
}

interface RegisterResponse {
  access_token: string;
  refresh_token: string; // Assuming API returns it here initially
  user: User;
}

interface RefreshTokenResponse {
  access_token: string;
  // API DIASUMSIKAN mengembalikan refresh_token baru juga untuk rotasi
  refresh_token?: string;
}

// API URL from environment
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + "/api";

// Token storage keys
const ACCESS_TOKEN_KEY = 'naturia_access_token';
const REFRESH_TOKEN_KEY = 'naturia_refresh_token'; // Kunci untuk Cookie HttpOnly


// Default cookie attributes for access token (refresh token handled by API Set-Cookie)
const DEFAULT_ACCESS_TOKEN_COOKIE_ATTRIBUTES: EffectiveCookieAttributes = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax',
};


// Type untuk Next.js Request Context (menggunakan tipe umum)
type RequestContext = {
    req?: IncomingMessage | NextRequest;
};


export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data: LoginResponse = await response.json();
    Cookies.set(ACCESS_TOKEN_KEY, data.access_token, DEFAULT_ACCESS_TOKEN_COOKIE_ATTRIBUTES);
    return data;
  },

  async register(email: string, password: string, fullName?: string): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        full_name: fullName
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    const data: RegisterResponse = await response.json();
    return data;
  },

  logout(): void {
    // Remove access token cookie
    Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
    // Attempt to remove refresh token cookie client-side
    // (works for removing the entry, even if value wasn't readable due to HttpOnly)
    Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
    console.log('User logged out. Tokens removed from browser (client-side).');
    // Catatan: Untuk memastikan HttpOnly cookie benar-benar hilang dari server/session,
    // idealnya logout juga memanggil endpoint logout di API backend Anda.
  },

  // Helper to get cookies from request object (for SSR)
  // Parameter req menggunakan tipe union IncomingMessage | NextRequest
  getCookiesFromRequest(req: IncomingMessage | NextRequest): { [key: string]: string } {
      const cookies: { [key: string]: string } = {};

      // Handle NextRequest (App Router request)
      if (req instanceof NextRequest) {
          // req.cookies is a ReadonlyRequestCookies object (Map-like)
          // Check if cookies object exists and has the getAll method just in case
          if (req.cookies && typeof req.cookies.getAll === 'function') {
               req.cookies.getAll().forEach((cookie: {name: string, value: string}) => {
                   cookies[cookie.name] = cookie.value;
               });
           }
          return cookies;
      }

       // Handle IncomingMessage (Pages Router req)
       // Check if req is IncomingMessage based on typical properties
      if (req && typeof req === 'object' && 'headers' in req && req.headers) {
          // Access header 'cookie' using bracket notation. Type assertion can help here.
          const cookieHeader = (req.headers as IncomingMessage['headers'])['cookie'];
          if (typeof cookieHeader === 'string') {
              cookieHeader.split(';').forEach(cookie => {
                  const parts = cookie.trim().split('=');
                  const name = parts[0];
                  const value = parts.slice(1).join('=');
                   if (name) { // Ensure name is not empty
                     cookies[name] = decodeURIComponent(value);
                   }
               });
          }
           return cookies; // Return cookies found so far
      }

      // Return empty object if req type is unexpected or no cookies found
      console.warn('Could not parse cookies from request object:', req);
      return cookies;
  },


  // Get access token from Cookies (handles both client and server via context)
  getAccessToken(context?: RequestContext): string | undefined {
    // If context with request is provided (likely SSR)
    if (context?.req) {
        const cookies = this.getCookiesFromRequest(context.req);
        return cookies[ACCESS_TOKEN_KEY]; // Access using bracket notation
    }
    // Otherwise, assume client-side
    if (typeof window === 'undefined') {
       return undefined; // Cannot access Cookies on server without request context
    }
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  // Get refresh token from Cookies (handles server via context, but NOT client if HttpOnly)
  getRefreshToken(context?: RequestContext): string | undefined {
    // If context with request is provided (likely SSR)
     if (context?.req) {
        const cookies = this.getCookiesFromRequest(context.req);
        // This can read HttpOnly cookies on the server
        return cookies[REFRESH_TOKEN_KEY]; // Access using bracket notation
    }
    // Otherwise, assume client-side
    if (typeof window === 'undefined') {
        return undefined; // Cannot access Cookies on server without request context
    }

    // IMPORTANT: If refresh token is HttpOnly, Cookies.get(REFRESH_TOKEN_KEY)
    // will return undefined here on the client. Refresh only works correctly from server.
    // console.warn('Attempting to get refresh token client-side. This will fail if it is HttpOnly.');
    return Cookies.get(REFRESH_TOKEN_KEY); // This will likely be undefined if HttpOnly
  },

  // Refresh access token using the refresh token from Cookies (handles server context)
  async refreshToken(context?: RequestContext): Promise<string> {
    // refresh token can be const because it's not reassigned within this method
    const refreshToken = this.getRefreshToken(context); // Get token using context (reads from req.cookies on server)

    if (!refreshToken) {
      console.warn('No refresh token available (either not set or HttpOnly on client). Logging out.');
       // Perform client-side logout. If on server, calling code handles redirect.
      this.logout();
      throw new Error('No refresh token available');
    }

    console.log('Attempting to refresh token...');
    try {
      const fetchUrl = `${API_URL}/auth/refresh-token`;

      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        console.error('Failed to refresh token:', response.status, response.statusText);
        this.logout(); // Log out client-side on refresh failure
        throw new Error('Failed to refresh token');
      }

      const data: RefreshTokenResponse = await response.json();
      console.log('Token refreshed successfully. New access token received.');

      // Store the NEW access token ONLY in Cookies (client-readable)
      Cookies.set(ACCESS_TOKEN_KEY, data.access_token, DEFAULT_ACCESS_TOKEN_COOKIE_ATTRIBUTES);

      // --- IMPLEMENTASI REFRESH TOKEN ROTATION ---
      if (data.refresh_token) {
          console.log('API returned a new refresh token. Assuming API also set HttpOnly cookie via Set-Cookie header.');
          // If the API returns a new refresh token string in the JSON response,
          // it MUST also send a 'Set-Cookie' header in the HTTP response
          // containing this new refresh token with the HttpOnly flag and appropriate expiry/path.
          // The client-side service CANNOT set the new refresh token cookie here.
          // The presence of data.refresh_token here is just confirmation that rotation happened.
      } else {
          console.log('API did not return a new refresh token.');
          // If API doesn't return a new one, the old one in the HttpOnly cookie is expected to still be valid.
      }
      // --- END IMPLEMENTASI REFRESH TOKEN ROTATION ---

      return data.access_token; // Return the new access token

    } catch (error) {
      console.error('Error during token refresh:', error);
      this.logout(); // Ensure client-side logout on any refresh error
      throw error;
    }
  },

  // Get user profile using the access token from Cookies (handles server context)
  // Restrukturisasi untuk menghindari reassignment 'token', memungkinkan 'const'
  async getProfile(context?: RequestContext): Promise<User> {
    // Dapatkan token awal (bisa dari cookie di server atau client)
    const initialToken = this.getAccessToken(context);

    if (!initialToken) {
      console.warn('No initial access token found. Cannot get profile.');
      throw new Error('Not authenticated');
    }

    console.log('Attempting to fetch profile with initial token...');
    const fetchUrl = `${API_URL}/auth/profile`;

    try {
      // Coba ambil profile dengan token awal
      const response = await fetch(fetchUrl, {
        headers: {
          'Authorization': `Bearer ${initialToken}`,
        },
      });

      // Jika berhasil, kembalikan data user
      if (response.ok) {
        console.log('Profile fetch successful with initial token.');
        return await response.json();
      }

      // Jika response 401 (token expired/invalid), lanjutkan ke alur refresh
      if (response.status === 401) {
        console.warn('Initial profile fetch returned 401. Proceeding to refresh token...');
        // Jangan throw di sini, biarkan alur try/catch luar yang menangkap jika refresh gagal
      } else {
         // Handle non-401 non-OK responses
         console.error('Initial profile fetch failed:', response.status, response.statusText);
         throw new Error(`Failed to get profile: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
       // Tangani error saat fetch awal (misal, network error)
       console.error('Error during initial profile fetch:', error);
       throw error; // Rethrow the initial error
    }

    // Jika sampai sini, berarti fetch awal mengembalikan 401
    try {
      console.log('Attempting to refresh token after 401...');
      // Lakukan refresh token (membutuhkan refresh token dari cookie, menangani SSR via context)
      // Jika refresh berhasil, service.refreshToken() sudah menyetel access token baru
      // token baru bisa const
      const newToken = await this.refreshToken(context);

      console.log('Token refreshed. Retrying profile fetch with new token...');
      // Coba ambil profile lagi dengan token baru yang didapat dari refresh
      const retryResponse = await fetch(fetchUrl, {
        headers: {
          'Authorization': `Bearer ${newToken}`, // Gunakan token baru
        },
      });

      if (!retryResponse.ok) {
        console.error('Retry profile fetch failed:', retryResponse.status, retryResponse.statusText);
        // Jika retry gagal setelah refresh, ada masalah, kemungkinan perlu re-login
         this.logout(); // Log out client-side
        throw new Error('Failed to get profile after refresh');
      }

      console.log('Profile fetch successful after retry.');
      return await retryResponse.json();

    } catch (refreshOrRetryError) {
      console.error('Error during refresh or retry profile fetch:', refreshOrRetryError);
      // Jika refresh atau retry gagal, logout sudah terjadi di refreshToken.
      // Lempar error ini agar caller bisa menangani (misal, redirect ke login)
      throw refreshOrRetryError;
    }
  },

  // Check if user is authenticated by checking for the access token in Cookies (handles server context)
  isAuthenticated(context?: RequestContext): boolean {
    // We consider the user authenticated if an access token exists in cookies
    return !!this.getAccessToken(context);
  },

  // --- Helper methods for direct cookie access (use with caution) ---
  // Useful if you need to read a specific cookie value directly in SSR or client
  getCookie(name: string, context?: RequestContext): string | undefined {
     if (context?.req) {
        const cookies = this.getCookiesFromRequest(context.req);
        return cookies[name];
    }
    if (typeof window === 'undefined') {
         return undefined;
    }
    return Cookies.get(name);
  }
};