import { Link } from 'react-router-dom';

export function SkipLink() {
  return (
    <Link to="#main-content" className="skip-link">
      Skip to main content
    </Link>
  );
}

