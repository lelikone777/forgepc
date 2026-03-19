import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "Конфигуратор", path: "/configurator" },
  { label: "Каталог", path: "/catalog" },
  { label: "О компании", path: "/about" },
  { label: "Блог", path: "/blog" },
  { label: "Контакты", path: "/contacts" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-surface shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PC</span>
            </div>
            <span className="font-display text-lg tracking-tight text-foreground">
              FORGE<span className="text-primary">PC</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Переключить тему"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/configurator"
              className="hidden md:inline-flex px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Собрать ПК
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-20 glass-surface lg:hidden"
          >
            <nav className="flex flex-col items-center gap-2 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`w-full text-center px-6 py-4 rounded-xl text-lg font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-accent"
                      : "text-foreground hover:bg-accent/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/configurator"
                className="w-full text-center mt-4 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg"
              >
                Собрать ПК
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PC</span>
              </div>
              <span className="font-display text-lg text-foreground">
                FORGE<span className="text-primary">PC</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Кастомные ПК на заказ для игр, работы, стриминга, 3D, монтажа, разработки и локального ИИ.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Навигация</h4>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Сборки</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Игровые ПК</span>
              <span>Рабочие станции</span>
              <span>ПК для монтажа и 3D</span>
              <span>ПК для локального ИИ</span>
              <span>Премиальные сборки</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Контакты</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>info@forgepc.ru</span>
              <span>+7 (999) 123-45-67</span>
              <span>Москва, Россия</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 ForgePC. Все права защищены.</p>
          <p className="text-xs text-muted-foreground">Кастомная сборка компьютеров на заказ</p>
        </div>
      </div>
    </footer>
  );
}
