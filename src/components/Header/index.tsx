import styles from "./header.module.scss";

export default function Header() {
  return (
    <>
      <header className={styles.headerContainer}>
        <a href="/" className={styles.headerContent}>
          <img src="/images/logo.svg" alt="logo"></img>
        </a>
      </header>
    </>
  )
}
