import { usePathname } from "next/navigation"
import { useLanguage } from '@/app/context/LanguageContext';
import Image from "next/image"
import Link from "next/link"
import styles from "./nav.module.scss"

export default function Nav() {
  const { t } = useLanguage();
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="Logo MySPA" width={200} height={56} priority/>
      </div>
      <ul className={`${styles.links}`}>
        <li className={pathname === '/' ? styles.active : ""}><Link href="/">{t('users')}</Link></li>
        <li className={pathname === '/news' ? styles.active : ""}><Link href="/news">{t('news')}</Link></li>
      </ul>
    </nav>
  )
}
