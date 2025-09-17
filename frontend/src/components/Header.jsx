import { Link } from 'react-router-dom';
export default function Header() {
  return (
  <header>
    <h1>
      <Link to="/feeds/" style={{ color: 'inherit', textDecoration: 'none' }}>Flux RSS</Link>
    </h1>
    <p>Une application pour lire et gérer vos flux RSS.</p>
  </header>
    );
}