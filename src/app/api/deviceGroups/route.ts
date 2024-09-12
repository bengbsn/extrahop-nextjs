import { NextResponse } from 'next/server';
import ExtrahopApi from '@/utils/ExtrahopApi';

const api = new ExtrahopApi(process.env.EXTRAHOP_BASE_URL, process.env.EXTRAHOP_API_KEY);

export async function GET() {
  try {
    const data = await api.getAllDeviceGroups();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await api.createDeviceGroup(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...data } = await req.json();
    const result = await api.updateDeviceGroup(id, data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const result = await api.deleteDeviceGroup(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}