import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from '@/components';
import { useAuth } from '@/hooks';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page page--home">
      <section className="hero">
        <h1>Mystira Publisher</h1>
        <p className="hero__subtitle">
          Register your creative stories on-chain with transparent attribution and royalty splits.
        </p>
        <div className="hero__actions">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Why Mystira Publisher?</h2>
        <div className="features__grid">
          <Card>
            <CardBody>
              <h3>Transparent Attribution</h3>
              <p>Every contributor is recognized with clear role assignments and royalty splits.</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3>Consensus-Based</h3>
              <p>All contributors must approve before registration, ensuring fairness.</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3>Immutable Records</h3>
              <p>On-chain registration creates permanent, verifiable proof of ownership.</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3>Full Audit Trail</h3>
              <p>Every action is logged for complete transparency and legal compliance.</p>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
