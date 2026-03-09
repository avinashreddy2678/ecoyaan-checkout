import { mockCartData } from '@/lib/mockData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return NextResponse.json(mockCartData);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch cart data' },
      { status: 500 }
    );
  }
}
