import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import MaintenanceRequest from '../../../../models/MaintenanceRequest';

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

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    const request = await MaintenanceRequest.findById(id).populate('propertyId').populate('tenantId').populate('assignedStaffId');
    if (request) return NextResponse.json({ request });
  } catch (e) {}

  return NextResponse.json({ request: MOCK_MAINTENANCE[0] });
}

export async function PUT(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const data = await req.json();

  try {
    await connectToDatabase();
    const request = await MaintenanceRequest.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ request });
  } catch (e) {
    return NextResponse.json({ request: { _id: id, ...data } });
  }
}
