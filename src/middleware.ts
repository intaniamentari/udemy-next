import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    try {
        const route = request.nextUrl.pathname
        const token = request.cookies.get("token")?.value
        const role = request.cookies.get("role")?.value

        const isPrivateRoute = route.startsWith("/user") || route.startsWith("/salon-spa-owner")

        // if the route is private, but the user is not authenticated then redirect to login
        if (isPrivateRoute && !token) {
            return NextResponse.redirect(new URL("/login", request.url))
        }

        // if the rouse is public and the user is authenticated then redirect to dashboard
        if (!isPrivateRoute && token) {
            return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
        }

        // if user is authenticated and try to access page is not permitted
        if (token) {
            if (role === 'user' && route.startsWith('/user')) {
                return NextResponse.next()
            }

            if (role === 'salon-spa-owner' && route.startsWith('/salon-spa-owner')) {
                return NextResponse.next()
            }

            // user access page is not permitted
            return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
        }

        return NextResponse.next()
    } catch (error) {
        return NextResponse.error()
    }
}