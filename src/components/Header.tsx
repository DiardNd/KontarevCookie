import { useMobile } from "../hooks/useMobile"

function Header() {
  const isMobile = useMobile()
  return (
    <header className="site-header">
      <div className="header-inner">
        {!isMobile && <div className="header-menu">Меню</div>}
        <nav className="header-nav" aria-label="Навигация по странице">
          <a href="#home">Главная</a>
          <a href="#products">Продукция</a>
          <a href="#about">О нас</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
