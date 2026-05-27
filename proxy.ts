import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/cad-management",
  "/taller-documentacion-de-obras",
  "/workshop-cotizacion-de-obras",
  "/pack-completo",
  "/bootcamp",
  "/legal/(.*)",
  "/verify(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
