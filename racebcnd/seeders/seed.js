const Event = require('../models/Event');

const events = [
  { eventId: 1,  title: 'Summer Sprint Series',    date: 'Mar 15, 2024', location: 'Laguna Seca',   tag: 'CIRCUIT',    featured: true,  image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80' },
  { eventId: 2,  title: 'Night Drift Championship', date: 'Apr 02, 2024', location: 'Suzuka Circuit', tag: 'DRIFT',      featured: true,  image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80' },
  { eventId: 3,  title: 'Endurance Cup 500',        date: 'Apr 20, 2024', location: 'Silverstone',    tag: 'ENDURANCE',  featured: true,  image: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600&q=80' },
  { eventId: 4,  title: 'Street Rally Pro',         date: 'May 05, 2024', location: 'Monaco',         tag: 'RALLY',      featured: false, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80' },
  { eventId: 5,  title: 'GT Masters Open',          date: 'May 18, 2024', location: 'Nurburgring',    tag: 'GT',         featured: false, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80' },
  { eventId: 6,  title: 'Thunder Lap Challenge',    date: 'Jun 01, 2024', location: 'Brands Hatch',   tag: 'CIRCUIT',    featured: false, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80' },
  { eventId: 7,  title: 'Desert Storm Rally',       date: 'Jun 15, 2024', location: 'Dakar Route',    tag: 'RALLY',      featured: false, image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&q=80' },
  { eventId: 8,  title: 'Supercar Showdown',        date: 'Jul 04, 2024', location: 'Monza',          tag: 'CIRCUIT',    featured: false, image: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&q=80' },
  { eventId: 9,  title: 'Midnight Drag Wars',       date: 'Jul 20, 2024', location: 'Santa Pod',      tag: 'DRAG',       featured: false, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80' },
  { eventId: 10, title: 'Classic Le Mans Revival',  date: 'Aug 08, 2024', location: 'Le Mans',        tag: 'ENDURANCE',  featured: false, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80' },
  { eventId: 11, title: 'Turbo Kart Grand Prix',    date: 'Aug 25, 2024', location: 'Spa',            tag: 'KART',       featured: false, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80' },
  { eventId: 12, title: 'Season Finale Blitz',      date: 'Sep 10, 2024', location: 'Imola',          tag: 'CIRCUIT',    featured: false, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80' },
];

async function seedEvents() {
  try {
    const count = await Event.countDocuments();
    if (count > 0) {
      console.log(`Events already seeded (${count} found), skipping`);
      return;
    }
    await Event.insertMany(events);
    console.log('Seeded 12 events successfully');
  } catch (err) {
    console.error('Seed error:', err);
  }
}

module.exports = seedEvents;
