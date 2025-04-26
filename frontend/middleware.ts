import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'auth-token';
const PUBLIC_PATHS = ['/', '/sandbox'];

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const { pathname } = new URL(request.url);

  // Permet l'accès aux chemins publics sans authentification
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Vérifie le token d'authentification
  const authToken = request.cookies.get(AUTH_COOKIE);

  if (!authToken) {
    // Redirige vers la page de connexion si non authentifié
    console.log("Pas d'authentification");
    //return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Vérifie la validité du token
    // Ajoutez votre logique de vérification ici

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    // En cas d'erreur d'authentification
    console.error("Erreur d'authentification:", error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure sur quels chemins le middleware doit s'exécuter
export const config = {
  matcher: [
    // Applique le middleware à tous les chemins sauf les fichiers statiques
    '/((?!_next/static|images|favicon.ico).*)',
  ],
};
