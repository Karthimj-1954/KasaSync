require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/Property');
const Amenity = require('../models/Amenity');
const MaintenanceRequest = require('../models/MaintenanceRequest');
const Booking = require('../models/Booking');
const Message = require('../models/Message');

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI missing from environment');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB Atlas...');

    // Clear existing collections
    await User.deleteMany({});
    await Property.deleteMany({});
    await Amenity.deleteMany({});
    await MaintenanceRequest.deleteMany({});
    await Booking.deleteMany({});
    await Message.deleteMany({});

    console.log('[Seed] Cleared existing data.');

    // 1. Create Users
    const admin = await User.create({
      name: 'Eleanor Vance (Admin)',
      email: 'admin@kasasync.com',
      password: 'Password123!',
      role: 'Admin',
      phoneNumber: '+1 (555) 019-2834',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    });

    const owner = await User.create({
      name: 'Marcus Sterling (Property Owner)',
      email: 'owner@kasasync.com',
      password: 'Password123!',
      role: 'Property Owner',
      phoneNumber: '+1 (555) 012-9843',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    });

    const tenant = await User.create({
      name: 'Sophia Martinez (Tenant)',
      email: 'tenant@kasasync.com',
      password: 'Password123!',
      role: 'Tenant',
      phoneNumber: '+1 (555) 014-5521',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    });

    const staff = await User.create({
      name: 'David Miller (Maintenance Technician)',
      email: 'staff@kasasync.com',
      password: 'Password123!',
      role: 'Maintenance Staff',
      phoneNumber: '+1 (555) 018-7733',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    });

    console.log('[Seed] Created default users for all 4 roles.');

    // 2. Create Predefined Amenities
    const amenities = await Amenity.insertMany([
      {
        name: 'Equinox Elite Fitness Center',
        description: 'State-of-the-art gym with cardio equipment, free weights, and personal training zone.',
        category: 'Gym',
        capacity: 35,
        openingTime: '05:00',
        closingTime: '23:00',
        rules: ['Proper athletic attire required', 'Wipe down equipment after use', 'No glass containers'],
        images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Skyline Infinity Pool & Lounge',
        description: 'Temperature-controlled rooftop pool featuring panoramic skyline views and luxury cabanas.',
        category: 'Swimming Pool',
        capacity: 25,
        openingTime: '07:00',
        closingTime: '21:00',
        rules: ['No diving', 'Children under 14 require adult supervision', 'No glassware poolside'],
        images: ['https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Grand Horizon Clubhouse',
        description: 'Multi-purpose resident club lounge equipped with billiards table, wet bar, and fireplace.',
        category: 'Club House',
        capacity: 50,
        openingTime: '08:00',
        closingTime: '23:00',
        rules: ['Reservations required for private events', 'Keep noise levels respectable after 22:00'],
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Executive Boardroom',
        description: 'Private meeting room equipped with 4K display, high-speed fiber internet, and video conference bar.',
        category: 'Meeting Room',
        capacity: 12,
        openingTime: '08:00',
        closingTime: '20:00',
        rules: ['Maximum 3 hours per booking', 'Leave room clean and orderly'],
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Reserved EV Parking Bays',
        description: 'Level 2 EV fast-charging parking spots with dedicated 24/7 security monitoring.',
        category: 'Parking',
        capacity: 10,
        openingTime: '00:00',
        closingTime: '23:59',
        rules: ['EV vehicles only', 'Maximum 4 hours plug-in duration'],
        images: ['https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Championship Tennis Court',
        description: 'Pro-grade hard court with nighttime stadium floodlights.',
        category: 'Tennis Court',
        capacity: 4,
        openingTime: '07:00',
        closingTime: '21:00',
        rules: ['Non-marking tennis shoes required', 'Maximum 2 hours per session'],
        images: ['https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Celebration Party Pavilion',
        description: 'Spacious indoor/outdoor venue with full catering kitchen and audio system.',
        category: 'Party Hall',
        capacity: 80,
        openingTime: '10:00',
        closingTime: '23:00',
        rules: ['Security deposit required', 'Clean up kitchen after use'],
        images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Zen Botanical Courtyard',
        description: 'Lush landscaped garden with soothing water fountains and quiet reading nooks.',
        category: 'Garden',
        capacity: 30,
        openingTime: '06:00',
        closingTime: '22:00',
        rules: ['Keep on paved walkways', 'Pet leash mandatory'],
        images: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
      {
        name: 'Kids Adventure Park',
        description: 'Safe rubberized play playground featuring swings, slides, and climbing towers.',
        category: 'Children Play Area',
        capacity: 25,
        openingTime: '08:00',
        closingTime: '19:30',
        rules: ['Adult supervision required', 'Ages 2 to 12 only'],
        images: ['https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?auto=format&fit=crop&q=80&w=800'],
        createdById: owner._id,
      },
    ]);

    console.log('[Seed] Created 9 default amenities.');

    // 3. Create Properties
    const properties = await Property.insertMany([
      {
        title: 'The Glass Pavilion Luxury Penthouse',
        description: 'High-floor corner penthouse boasting floor-to-ceiling glass walls, Italian marble counters, smart home automation, and private balcony skyline views.',
        type: 'Apartment',
        price: 4800,
        address: {
          street: '742 Park Avenue, Penthouse B',
          city: 'New York',
          state: 'NY',
          zipCode: '10021',
          country: 'USA',
        },
        bedrooms: 3,
        bathrooms: 3,
        areaSqFt: 2400,
        images: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        ],
        amenities: [amenities[0]._id, amenities[1]._id, amenities[3]._id],
        ownerId: owner._id,
        tenantId: tenant._id,
        status: 'Occupied',
      },
      {
        title: 'Sunset Villa Estate & Coastal Pool',
        description: 'Mediterranean inspired waterfront villa with private infinity pool, outdoor kitchen, lush gardens, and 3-car garage.',
        type: 'Villa',
        price: 8500,
        address: {
          street: '1280 Ocean Drive',
          city: 'Miami',
          state: 'FL',
          zipCode: '33139',
          country: 'USA',
        },
        bedrooms: 5,
        bathrooms: 4,
        areaSqFt: 4500,
        images: [
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
        ],
        amenities: [amenities[1]._id, amenities[6]._id, amenities[7]._id],
        ownerId: owner._id,
        status: 'Available',
      },
      {
        title: 'Modern Silicon Urban Loft',
        description: 'Ultra-modern open floorplan studio featuring exposed concrete pillars, smart lighting, high ceilings, and gourmet chef kitchen.',
        type: 'Studio',
        price: 2950,
        address: {
          street: '450 Mission Street, Unit 402',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA',
        },
        bedrooms: 1,
        bathrooms: 1,
        areaSqFt: 950,
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
        ],
        amenities: [amenities[0]._id, amenities[4]._id],
        ownerId: owner._id,
        status: 'Available',
      },
    ]);

    console.log('[Seed] Created properties.');

    // 4. Create Maintenance Request
    await MaintenanceRequest.create({
      title: 'HVAC Air Conditioning Cooling Malfunction',
      description: 'The central air conditioning system in the master bedroom is blowing warm air.',
      propertyId: properties[0]._id,
      tenantId: tenant._id,
      assignedStaffId: staff._id,
      priority: 'High',
      status: 'In Progress',
      images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'],
      notes: [
        {
          authorId: tenant._id,
          authorName: tenant.name,
          authorRole: tenant.role,
          text: 'Master bedroom temperature is 78 degrees despite AC set to 68.',
        },
        {
          authorId: staff._id,
          authorName: staff.name,
          authorRole: staff.role,
          text: 'Inspected condenser unit. Replacing compressor capacitor tomorrow morning.',
        },
      ],
    });

    console.log('[Seed] Created sample maintenance request.');

    // 5. Create Sample Booking
    await Booking.create({
      amenityId: amenities[0]._id,
      tenantId: tenant._id,
      propertyId: properties[0]._id,
      bookingDate: '2026-07-28',
      startTime: '08:00',
      endTime: '10:00',
      totalGuests: 1,
      status: 'Confirmed',
      notes: 'Morning workout session',
    });

    console.log('[Seed] Created sample booking.');

    // 6. Create Initial Message
    await Message.create({
      senderId: tenant._id,
      receiverId: owner._id,
      propertyId: properties[0]._id,
      content: 'Hi Marcus, just letting you know I filed a maintenance request for the AC unit. David is already looking into it.',
    });

    console.log('[Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seed();
