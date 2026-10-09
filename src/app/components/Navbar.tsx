"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#que-es-beloq", label: "Qué es beloq" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#sectores", label: "Sectores" },
  { href: "/#impacto", label: "Impacto" },
  { href: "/#app", label: "App" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Transparente (blanca) solo sobre la foto de la portada; en el resto de
  // páginas el fondo es claro y la cabecera va sólida desde arriba.
  const pathname = usePathname();
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={solid ? "/images/logo-black.png" : "/images/logo-white.png"}
            alt="beloq"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-beloq-yellow ${
                solid ? "text-beloq-dark" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/info"
            className={`text-sm font-medium transition-colors hover:text-beloq-yellow ${
              solid ? "text-beloq-dark" : "text-white"
            }`}
          >
            Ayuda
          </Link>
          <Link
            href="/contacto"
            className="bg-beloq-yellow text-beloq-dark font-bold text-sm px-6 py-2.5 rounded-full hover:bg-beloq-yellow-dark transition-colors"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
        >
          <span
            className={`block w-6 h-0.5 transition-transform ${
              solid ? "bg-beloq-dark" : "bg-white"
            } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-opacity ${
              solid ? "bg-beloq-dark" : "bg-white"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-transform ${
              solid ? "bg-beloq-dark" : "bg-white"
            } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-beloq-dark font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/info"
              onClick={() => setMenuOpen(false)}
              className="text-beloq-dark font-medium py-2"
            >
              Ayuda
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMenuOpen(false)}
              className="bg-beloq-yellow text-beloq-dark font-bold text-center px-6 py-2.5 rounded-full"
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
