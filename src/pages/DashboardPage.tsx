import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storiesApi } from '@/api';
import { Button, Card, CardBody, CardHeader, Badge, Spinner } from '@/components';
import { useAuth } from '@/hooks';

export function DashboardPage() {
  const { user } = useAuth();

  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories', { pageSize: 5 }],
    queryFn: () => storiesApi.list({ pageSize: 5 }),
  });

  return (
    <div className="page page--dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}</h1>
        <Link to="/register">
          <Button>Register New Story</Button>
        </Link>
      </header>

      <div className="dashboard-grid">
        <Card>
          <CardHeader>
            <h2>Recent Stories</h2>
            <Link to="/stories">View All</Link>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <Spinner />
            ) : stories?.items.length === 0 ? (
              <p>No stories yet. Create your first registration!</p>
            ) : (
              <ul className="dashboard-stories">
                {stories?.items.map(story => (
                  <li key={story.id}>
                    <Link to={`/stories/${story.id}`} className="dashboard-story">
                      <span className="dashboard-story__title">{story.title}</span>
                      <Badge variant={getStatusVariant(story.status)}>{story.status}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2>Quick Actions</h2>
          </CardHeader>
          <CardBody>
            <nav className="dashboard-actions">
              <Link to="/register">
                <Button variant="outline" fullWidth>Start Registration</Button>
              </Link>
              <Link to="/stories">
                <Button variant="outline" fullWidth>View All Stories</Button>
              </Link>
              <Link to="/audit">
                <Button variant="outline" fullWidth>Audit Trail</Button>
              </Link>
            </nav>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'registered':
      return 'success' as const;
    case 'pending_approval':
      return 'warning' as const;
    case 'rejected':
      return 'danger' as const;
    default:
      return 'default' as const;
  }
}
