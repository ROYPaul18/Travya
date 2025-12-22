// prisma/seed.ts
import { PrismaClient, Categorie, Visibility } from '@/app/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

faker.seed(123);

const CITIES = [
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
  { name: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Bali', country: 'Indonesia', lat: -8.3405, lng: 115.0920 },
];

const ACTIVITY_TEMPLATES = {
  RESTAURANT: ['Le Petit Bistro', 'Sushi Master', 'La Trattoria', 'The Steakhouse'],
  CAFE: ['Coffee & Co', 'Le Café Central', 'Brew House', 'Tea Time'],
  VISITE: ['Musée National', 'Tour Historique', 'Palais Royal', 'Cathédrale'],
  HOTEL: ['Grand Hotel', 'Boutique Inn', 'Resort & Spa', 'City Center Hotel'],
  TRANSPORT: ['Location de voiture', 'Train station', 'Aéroport', 'Metro pass'],
  SHOPPING: ['Centre Commercial', 'Marché Local', 'Boutique Mode', 'Souvenir Shop'],
  NATURE: ['Parc National', 'Plage', 'Montagne', 'Jardin Botanique'],
  SPORT: ['Club de Tennis', 'Piscine', 'Randonnée', 'Surf School'],
  AUTRE: ['Cinéma', 'Théâtre', 'Concert Hall', 'Galerie d\'Art'],
};

// Fonction pour générer des coordonnées proches d'un point
function getNearbyCoords(lat: number, lng: number, maxDistance: number = 0.05) {
  return {
    lat: lat + (Math.random() - 0.5) * maxDistance,
    lng: lng + (Math.random() - 0.5) * maxDistance,
  };
}

// Création des utilisateurs
async function seedUsers(count: number = 10) {
  console.log(`👤 Creating ${count} users...`);
  
  const users = [];
  
  // Utilisateur de test connu
  users.push({
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: true,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  });
  
  // Utilisateurs aléatoires
  for (let i = 0; i < count - 1; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    users.push({
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      name: `${firstName} ${lastName}`,
      emailVerified: faker.datatype.boolean(),
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`,
    });
  }
  
  await prisma.user.createMany({ data: users });
  
  const createdUsers = await prisma.user.findMany();
  console.log(`✅ Created ${createdUsers.length} users`);
  
  return createdUsers;
}

// Création des voyages
async function seedTrips(users: any[]) {
  console.log('✈️  Creating trips...');
  
  const trips = [];
  
  for (const user of users) {
    const tripCount = faker.number.int({ min: 2, max: 5 });
    
    for (let i = 0; i < tripCount; i++) {
      const city = faker.helpers.arrayElement(CITIES);
      const startDate = faker.date.between({
        from: new Date(2024, 0, 1),
        to: new Date(2025, 11, 31),
      });
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + faker.number.int({ min: 3, max: 14 }));
      
      const trip = await prisma.trip.create({
        data: {
          title: `${city.name} ${faker.helpers.arrayElement(['Adventure', 'Getaway', 'Discovery', 'Journey', 'Experience'])}`,
          description: faker.lorem.paragraphs(2),
          startDate,
          endDate,
          userId: user.id,
          visibility: faker.helpers.arrayElement([
            Visibility.PRIVATE,
            Visibility.COMMUNITY,
            Visibility.FRIENDS,
          ]),
          wallpaper: `https://picsum.photos/seed/${faker.string.uuid()}/1200/800`,
          images: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
            `https://picsum.photos/seed/${faker.string.uuid()}/800/600`
          ),
        },
      });
      
      trips.push(trip);
    }
  }
  
  console.log(`✅ Created ${trips.length} trips`);
  return trips;
}

// Création des locations
async function seedLocations(trips: any[]) {
  console.log('📍 Creating locations...');
  
  const locations = [];
  
  for (const trip of trips) {
    const locationCount = faker.number.int({ min: 2, max: 6 });
    
    for (let i = 0; i < locationCount; i++) {
      const city = faker.helpers.arrayElement(CITIES);
      
      const location = await prisma.location.create({
        data: {
          locationTitle: `${city.name} - ${faker.helpers.arrayElement(['Centre-ville', 'Quartier historique', 'Bord de mer', 'Montagne'])}`,
          lat: city.lat,
          lng: city.lng,
          tripId: trip.id,
          order: i,
        },
      });
      
      locations.push(location);
    }
  }
  
  console.log(`✅ Created ${locations.length} locations`);
  return locations;
}

