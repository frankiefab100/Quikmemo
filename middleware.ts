import { auth } from '@/auth';

export default auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/dashboard/:path*'],
};