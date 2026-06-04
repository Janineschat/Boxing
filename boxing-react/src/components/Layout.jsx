import { Link, NavLink } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/titels", label: "Titels" },
  { to: "/champions", label: "Champions" },
  { to: "/upcoming-fights", label: "Upcoming Fights" },
];

export default function Layout({ tag, title, subtitle, heroExtra, children }) {
  return (
    <>
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <nav className="top-nav" aria-label="Pagina navigatie">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `top-nav-link${isActive ? " active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" aria-label="Ga naar home">
            <img
              className="site-logo"
              src={assetUrl("/images/logo.jpg")}
              alt="Boxing World logo"
            />
          </Link>

          {tag ? <p className="tag">{tag}</p> : null}
          {title ? <h1>{title}</h1> : null}
          {subtitle ? <p className="subtitle">{subtitle}</p> : null}
          {heroExtra}
        </div>
      </header>

      <main className="page-content">{children}</main>
    </>
  );
}
