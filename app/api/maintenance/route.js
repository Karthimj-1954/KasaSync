import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import MaintenanceRequest from '../../../models/MaintenanceRequest';

const MOCK_MAINTENANCE = [
  {
    _id: 'maint_1',
    id: 'maint_1',
    title: 'HVAC Air Conditioning Cooling Malfunction',
    description: 'The central air conditioning system in the master bedroom is blowing warm air.',
    propertyId: { _id: 'prop_1', title: 'The Glass Pavilion Luxury Penthouse' },
    tenantId: { _id: 'tenant_1', name: 'Sophia Martinez' },
    assignedStaffId: { _id: 'staff_1', name: 'David Miller' },
    priority: 'High',
    status: 'In Progress',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758'],
    notes: [{ authorName: 'David Miller', authorRole: 'Maintenance Staff', text: 'Inspected compressor capacitor.', createdAt: new Date().toISOString() }],
  },
];

export async function GET() {
  try {
    await connectToDatabase();
    const requests = await MaintenanceRequest.find()
      .populate('propertyId', 'title')
      .populate('tenantId', 'name')
      .populate('assignedStaffId', 'name')
      .sort({ createdAt: -1 });

    if (!requests || requests.length === 0) {
      return NextResponse.json({ requests: MOCK_MAINTENANCE });
    }
    return NextResponse.json({ requests });
  } catch (e) {
    return NextResponse.json({ requests: MOCK_MAINTENANCE });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();
    const request = await MaintenanceRequest.create({ ...data, status: 'Pending' });
    return NextResponse.json({ request }, { status: 201 });
  } catch (e) {
    const data = await req.json().catch(() => ({}));
    return NextResponse.json({ request: { _id: `maint_${Date.now()}`, ...data, status: 'Pending' } }, { status: 201 });
  }
}
