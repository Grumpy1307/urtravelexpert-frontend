import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  destination?: string;
  message: string;
  createdAt: string;
};

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Inquiry>;
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const inquiry: Inquiry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: body.phone ? String(body.phone).trim() : '',
      destination: body.destination ? String(body.destination).trim() : '',
      message: String(body.message).trim(),
      createdAt: new Date().toISOString(),
    };

    // save to a local file for now (dev only)
    // file is at project-root /data/inquiries.json
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    const file = path.join(dataDir, 'inquiries.json');

    let arr: Inquiry[] = [];
    try {
      const existing = await fs.readFile(file, 'utf8');
      arr = JSON.parse(existing) as Inquiry[];
    } catch (e) {
      // ignore if file doesn't exist or invalid
      arr = [];
    }

    arr.unshift(inquiry); // newest first
    await fs.writeFile(file, JSON.stringify(arr, null, 2), 'utf8');

    // TODO: enqueue email/SMS or send webhook to ops here

    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (err) {
    console.error('inquiry error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}