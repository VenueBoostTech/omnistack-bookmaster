// src/middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    
    if (isAdminRoute) {
      // Check if user has a valid role
      if (!["ADMIN", "MANAGER", "USER", "ACCOUNTANT"].includes(token?.role as string)) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
      }

      // Restrict access to specific sections based on role
      const pathParts = req.nextUrl.pathname.split('/')
      const section = pathParts[2] // /admin/[section]/*

      // Role-based access control
      if (section) {
        const restrictedAccess = {
          // Financial sections restricted to ADMIN and ACCOUNTANT
          'accounts': ['ADMIN', 'ACCOUNTANT'],
          'transactions': ['ADMIN', 'ACCOUNTANT'],
          'users': ['ADMIN'], // Only ADMIN can manage users
          'settings': ['ADMIN'], // Only ADMIN can access settings
        }

        if (
          restrictedAccess[section] && 
          !restrictedAccess[section].includes(token?.role as string)
        ) {
          // Redirect to dashboard if user doesn't have access
          return NextResponse.redirect(new URL("/admin/dashboard", req.url))
        }
      }

      // If no specific route, redirect to dashboard
      if (req.nextUrl.pathname === '/admin') {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}