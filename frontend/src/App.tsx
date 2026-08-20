import axios from 'axios';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Scene } from './components/Scene';
import type { PlacedItem } from './components/Scene';
import './App.css';

const api = axios.create({ baseURL: 'http://localhost:3000' });

type Agency = {
  name: string;
};

const MODEL_OPTIONS = [
  { label: 'A Beautiful Game', url: 'http://localhost:3000/uploads/ABeautifulGame.glb' },
  { label: 'Памятник', url: 'http://localhost:3000/uploads/monument.gltf' },
  { label: 'Ваза', url: 'http://localhost:3000/uploads/vase.gltf' },
] as const;

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? 'Unable to sign in. Please try again.';
  }

  return 'Unable to sign in. Please try again.';
}

function Login({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { data } = await api.post('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });
      const token = data.accessToken ?? data.access_token;

      if (!token) {
        throw new Error('The login response did not include an access token.');
      }

      localStorage.setItem('token', token);
      window.history.pushState({}, '', '/');
      onSuccess(token);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Agency sign in</h1>
        <p>Sign in to open the plot constructor.</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}

function ControlPanel({ agency }: { agency: Agency | null }) {
  const [size, setSize] = useState({ width: 3, length: 3 });
  const [items, setItems] = useState<PlacedItem[]>([]);
  const [modelUrl, setModelUrl] = useState<string>(MODEL_OPTIONS[0].url);

  const addItem = (position: PlacedItem['position']) => {
    setItems((currentItems) => [
      ...currentItems,
      { id: crypto.randomUUID(), position, modelUrl },
    ]);
  };

  return (
    <div className="constructor-page">
      <section className="control-panel" aria-label="Plot controls">
        <p className="agency-name">{agency ? agency.name : 'Loading agency…'}</p>
        <h2>Конструктор участка</h2>
        <label>
          Ширина (м)
          <input
            type="number"
            value={size.width}
            onChange={(event) => setSize({ ...size, width: Number(event.target.value) })}
          />
        </label>
        <label>
          Длина (м)
          <input
            type="number"
            value={size.length}
            onChange={(event) => setSize({ ...size, length: Number(event.target.value) })}
          />
        </label>
        <label>
          Модель
          <select value={modelUrl} onChange={(event) => setModelUrl(event.target.value)}>
            {MODEL_OPTIONS.map((model) => (
              <option key={model.url} value={model.url}>{model.label}</option>
            ))}
          </select>
        </label>
        <p className="items-count">Объектов на сцене: {items.length}</p>
        <button type="button" onClick={() => setItems([])} disabled={!items.length}>
          Очистить сцену
        </button>
      </section>
      <Scene
        width={size.width}
        length={size.length}
        items={items}
        onGroundClick={addItem}
      />
    </div>
  );
}

export function App() {
  const [isLoginPage, setIsLoginPage] = useState(window.location.pathname === '/login');
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [agency, setAgency] = useState<Agency | null>(null);

  useEffect(() => {
    const updatePage = () => setIsLoginPage(window.location.pathname === '/login');
    window.addEventListener('popstate', updatePage);
    return () => window.removeEventListener('popstate', updatePage);
  }, []);

  useEffect(() => {
    if (!token || isLoginPage) return;

    const config = { headers: { Authorization: `Bearer ${token}` } };

    api.get<Agency>('/auth/me', config)
      // The fallback keeps the frontend usable while older API deployments use
      // the previous `/auth/my` route.
      .catch(() => api.get<Agency>('/auth/my', config))
      .then((response) => setAgency(response.data))
      .catch(() => {
        localStorage.removeItem('token');
        setAgency(null);
        setToken(null);
      });
  }, [isLoginPage, token]);

  if (isLoginPage || !token) {
    return <Login onSuccess={(newToken) => {
      setToken(newToken);
      setIsLoginPage(false);
    }} />;
  }

  return <ControlPanel agency={agency} />;
}

export default App;
