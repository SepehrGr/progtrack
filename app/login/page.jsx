import Header from '@/app/login/Header'
import LoginForm from './LoginForm'
import styles from './login.module.css'

export default function LoginPage() {
  return (
    <main className='h-screen text-black bg-white'>
      <Header />
      <div className={styles.login}>
        <div className={styles.overlay}></div>
        <LoginForm />
      </div>
    </main>
  )
}
