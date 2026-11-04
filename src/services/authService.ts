/**
 * TruckFlow Authentication Service — MOCK ADAPTER
 *
 * Phase 1: This service simulates authentication using local mock data.
 * It is fully isolated from UI components.
 *
 * To integrate real authentication in a future phase:
 * 1. Replace the login() function body with an API call.
 * 2. Replace getCurrentUser() with a JWT decode or /me API call.
 * 3. Replace logout() with a session invalidation API call.
 * 4. No changes to UI components or stores are required.
 */

import type { User } from '../types';
import { findUserByEmail } from '../mocks/users';
import { delay } from '../lib/utils';

const STORAGE_KEY = 'truckflow_session';
const MOCK_PASSWORD = 'demo1234';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Authenticate a user with email and password.
 * Phase 1: validates against mock data with a simulated network delay.
 */
export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  // Simulate network round-trip
  await delay(600);

  const { email, password } = credentials;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  if (password !== MOCK_PASSWORD) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const user = findUserByEmail(email);

  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  // Persist session
  persistSession(user);

  return { success: true, user };
}

/**
 * Log the current user out and clear the session.
 */
export async function logout(): Promise<void> {
  await delay(200);
  clearSession();
}

/**
 * Retrieve the currently authenticated user from storage.
 * Returns null if no session exists.
 */
export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    // Basic validation
    if (!parsed.id || !parsed.role || !parsed.email) return null;
    return parsed;
  } catch {
    clearSession();
    return null;
  }
}

/**
 * Check whether a valid session currently exists.
 */
export function isSessionValid(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Send a password reset email.
 * Phase 1: simulates the request with a delay and always succeeds.
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  await delay(800);

  if (!email) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  // Phase 1: always returns success for any email
  return {
    success: true,
    message: `If an account exists for ${email}, a reset link has been sent.`,
  };
}

/**
 * Reset a user password using a token.
 * Phase 1: simulates the request and always succeeds.
 */
export async function resetPassword(
  _token: string,
  _newPassword: string,
): Promise<{ success: boolean; message: string }> {
  await delay(600);
  return { success: true, message: 'Password reset successfully. You may now log in.' };
}

// ---- Internal helpers ----

function persistSession(user: User): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY);
}
