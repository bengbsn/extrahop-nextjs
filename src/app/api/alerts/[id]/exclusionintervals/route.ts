import { NextResponse } from 'next/server';
import ExtrahopApi from '@/utils/ExtrahopApi';

const api = new ExtrahopApi(process.env.EXTRAHOP_BASE_URL, process.env.EXTRAHOP_API_KEY);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await api.getAlertExclusionIntervals(params.id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}