import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate('/app');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.brand}>LinkedIn Coach</h1>
        <p className={styles.tagline}>Write better. Post smarter.</p>

        <form className={styles.form} onSubmit={handleLogin}>
          <input className={styles.input} type="text"     placeholder="Username" />
          <input className={styles.input} type="password" placeholder="Password" />
          <button className={styles.btn} type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
