import config from '@/lib/config'
import ImageKit from 'imagekit'
import { NextResponse } from 'next/server'
const {env
        :{imagekit
            :{publicKey,
            privateKey,
            urlEndpoint}
        }
    }=config

const imagekit=new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,

})

export async function GET(){
    return NextResponse.json(imagekit.getAuthenticationParameters(), {
    headers: {
      'Access-Control-Allow-Origin': '*', // Or your Vercel domain
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }},)
}