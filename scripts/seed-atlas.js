const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://KasaSync:jG9jwWrCzj3716gq@kasasync.vrvrba5.mongodb.net/kasasync?retryWrites=true&w=majority";

// Define Schemas directly to guarantee creation
const UserSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String, role: String, phoneNumber: String, avatar: String
}, { timestamps: true });

const PropertySchema = new mongoose.Schema({
  title: String, description: String, type: String, price: Number, address: Object, bedrooms: Number, bathrooms: Number, areaSqFt: Number, images: [String], ownerId: mongoose.Schema.Types.ObjectId, tenantId: mongoose.Schema.Types.ObjectId, status: String
}, { timestamps: true });

const AmenitySchema = new mongoose.Schema({
  name: String, category: String, description: String, capacity: Number, openingTime: String, closingTime: String, images: [String], isActive: Boolean
}, { timestamps: true });

const MaintenanceRequestSchema = new mongoose.Schema({
  title: String, description: String, propertyId: mongoose.Schema.Types.ObjectId, tenantId: mongoose.Schema.Types.ObjectId, assignedStaffId: mongoose.Schema.Types.ObjectId, priority: String, status: String, images: [String], notes: Array
}, { timestamps: true });

const BookingSchema = new mongoose.Schema({
  amenityId: mongoose.Schema.Types.ObjectId, tenantId: mongoose.Schema.Types.ObjectId, bookingDate: String, startTime: String, endTime: String, totalGuests: Number, notes: String, status: String
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId, receiverId: mongoose.Schema.Types.ObjectId, text: String, isRead: Boolean
}, { timestamps: true });

const NotificationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, title: String, message: String, type: String, isRead: Boolean, link: String
}, { timestamps: true });

const ActivityLogSchema = new mongoose.Schema({
  action: String, details: String, userEmail: String, entityType: String
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);
const Amenity = mongoose.models.Amenity || mongoose.model('Amenity', AmenitySchema);
const MaintenanceRequest = mongoose.models.MaintenanceRequest || mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB Connected to kasasync database successfully!");

  console.log("Seeding collections into MongoDB Atlas...");

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Users
  await User.deleteMany({});
  const admin = await User.create({ name: 'Eleanor Vance (Admin)', email: 'admin@kasasync.com', password: hashedPassword, role: 'Admin', phoneNumber: '+91 98765 43210', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' });
  const owner = await User.create({ name: 'Marcus Sterling (Property Owner)', email: 'owner@kasasync.com', password: hashedPassword, role: 'Property Owner', phoneNumber: '+91 98765 43211', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250' });
  const tenant = await User.create({ name: 'Sophia Martinez (Tenant)', email: 'tenant@kasasync.com', password: hashedPassword, role: 'Tenant', phoneNumber: '+91 98765 43212', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250' });
  const staff = await User.create({ name: 'David Miller (Maintenance Technician)', email: 'staff@kasasync.com', password: hashedPassword, role: 'Maintenance Staff', phoneNumber: '+91 98765 43213', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250' });
  console.log("-> Created 'users' collection with 4 default accounts");

  // 2. Properties
  await Property.deleteMany({});
  const prop1 = await Property.create({
    title: 'The Glass Pavilion Luxury Penthouse',
    description: 'High-floor corner penthouse boasting floor-to-ceiling glass walls, Italian marble counters, smart home automation, and private balcony skyline views.',
    type: 'Penthouse', price: 48000,
    address: { street: '742 MG Road, Penthouse B', city: 'Bengaluru', state: 'Karnataka', zipCode: '560001', country: 'India' },
    bedrooms: 3, bathrooms: 3, areaSqFt: 2400,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'],
    ownerId: owner._id, tenantId: tenant._id, status: 'Occupied'
  });
  const prop2 = await Property.create({
    title: 'Sunset Villa Estate & Coastal Pool',
    description: 'Mediterranean inspired waterfront villa with private infinity pool, outdoor kitchen, lush gardens, and 3-car garage.',
    type: 'Villa', price: 85000,
    address: { street: '1280 ECR Coastal Highway', city: 'Chennai', state: 'Tamil Nadu', zipCode: '600041', country: 'India' },
    bedrooms: 5, bathrooms: 4, areaSqFt: 4500,
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800'],
    ownerId: owner._id, status: 'Available'
  });
  console.log("-> Created 'properties' collection");

  // 3. Amenities
  await Amenity.deleteMany({});
  const pool = await Amenity.create({ name: 'Rooftop Infinity Pool', category: 'Swimming Pool', description: 'Heated rooftop pool with lounge chairs.', capacity: 25, openingTime: '06:00', closingTime: '22:00', images: ['https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7'], isActive: true });
  const gym = await Amenity.create({ name: 'Executive Fitness Center', category: 'Gym', description: 'State-of-the-art cardio and weight training facility.', capacity: 30, openingTime: '05:00', closingTime: '23:00', images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb'], isActive: true });
  console.log("-> Created 'amenities' collection");

  // 4. Maintenance Requests
  await MaintenanceRequest.deleteMany({});
  await MaintenanceRequest.create({
    title: 'Leaking kitchen sink pipe', description: 'Water leaking steadily beneath main sink basin.',
    propertyId: prop1._id, tenantId: tenant._id, assignedStaffId: staff._id, priority: 'High', status: 'In Progress',
    images: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7'],
    notes: [{ authorName: 'Sophia Martinez', authorRole: 'Tenant', text: 'Noticed leak under sink this morning.' }]
  });
  console.log("-> Created 'maintenancerequests' collection");

  // 5. Bookings
  await Booking.deleteMany({});
  await Booking.create({ amenityId: pool._id, tenantId: tenant._id, bookingDate: '2026-07-30', startTime: '10:00', endTime: '12:00', totalGuests: 2, notes: 'Poolside celebration', status: 'Confirmed' });
  console.log("-> Created 'bookings' collection");

  // 6. Messages
  await Message.deleteMany({});
  await Message.create({ senderId: tenant._id, receiverId: owner._id, text: 'Hi Marcus, checking in about the maintenance request for the kitchen sink leak.', isRead: false });
  console.log("-> Created 'messages' collection");

  // 7. Notifications
  await Notification.deleteMany({});
  await Notification.create({ userId: tenant._id, title: 'Maintenance Update', message: 'Technician David Miller has updated status to In Progress.', type: 'MAINTENANCE', isRead: false });
  console.log("-> Created 'notifications' collection");

  // 8. Activity Logs / Analytics
  await ActivityLog.deleteMany({});
  await ActivityLog.create({ action: 'INITIAL_SEED', details: 'MongoDB Atlas initial collections created.', userEmail: 'system@kasasync.com', entityType: 'SYSTEM' });
  console.log("-> Created 'activitylogs' collection");

  console.log("\n🎉 ALL 8 COLLECTIONS SEEDED SUCCESSFULLY INTO MONGODB ATLAS ('kasasync')!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
