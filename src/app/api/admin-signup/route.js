export async function POST(req) {
  const { email, password } = await req.json();

  const defaultAdmin = {
    email: 'admin@gmail.com',
    password: 'admin123',
  };

  if (email === defaultAdmin.email && password === defaultAdmin.password) {
    return new Response(JSON.stringify({ success: true, message: 'Login successful' }), {
      status: 200,
    });
  }

  return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
    status: 401,
  });
}
