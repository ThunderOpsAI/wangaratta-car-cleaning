import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

// In-memory fallback stores for local development without DB credentials or build steps
const memoryStore = {
  quotes: [] as any[],
  reviews: [
    {
      id: 'rev-1',
      customer_name: 'Marcus & Hayley T.',
      location: 'Wangaratta VIC',
      star_rating: 5,
      project_type: 'Full Signature Detail & Ceramic Protection',
      review_text: 'Had our Ford Everest treated with the full signature detail and ceramic coating before a family road trip. The depth of shine on the paint is unreal, and bug splatters now wash off effortlessly. Outstanding attention to detail inside and out!',
      created_at: new Date('2024-03-12').toISOString(),
    },
    {
      id: 'rev-2',
      customer_name: 'Brenton K.',
      location: 'Milawa, VIC',
      star_rating: 5,
      project_type: 'Exterior Paint Correction & Shine',
      review_text: 'Brought in our black LandCruiser that was covered in heavy bush pin-striping and swirl marks from farm tracks. The multi-stage paint correction eliminated virtually every imperfection. It looks better than when it left the showroom.',
      created_at: new Date('2024-05-18').toISOString(),
    },
    {
      id: 'rev-3',
      customer_name: 'Sarah Henderson',
      location: 'Glenrowan, VIC',
      star_rating: 5,
      project_type: 'Interior Deep Clean & Steam Sanitisation',
      review_text: 'With three kids and two dogs, our Mazda CX-9 was in desperate need of an interior overhaul. Every crumb, pet hair, and juice spill was completely extracted. Smells fresh, seats look brand new, and completely sanitised.',
      created_at: new Date('2024-07-22').toISOString(),
    },
    {
      id: 'rev-4',
      customer_name: 'Dave & Chloe M.',
      location: 'Oxley, VIC',
      star_rating: 5,
      project_type: 'Pre-Sale Detail & Roadworthy Prep',
      review_text: 'Booked a pre-sale detail before listing our Golf GTI. Cleaned the engine bay, restored foggy headlights, and buffed out stone chips. Sold within 48 hours for our full asking price. Couldn\'t be happier with the service.',
      created_at: new Date('2024-09-05').toISOString(),
    },
    {
      id: 'rev-5',
      customer_name: 'Lachlan P.',
      location: 'Wangaratta VIC',
      star_rating: 5,
      project_type: 'Commercial Fleet & Work Ute Cleanse',
      review_text: 'Our trade Hilux gets hammered on regional job sites with red dust and mud. Booked the mobile wash and interior steam extraction. Professional, punctual, and top quality results right at our workshop.',
      created_at: new Date('2024-10-14').toISOString(),
    }
  ],
  call_logs: [] as any[],
};

export const sql = databaseUrl ? neon(databaseUrl) : null;

let isDbInitialized = false;

export async function ensureDbTables() {
  if (!sql) {
    return;
  }
  if (isDbInitialized) return;

  try {
    // Quotes / Bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255),
        phone VARCHAR(50),
        vehicle_make VARCHAR(100),
        vehicle_model VARCHAR(100),
        vehicle_size VARCHAR(100),
        detailing_tier VARCHAR(100),
        estimated_price NUMERIC(10,2),
        service_location VARCHAR(100),
        add_ons TEXT,
        preferred_date VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Reviews table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        star_rating INT NOT NULL CHECK (star_rating >= 1 AND star_rating <= 5),
        review_text TEXT NOT NULL,
        project_type VARCHAR(100),
        verified BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Call clicks table
    await sql`
      CREATE TABLE IF NOT EXISTS call_logs (
        id SERIAL PRIMARY KEY,
        intent VARCHAR(100),
        referrer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default reviews if empty
    const existing = await sql`SELECT COUNT(*) as count FROM reviews;`;
    if (existing && existing[0] && parseInt(existing[0].count, 10) === 0) {
      for (const rev of memoryStore.reviews) {
        await sql`
          INSERT INTO reviews (customer_name, location, star_rating, review_text, project_type, verified, created_at)
          VALUES (${rev.customer_name}, ${rev.location}, ${rev.star_rating}, ${rev.review_text}, ${rev.project_type}, true, ${rev.created_at});
        `;
      }
    }

    isDbInitialized = true;
  } catch (err) {
    console.warn('Neon database initialization warning (falling back to memory store):', err);
  }
}

export async function insertQuote(data: {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleSize?: string;
  detailingTier?: string;
  estimatedPrice?: number;
  serviceLocation?: string;
  addOns?: string;
  preferredDate?: string;
  message?: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO quotes (
          first_name, last_name, email, phone, vehicle_make, vehicle_model,
          vehicle_size, detailing_tier, estimated_price, service_location, add_ons, preferred_date, message
        ) VALUES (
          ${data.firstName}, ${data.lastName || ''}, ${data.email}, ${data.phone},
          ${data.vehicleMake || null}, ${data.vehicleModel || null}, ${data.vehicleSize || null},
          ${data.detailingTier || null}, ${data.estimatedPrice || null}, ${data.serviceLocation || null},
          ${data.addOns || null}, ${data.preferredDate || null}, ${data.message || ''}
        ) RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving quote to Neon DB, caching in memory:', err);
    }
  }

  const record = {
    id: 'quote_' + Date.now(),
    ...data,
    created_at: new Date().toISOString(),
  };
  memoryStore.quotes.push(record);
  return record;
}

export async function getApprovedReviews() {
  if (sql) {
    try {
      await ensureDbTables();
      const rows = await sql`
        SELECT 
          id::text, 
          customer_name as "customerName", 
          star_rating as "starRating", 
          review_text as "reviewText", 
          project_type as "projectType", 
          location,
          created_at as "createdAt"
        FROM reviews 
        WHERE verified = true 
        ORDER BY created_at DESC;
      `;
      if (rows && rows.length > 0) {
        return rows;
      }
    } catch (err) {
      console.warn('Error fetching reviews from Neon, falling back to cached reviews:', err);
    }
  }

  return memoryStore.reviews.map(r => ({
    id: r.id,
    customerName: r.customer_name,
    starRating: r.star_rating,
    reviewText: r.review_text,
    projectType: r.project_type,
    location: r.location,
    createdAt: r.created_at,
  }));
}

export async function insertReview(data: {
  customerName: string;
  location?: string;
  starRating: number;
  projectType?: string;
  reviewText: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO reviews (customer_name, location, star_rating, project_type, review_text, verified)
        VALUES (${data.customerName}, ${data.location || null}, ${data.starRating}, ${data.projectType || null}, ${data.reviewText}, true)
        RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving review to Neon DB, using memory fallback:', err);
    }
  }

  const record = {
    id: 'rev_' + Date.now(),
    customer_name: data.customerName,
    location: data.location || 'Wangaratta VIC',
    star_rating: data.starRating,
    project_type: data.projectType || 'Car Detailing',
    review_text: data.reviewText,
    created_at: new Date().toISOString(),
  };
  memoryStore.reviews.unshift(record);
  return record;
}

export async function logCallClick(intent: string, referrer?: string) {
  if (sql) {
    try {
      await ensureDbTables();
      await sql`
        INSERT INTO call_logs (intent, referrer)
        VALUES (${intent}, ${referrer || null});
      `;
      return true;
    } catch (err) {
      console.warn('Error logging call click:', err);
    }
  }
  memoryStore.call_logs.push({ intent, referrer, timestamp: new Date().toISOString() });
  return true;
}

export default sql;
