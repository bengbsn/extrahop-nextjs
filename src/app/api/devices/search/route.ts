import { NextResponse } from 'next/server';
import ExtrahopApi from '@/utils/ExtrahopApi';

const api = new ExtrahopApi(process.env.EXTRAHOP_BASE_URL, process.env.EXTRAHOP_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await api.searchDevices(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}