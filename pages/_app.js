// pages/_app.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [authenticated, setAuthenticated] = useState(null); // 将初始状态设置为null
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated && router.pathname !== '/login') {
      router.push('/login');
    } else {
      setAuthenticated(isAuthenticated);
    }
  }, [router]);

  if (authenticated === null) {
    return <div>Loading...</div>; // 初始加载状态
  }

  return <Component {...pageProps} />;
}

export default MyApp;
