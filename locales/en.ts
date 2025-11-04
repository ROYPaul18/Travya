export default {
  navbar: {
    brand: "Travya",
    links: {
      myTrips: "My Trips",
      globe: "Globe",
      myGroups: "My Groups",
    },
    auth: {
      signIn: "Sign In",
      logOut: "Log Out",
    },
  },
  footer: {
    brand: "Travya",
    cc: "© 2025 Travya. Start your journey today.",
  },
  home: {
    hero: {
      tagline: "Plan your next adventure",
      title: "Your journey starts here",
      description: "Plan, organize, and visualize your trips in one place. From dream destinations to detailed itineraries.",
      cta: {
        getStarted: "Get Started",
        exploreGlobe: "Explore the Globe",
      },
      features: {
        title: "Everything you need to plan your trip",
        items: {
          itineraries: {
            title: "Smart Itineraries",
            description: "Create detailed itineraries with multiple stops. Organize your visits and visualize your route.",
          },
          globe: {
            title: "Interactive Globe",
            description: "Visualize all your destinations on a beautiful 3D globe. Track your adventures at a glance.",
          },
          management: {
            title: "Trip Management",
            description: "Manage all your trips from a single dashboard. Track your dates, locations, and memories.",
          },
        },
      },
    },
    steps: {
      title: "Start planning in 3 simple steps",
      items: {
        step1: {
          title: "Create your trip",
          description: "Define your destination, dates, and trip details. Add a description to keep a special memory.",
        },
        step2: {
          title: "Add locations",
          description: "Pin all the places you want to visit. Build your perfect itinerary with multiple stops.",
        },
        step3: {
          title: "Visualize and explore",
          description: "Discover your trip on interactive maps and track your adventures on the 3D globe. Share your experience!",
        },
      },
    },
    cta: {
      title: "Ready to start your adventure?",
      description: "Join travelers worldwide who trust Travel Planner to organize their dream vacations.",
      button: "Create your first trip",
    },
  },
  globe: {
    loadGlobe: "Loading globe...",
    loadAdventure: "Loading your adventures...",
    yourTravelOdyssey: "Your Travel Odyssey",
    discoverWorld: "Discover the world through your adventures, one destination at a time",
    yourFootprint: "Your Footprint on Earth",
    countries: "Countries",
    locations: "Locations",
    countriesVisited: "Countries Visited",
    spot: "spot",
    spots: "spots",
    keepExploring: "Keep exploring! The world is waiting for you.",
  },
  newLocations: {
    title: "Add a new location",
    subtitle: "Pin your next destination on the map",
    form: {
      addressLabel: "Address",
      addressPlaceholder: "Enter the location address...",
      submitButton: "Add Location",
      submittingButton: "Adding...",
    },
    helper: "💡 Enter a complete address for precise positioning",
  },
  newTrip: {
    title: "Create a new trip",
    subtitle: "Plan your next adventure",
    cardTitle: "Trip Details",
    form: {
      titleLabel: "Title",
      titlePlaceholder: "Trip to Japan...",
      descriptionLabel: "Description",
      descriptionPlaceholder: "Trip description...",
      startDateLabel: "Start Date",
      endDateLabel: "End Date",
      imageLabel: "Trip Image",
      imageAlt: "Trip photo",
      submitButton: "Save Trip",
      submittingButton: "Creating...",
    },
    helper: "💡 Add an image to make your trip more memorable",
  },
  trip: {
    pleaseSignIn: "Please sign in to view your trips.",
    welcomeBack: "Welcome back, {name}!",
    startPlanning: "Start planning your first trip and begin your adventure! ✈️",
    tripsCount: "You have {count} {trips, plural, =0 {trip} =1 {trip} other {trips}} planned.",
    upcomingAdventures: "🎉 {count} upcoming {adventures, plural, =1 {adventure} other {adventures}}!",
    dashboard: "Dashboard",
    manageAdventures: "Manage and explore your travel adventures",
    newTrip: "New Trip",
    yourRecentTrips: "Your Recent Trips",
    noTripsYet: "No trips yet",
    startPlanningAdventure: "Start planning your adventure by creating your first trip. The world is waiting for you! 🌍",
    createFirstTrip: "Create Your First Trip",
    edit: "Edit",
    upcoming: "Upcoming",
  },
  intinerary: {
    latitude: "Latitude",
    longitude: "Longitude",
    day: "Day {order}",
    dragToReorder: "Drag to reorder itinerary",
  },
} as const;