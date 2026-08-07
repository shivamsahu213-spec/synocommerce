import 'dotenv/config';
import http from 'http';
import { createAuthTestApp } from './auth.test';

async function runTests() {
  console.log('🧪 Starting SynoCommerce Authentication & Identity End-to-End Test Suite...');

  const app = createAuthTestApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => server.listen(3099, resolve));
  const baseUrl = 'http://localhost:3099/api/auth';

  try {
    const testEmail = `authtest_${Date.now()}@synocommerce.local`;
    const initialPassword = 'SecurePassword123!';
    const updatedPassword = 'NewPassword456!';

    // 1. Test Registration
    console.log('\n1. Testing POST /api/auth/register...');
    const regRes = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: initialPassword,
        firstName: 'Test',
        lastName: 'User',
      }),
    });
    const regData = await regRes.json();
    console.log('Register Response Status:', regRes.status);
    if (regRes.status !== 201 || !regData.success) {
      throw new Error('Registration failed!');
    }
    console.log('✅ Registration test passed!');

    // 2. Test Verify Email Error Handling
    console.log('\n2. Testing POST /api/auth/verify-email error handling...');
    const verifyRes = await fetch(`${baseUrl}/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'invalid_dummy_token' }),
    });
    const verifyData = await verifyRes.json();
    console.log('Verify Email Invalid Token Status:', verifyRes.status);
    if (verifyRes.status !== 400 || verifyData.success !== false) {
      throw new Error('Verify email failed to reject invalid token!');
    }
    console.log('✅ Verify Email error handling test passed!');

    // 3. Test Login
    console.log('\n3. Testing POST /api/auth/login...');
    const loginRes = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: initialPassword,
      }),
    });
    const loginData = await loginRes.json();
    console.log('Login Response Status:', loginRes.status);
    if (loginRes.status !== 200 || !loginData.data?.accessToken) {
      throw new Error('Login failed!');
    }
    let accessToken = loginData.data.accessToken;
    let refreshToken = loginData.data.refreshToken;
    console.log('✅ Login test passed!');

    // 4. Test Refresh Token
    console.log('\n4. Testing POST /api/auth/refresh...');
    const refreshRes = await fetch(`${baseUrl}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });
    const refreshData = await refreshRes.json();
    console.log('Refresh Response Status:', refreshRes.status);
    if (refreshRes.status !== 200 || !refreshData.data?.accessToken) {
      throw new Error('Refresh token failed!');
    }
    accessToken = refreshData.data.accessToken;
    refreshToken = refreshData.data.refreshToken || refreshToken;
    console.log('✅ Refresh token test passed!');

    // 5. Test Forgot Password
    console.log('\n5. Testing POST /api/auth/forgot-password...');
    const forgotRes = await fetch(`${baseUrl}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail }),
    });
    const forgotData = await forgotRes.json();
    console.log('Forgot Password Response Status:', forgotRes.status);
    if (forgotRes.status !== 200 || !forgotData.success) {
      throw new Error('Forgot password failed!');
    }
    console.log('✅ Forgot password test passed!');

    // 6. Test Change Password (authenticated)
    console.log('\n6. Testing POST /api/auth/change-password...');
    const changeRes = await fetch(`${baseUrl}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        currentPassword: initialPassword,
        newPassword: updatedPassword,
      }),
    });
    const changeData = await changeRes.json();
    console.log('Change Password Response Status:', changeRes.status);
    if (changeRes.status !== 200 || !changeData.success) {
      throw new Error('Change password failed!');
    }
    console.log('✅ Change password test passed!');

    // 7. Re-login with updated password
    console.log('\n7. Re-login with new password...');
    const reLoginRes = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: updatedPassword,
      }),
    });
    const reLoginData = await reLoginRes.json();
    if (reLoginRes.status !== 200) {
      throw new Error('Re-login with updated password failed!');
    }
    accessToken = reLoginData.data.accessToken;
    console.log('✅ Re-login test passed!');

    // 8. Test Logout
    console.log('\n8. Testing POST /api/auth/logout...');
    const logoutRes = await fetch(`${baseUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const logoutData = await logoutRes.json();
    console.log('Logout Response Status:', logoutRes.status);
    if (logoutRes.status !== 200 || !logoutData.success) {
      throw new Error('Logout failed!');
    }
    console.log('✅ Logout test passed!');

    // 9. Test Logout All
    console.log('\n9. Testing POST /api/auth/logout-all...');
    const freshLogin = await (
      await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, password: updatedPassword }),
      })
    ).json();

    const logoutAllRes = await fetch(`${baseUrl}/logout-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${freshLogin.data.accessToken}`,
      },
    });
    const logoutAllData = await logoutAllRes.json();
    console.log('Logout All Response Status:', logoutAllRes.status);
    if (logoutAllRes.status !== 200 || !logoutAllData.success) {
      throw new Error('Logout All failed!');
    }
    console.log('✅ Logout All test passed!');

    console.log('\n🎉 ALL AUTHENTICATION & IDENTITY ENDPOINTS PASSED VERIFICATION! 🎉\n');
  } catch (error) {
    console.error('\n❌ Auth Test Suite Failed:', error);
    process.exit(1);
  } finally {
    server.close();
  }
}

runTests();
