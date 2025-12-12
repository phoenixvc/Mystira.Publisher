import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Alert, Card, CardBody } from '@/components';
import { useAuth } from '@/hooks';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggingIn, loginError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch {
      // Error is handled by loginError state
    }
  };

  return (
    <div className="page page--login">
      <Card className="login-card">
        <CardBody>
          <h1>Sign In</h1>
          <p>Welcome back to Mystira Publisher</p>

          {loginError && (
            <Alert variant="error">
              {loginError instanceof Error ? loginError.message : 'Login failed. Please try again.'}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            <Button type="submit" loading={isLoggingIn} fullWidth>
              Sign In
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
