import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Button, Avatar, ThemeToggle } from '@/components';

export function Layout() {
  const { user, logout, isLoggingOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/stories', label: 'Stories' },
    { path: '/register', label: 'Register' },
    { path: '/audit', label: 'Audit Trail' },
  ];

  return (
    <div className="app">
      <header className="app__header">
        <div className="header">
          <Link to="/dashboard" className="header__logo">
            Mystira Publisher
          </Link>

          <nav className="header__nav">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`header__link ${location.pathname.startsWith(item.path) ? 'header__link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__user">
            <ThemeToggle />
            {user && (
              <>
                <Avatar name={user.name} size="sm" />
                <span className="header__user-name">{user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} loading={isLoggingOut}>
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="app__main">
        <aside className="app__sidebar">
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-nav__link ${location.pathname.startsWith(item.path) ? 'sidebar-nav__link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="app__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
