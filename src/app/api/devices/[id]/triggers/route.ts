import { NextResponse } from 'next/server';
import ExtrahopApi from '@/utils/ExtrahopApi';

const api = new ExtrahopApi(process.env.EXTRAHOP_BASE_URL, process.env.EXTRAHOP_API_KEY);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await api.getDeviceTriggers(params.id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string; 'child-id': string } }) {
  try {
    const result = await api.deleteDeviceTrigger(params.id, params['child-id']);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}