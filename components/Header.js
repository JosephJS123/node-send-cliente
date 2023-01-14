import React, { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;

  // Extrar el usuario autenticado del local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      usuarioAutenticado();
    }
  }, []);

  const redireccionar = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img
        onClick={() => redireccionar()}
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
      />

      <div>
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {usuario.nombre}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link
              className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
              href="/login"
            >
              Iniciar Sesión
            </Link>

            <Link
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              href="/crearcuenta"
            >
              Crear Cuenta
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
