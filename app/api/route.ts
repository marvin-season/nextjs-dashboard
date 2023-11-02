import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams

    console.log('searchParams', searchParams);
    

    const cookieStore = cookies()
    const token = cookieStore.get('token')

    return new Response('Hello, Next.js!', {
        status: 200,
        headers: { 'Set-Cookie': `token=dh23894hdhjkciowebe=` },
    })
}