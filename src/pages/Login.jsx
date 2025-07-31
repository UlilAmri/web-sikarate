import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://api-sikarate.mydemoapp.site/auth/login',
        {
          email,
          password,
        }
      );

      const { access_token, email: userEmail, role } = res.data;

      // Simpan ke localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role);

      // Navigasi berdasarkan role
      if (role === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/riwayat-laporan');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login gagal. Cek kembali email/password.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-4">
      <div className="bg-white px-8 py-10 rounded-2xl shadow-2xl w-full max-w-md transition-transform hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;