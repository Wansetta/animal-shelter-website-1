import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/files/b627b5b9-c57e-4ec6-9e93-dce4bf70d2aa.png"
              alt="Логотип Преданность"
              className="h-12"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">
                Преданность
              </span>
              <span className="text-xs text-gray-600">Приют для животных</span>
            </div>
          </Link>

          {/* Мобильная навигация */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 focus:outline-none"
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/catalog">Каталог</NavLink>
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/found-pet">Нашел питомца</NavLink>
            <NavLink to="/support" className="btn-accent">
              Поддержать нас
            </NavLink>
            <AdminButton />
          </nav>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden fade-in-animation mt-4 pb-2">
            <nav className="flex flex-col gap-4">
              <MobileNavLink to="/" onClick={toggleMobileMenu}>
                Главная
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={toggleMobileMenu}>
                О нас
              </MobileNavLink>
              <MobileNavLink to="/found-pet" onClick={toggleMobileMenu}>
                Нашел питомца
              </MobileNavLink>
              <MobileNavLink
                to="/support"
                onClick={toggleMobileMenu}
                className="bg-accent text-white py-2 px-4 rounded-md text-center"
              >
                Поддержать нас
              </MobileNavLink>
              <div className="pt-2">
                <AdminButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ to, children, className }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`text-gray-700 hover:text-primary font-medium transition-colors ${className || ""}`}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({
  to,
  onClick,
  children,
  className,
}: MobileNavLinkProps) => {
  return (
    <Link
      to={to}
      className={`block py-2 text-gray-700 hover:text-primary font-medium transition-colors ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const AdminButton = () => {
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password === "Admin1") {
      setIsOpen(false);
      setPassword("");
      setError("");
      navigate("/admin");
    } else {
      setError("Неверный пароль");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setPassword("");
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-primary"
        >
          <Settings size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Администрирование</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleClose}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>Войти</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Header;
