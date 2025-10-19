export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Reuse Prisma client in dev to avoid too many connections
const prisma = global.prisma ?? new PrismaClient();
if (!global.prisma) global.prisma = prisma;

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<{
      name: string;
      email: string;
      phone?: string;
      destination?: string;
      message: string;
    }>;

    // Basic validation
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidEmail(String(body.email))) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const created = await prisma.inquiry.create({
      data: {
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        phone: body.phone ? String(body.phone).trim() : null,
        destination: body.destination ? String(body.destination).trim() : null,
        message: String(body.message).trim(),
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error('inquiry error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}