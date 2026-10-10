import { NextResponse } from 'next/server';
import { insertQuote } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      vehicleMake,
      vehicleModel,
      vehicleSize,
      detailingTier,
      estimatedPrice,
      serviceLocation,
      addOns,
      preferredDate,
      message
    } = body;

    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Email, Phone).' },
        { status: 400 }
      );
    }

    const saved = await insertQuote({
      firstName,
      lastName: lastName || '',
      email,
      phone,
      vehicleMake: vehicleMake || 'Unspecified',
      vehicleModel: vehicleModel || 'Unspecified',
      vehicleSize: vehicleSize || 'Sedan / Hatch',
      detailingTier: detailingTier || 'Full Signature Detail & Ceramic Protection',
      estimatedPrice: estimatedPrice ? Number(estimatedPrice) : undefined,
      serviceLocation: serviceLocation || 'Mobile Service',
      addOns: addOns || '',
      preferredDate: preferredDate || '',
      message: message || '',
    });

    return NextResponse.json({
      success: true,
      quote: saved,
      message: 'Thank you! Your detailing booking request has been received. Our technician will contact you shortly.',
    });
  } catch (error: any) {
    console.error('API /api/quote error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit booking request.' },
      { status: 500 }
    );
  }
}
