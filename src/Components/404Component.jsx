import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>
        <Link to="/">Go back to Home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;