// Création des activités
async function seedActivities(locations: any[]) {
  console.log('🎯 Creating activities...');
  
  const activities = [];
  
  for (const location of locations) {
    const activityCount = faker.number.int({ min: 3, max: 8 });
    
    for (let i = 0; i < activityCount; i++) {
      const category = faker.helpers.enumValue(Categorie);
      const templates = ACTIVITY_TEMPLATES[category];
      const coords = getNearbyCoords(location.lat, location.lng);
      
      const hasTimeSlot = faker.datatype.boolean();
      const startHour = faker.number.int({ min: 8, max: 18 });
      const endHour = startHour + faker.number.int({ min: 1, max: 3 });
      
      const activity = await prisma.activity.create({
        data: {
          name: faker.helpers.arrayElement(templates),
          address: faker.location.streetAddress(true),
          lat: coords.lat,
          lng: coords.lng,
          category,
          description: faker.lorem.paragraph(),
          wallpaper: `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          images: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
            `https://picsum.photos/seed/${faker.string.uuid()}/600/400`
          ),
          startTime: hasTimeSlot ? `${startHour.toString().padStart(2, '0')}:00` : null,
          endTime: hasTimeSlot ? `${endHour.toString().padStart(2, '0')}:00` : null,
          budget: category === Categorie.RESTAURANT || category === Categorie.HOTEL
            ? faker.number.float({ min: 20, max: 200, multipleOf: 0.01 })
            : category === Categorie.TRANSPORT
            ? faker.number.float({ min: 10, max: 100, multipleOf: 0.01 })
            : null,
          locationId: location.id,
          order: i,
        },
      });
      
      activities.push(activity);
    }
  }
  
  console.log(`✅ Created ${activities.length} activities`);
  return activities;
}

// Création des favoris
async function seedFavorites(users: any[], trips: any[]) {
  console.log('❤️  Creating favorites...');
  
  const favorites = [];
  
  for (const user of users) {
    // Chaque utilisateur aime 2-5 voyages aléatoires (pas les siens)
    const otherTrips = trips.filter(trip => trip.userId !== user.id);
    const favoriteCount = Math.min(
      faker.number.int({ min: 2, max: 5 }),
      otherTrips.length
    );
    
    const selectedTrips = faker.helpers.arrayElements(otherTrips, favoriteCount);
    
    for (const trip of selectedTrips) {
      const favorite = await prisma.favorite.create({
        data: {
          userId: user.id,
          tripId: trip.id,
        },
      });
      
      favorites.push(favorite);
    }
  }
  
  console.log(`✅ Created ${favorites.length} favorites`);
  return favorites;
}

// Affichage des statistiques
async function displayStats() {
  console.log('\n📊 Database Statistics:');
  console.log('─────────────────────────────');
  
  const userCount = await prisma.user.count();
  const tripCount = await prisma.trip.count();
  const locationCount = await prisma.location.count();
  const activityCount = await prisma.activity.count();
  const favoriteCount = await prisma.favorite.count();
  
  const publicTrips = await prisma.trip.count({ where: { visibility: Visibility.COMMUNITY } });
  const privateTrips = await prisma.trip.count({ where: { visibility: Visibility.PRIVATE } });
  
  console.log(`👥 Users:              ${userCount}`);
  console.log(`✈️  Trips:              ${tripCount}`);
  console.log(`   └─ Public:          ${publicTrips}`);
  console.log(`   └─ Private:         ${privateTrips}`);
  console.log(`📍 Locations:          ${locationCount}`);
  console.log(`🎯 Activities:         ${activityCount}`);
  console.log(`❤️  Favorites:          ${favoriteCount}`);
  console.log('─────────────────────────────');
  
  // Afficher l'utilisateur de test
  const testUser = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
    include: { trips: true },
  });
  
  if (testUser) {
    console.log('\n🔑 Test Account:');
    console.log(`   Email: ${testUser.email}`);
    console.log(`   Name:  ${testUser.name}`);
    console.log(`   Trips: ${testUser.trips.length}`);
  }
}

// Script principal
async function main() {
  console.log('🌱 Starting database seeding...\n');
  
  try {
    // Protection contre la production
    if (process.env.NODE_ENV === 'production') {
      throw new Error('❌ Cannot seed production database!');
    }    
    const users = await seedUsers(10);
    const trips = await seedTrips(users);
    const locations = await seedLocations(trips);
    const activities = await seedActivities(locations);
    await seedFavorites(users, trips);
    
    await displayStats();
    
    console.log('\n🎉 Seeding completed successfully!\n');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();