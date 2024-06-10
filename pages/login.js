// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_APP_PASSWORD) {
      localStorage.setItem('authenticated', 'true');
      router.push('/');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
