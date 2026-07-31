import connectToDatabase from './mongodb';
import User from '../models/User';
import Property from '../models/Property';
import Amenity from '../models/Amenity';
import MaintenanceRequest from '../models/MaintenanceRequest';
import Booking from '../models/Booking';
import Message from '../models/Message';
import Notification from '../models/Notification';
import ActivityLog from '../models/ActivityLog';
import bcrypt from 'bcryptjs';

export async function seedInitialData() {
  try {
    await connectToDatabase();

    const userCount = await User.countDocuments();
    let owner = null;
    let tenant = null;
    let staff = null;

    if (userCount === 0) {
      console.log('Seeding initial production users into MongoDB Atlas...');

      const hashedPassword = await bcrypt.hash('password123', 10);

      await User.create({
        name: 'Eleanor Vance (Admin)',
        email: 'admin@kasasync.com',
        password: hashedPassword,
        role: 'Admin',
        phoneNumber: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      });

      owner = await User.create({
        name: 'Marcus Sterling (Property Owner)',
        email: 'owner@kasasync.com',
        password: hashedPassword,
        role: 'Property Owner',
        phoneNumber: '+91 98765 43211',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      });

      tenant = await User.create({
        name: 'Sophia Martinez (Tenant)',
        email: 'tenant@kasasync.com',
        password: hashedPassword,
        role: 'Tenant',
        phoneNumber: '+91 98765 43212',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      });

      staff = await User.create({
        name: 'David Miller (Maintenance Technician)',
        email: 'staff@kasasync.com',
        password: hashedPassword,
        role: 'Maintenance Staff',
        phoneNumber: '+91 98765 43213',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      });
    } else {
      owner = await User.findOne({ role: 'Property Owner' }) || await User.findOne({ role: 'Admin' });
      tenant = await User.findOne({ role: 'Tenant' });
      staff = await User.findOne({ role: 'Maintenance Staff' });
    }

    const propertyCount = await Property.countDocuments();
    let property1 = null;

    if (propertyCount === 0) {
      console.log('Seeding initial property data into MongoDB Atlas...');

      if (!owner) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        owner = await User.create({
          name: 'Marcus Sterling (Property Owner)',
          email: 'owner@kasasync.com',
          password: hashedPassword,
          role: 'Property Owner',
          phoneNumber: '+91 98765 43211',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        });
      }

      property1 = await Property.create({
        title: 'The Glass Pavilion Luxury Penthouse',
        description: 'High-floor corner penthouse boasting floor-to-ceiling glass walls, Italian marble counters, smart home automation, and private balcony skyline views.',
        type: 'Penthouse',
        price: 48000,
        address: { street: '742 MG Road, Penthouse B', city: 'Bengaluru', state: 'Karnataka', zipCode: '560001', country: 'India' },
        bedrooms: 3,
        bathrooms: 3,
        areaSqFt: 2400,
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'],
        ownerId: owner._id,
        tenantId: tenant ? tenant._id : null,
        status: 'Occupied',
      });

      await Property.create({
        title: 'Sunset Villa Estate & Coastal Pool',
        description: 'Mediterranean inspired waterfront villa with private infinity pool, outdoor kitchen, lush gardens, and 3-car garage.',
        type: 'Villa',
        price: 85000,
        address: { street: '1280 ECR Coastal Highway', city: 'Chennai', state: 'Tamil Nadu', zipCode: '600041', country: 'India' },
        bedrooms: 5,
        bathrooms: 4,
        areaSqFt: 4500,
        images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800'],
        ownerId: owner._id,
        status: 'Available',
      });

      console.log('Sample properties created.');
    } else {
      property1 = await Property.findOne();
    }

    const amenityCount = await Amenity.countDocuments();
    let pool = null;

    if (amenityCount === 0) {
      pool = await Amenity.create({
        name: 'Rooftop Infinity Pool',
        category: 'Swimming Pool',
        description: 'Heated rooftop pool with lounge chairs and sunset views.',
        capacity: 25,
        openingTime: '06:00',
        closingTime: '22:00',
        images: ['https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'],
      });

      await Amenity.create({
        name: 'Executive Fitness Center',
        category: 'Gym',
        description: 'State-of-the-art cardio and weight training facility.',
        capacity: 30,
        openingTime: '05:00',
        closingTime: '23:00',
        images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'],
      });
    } else {
      pool = await Amenity.findOne();
    }

    const maintenanceCount = await MaintenanceRequest.countDocuments();
    if (maintenanceCount === 0 && property1 && tenant) {
      await MaintenanceRequest.create({
        title: 'Leaking kitchen sink pipe',
        description: 'Water leaking steadily beneath main sink basin.',
        propertyId: property1._id,
        tenantId: tenant._id,
        assignedStaffId: staff ? staff._id : null,
        priority: 'High',
        status: 'In Progress',
        images: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800'],
        notes: [
          { authorName: 'Sophia Martinez', authorRole: 'Tenant', text: 'Noticed leak under sink this morning.' },
        ],
      });
    }

    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0 && pool && tenant) {
      await Booking.create({
        amenityId: pool._id,
        tenantId: tenant._id,
        bookingDate: new Date().toISOString().split('T')[0],
        startTime: '10:00',
        endTime: '12:00',
        totalGuests: 2,
        notes: 'Poolside birthday celebration.',
        status: 'Confirmed',
      });
    }

    const messageCount = await Message.countDocuments();
    if (messageCount === 0 && tenant && owner) {
      await Message.create({
        senderId: tenant._id,
        receiverId: owner._id,
        text: 'Hi Marcus, just checking in about the maintenance request for the kitchen sink leak.',
        isRead: false,
      });
    }

    const notificationCount = await Notification.countDocuments();
    if (notificationCount === 0 && tenant) {
      await Notification.create({
        userId: tenant._id,
        title: 'Maintenance Update',
        message: 'Technician David Miller has updated status to In Progress.',
        type: 'MAINTENANCE',
        isRead: false,
      });
    }

  } catch (err) {
    console.error('Error during MongoDB Atlas seed:', err);
  }
}
