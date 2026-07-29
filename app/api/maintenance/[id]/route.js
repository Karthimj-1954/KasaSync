import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { seedInitialData } from '@/lib/seed';
import MaintenanceRequest from '@/models/MaintenanceRequest';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    await seedInitialData();

    const request = await MaintenanceRequest.findById(id)
      .populate('propertyId')
      .populate('tenantId', 'name email avatar')
      .populate('assignedStaffId', 'name email avatar');

    if (!request) {
      return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error("Get Maintenance Ticket Error", error);
    return NextResponse.json({ message: 'Failed to fetch ticket details', error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  const data = await req.json();

  try {
    await connectToDatabase();

    const updateFields = {};
    if (data.status) updateFields.status = data.status;
    if (data.assignedStaffId) updateFields.assignedStaffId = data.assignedStaffId;
    if (data.priority) updateFields.priority = data.priority;

    let updateQuery = { $set: updateFields };

    if (data.noteText) {
      updateQuery.$push = {
        notes: {
          authorName: data.authorName || 'Staff Technician',
          authorRole: data.authorRole || 'Maintenance Staff',
          text: data.noteText,
          createdAt: new Date(),
        },
      };
    }

    const request = await MaintenanceRequest.findByIdAndUpdate(id, updateQuery, { new: true, runValidators: true })
      .populate('propertyId')
      .populate('tenantId', 'name email avatar')
      .populate('assignedStaffId', 'name email avatar');

    if (!request) {
      return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error("Update Maintenance Ticket Error", error);
    return NextResponse.json({ message: 'Failed to update ticket', error: error.message }, { status: 500 });
  }
}
