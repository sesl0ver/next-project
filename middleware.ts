import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// --- 설정 ---
// 실제 애플리케이션에서 사용하는 인증 토큰 쿠키의 이름을 입력하세요.
const AUTH_COOKIE_NAME = 'access_token'; // 예: 'accessToken', 'session_id' 등
const USERDATA_COOKIE_NAME = 'user-data';

// 로그인이 필요한 페이지 경로들 (정규식 또는 문자열 배열)
// 예: '/dashboard', '/profile', '/settings' 등
const PROTECTED_ROUTES = ['/dashboard'];

// 로그인 페이지 경로
const LOGIN_ROUTE = '/login';
// --- 설정 끝 ---

// 가상의 토큰 유효성 검사 함수 (실제 구현 필요!)
// 실제로는 서버 API에 요청을 보내거나, JWT 토큰을 직접 검증해야 합니다.
async function isValidToken(tokenValue: string | undefined): Promise<boolean> {
    if (!tokenValue) {
        return false;
    }

    try {
        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        await jwtVerify(tokenValue, JWT_SECRET);

        // 토큰 검증 성공하면 요청 계속 진행
        return true
    } catch (error) {
        console.error('JWT 검증 실패:', error)
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    // console.log(`Middleware: Path='${pathname}', Token='${token ? 'Present' : 'Missing'}'`);

    const res = NextResponse.next(); // 먼저 하나 만들고 시작
    const isTokenValid = await isValidToken(token);

    if (token) {
        const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userData = {
            account_id: payload.account_id,
            username: payload.username,
            avatar: payload.avatar,
        }
        const base64User = Buffer.from(JSON.stringify(userData)).toString('base64');
        // 쿠키에 유저 데이터 저장
        res.cookies.set(USERDATA_COOKIE_NAME, base64User, {
            httpOnly: false, // JS에서도 읽을 수 있게 (진짜 민감하면 true 추천)
            secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 HTTPS만
            sameSite: 'lax', // CSRF 방어
            path: '/', // 모든 경로에 적용
            maxAge: 60 * 60 * 24, // 1일
        });
    } else {
        res.cookies.set(USERDATA_COOKIE_NAME, "", {
            httpOnly: false, // JS에서도 읽을 수 있게 (진짜 민감하면 true 추천)
            secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 HTTPS만
            sameSite: 'lax', // CSRF 방어
            path: '/', // 모든 경로에 적용
            maxAge: -1,  // maxAge를 -1로 설정하여 쿠키를 즉시 만료시킴
            expires: new Date(0),  // expires를 1970년 1월 1일로 설정하여 쿠키를 만료시킴
        });
    }

    // 로그인이 필요한 경로 접근 시
    if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        if (!isTokenValid) {
            // console.log('Middleware: Invalid token for protected route. Redirecting to login.');
            // 로그인 페이지로 리다이렉트 (원래 가려던 경로를 쿼리 파라미터로 넘겨줄 수 있음)
            const url = request.nextUrl.clone();
            url.pathname = LOGIN_ROUTE;
            url.searchParams.set('redirect_to', pathname); // 로그인 후 돌아올 경로
            return NextResponse.redirect(url);
        }
        // 유효한 토큰이 있으면 요청 통과
        // console.log('Middleware: Valid token for protected route. Allowing.');
        return res;
    }

    // 로그인 페이지 접근 시
    if (pathname === LOGIN_ROUTE) {
        if (isTokenValid) {
            console.log('Middleware: Valid token but accessing login page. Redirecting to dashboard.');
            // 이미 로그인 상태인데 로그인 페이지 접근 시, 대시보드 같은 메인 페이지로 리다이렉트
            const url = request.nextUrl.clone();
            url.pathname = PROTECTED_ROUTES[0] || '/'; // 설정된 보호 경로 중 첫번째 또는 루트로 이동
            return NextResponse.redirect(url);
        }
        // 토큰이 없거나 유효하지 않으면 로그인 페이지 접근 허용
        console.log('Middleware: No valid token, allowing access to login page.');
        return res;
    }

    // 그 외 모든 경로는 기본적으로 허용 (홈, 정보 페이지 등)
    // console.log('Middleware: Public route. Allowing.');
    return res;
}

// 미들웨어를 적용할 경로를 지정합니다.
// 불필요한 경로(_next/static, _next/image, favicon.ico 등)는 제외하여 성능을 최적화합니다.
export const config = {
    matcher: [
        /*
         * 다음으로 시작하는 경로는 제외합니다:
         * - api (API 라우트) -> API 자체에서 인증을 처리할 수 있음 (필요시 포함)
         * - _next/static (정적 파일)
         * - _next/image (이미지 최적화 파일)
         * - favicon.ico (파비콘 파일)
         * - /login (로그인 페이지 자체는 미들웨어 로직 내에서 처리)
         * - / (루트 페이지 - 필요에 따라 보호 여부 결정)
         */
        // '/((?!api|_next/static|_next/image|favicon.ico|login).*)', // 로그인 페이지 제외 시
        '/((?!api|_next/static|_next/image|favicon.ico).*)', // 모든 페이지 경로 대상 (로그인 페이지 포함하여 로직 내 처리)

        // 특정 페이지만 보호하고 싶다면 matcher를 더 구체적으로 설정할 수 있습니다.
        // 예: ['/dashboard/:path*', '/mypage/:path*']
    ],
};