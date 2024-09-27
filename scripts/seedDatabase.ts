import mongoose from 'mongoose';
import User from '../src/models/User';
import Team from '../src/models/Teams';
import Player from '../src/models/Player';
import Match from '../src/models/Match';

const MONGODB_URI = 'mongodb+srv://Esosa-web:Esosa2005@student-cluster.eaapj.mongodb.net/ElevenSim?retryWrites=true&w=majority&appName=student-cluster';

const inazumaElevenData = [
  {
    teamName: "Raimon",
    overallRating: 92,
    stats: { attack: 93, defense: 90, teamwork: 98 },
    players: [
      { name: "Mark Evans", position: "Goalkeeper", stats: { speed: 85, technique: 95, power: 98 } },
      { name: "Axel Blaze", position: "Forward", stats: { speed: 95, technique: 98, power: 97 } },
      { name: "Jude Sharp", position: "Midfielder", stats: { speed: 92, technique: 98, power: 90 } },
      { name: "Shawn Frost", position: "Forward/Defender", stats: { speed: 97, technique: 96, power: 95 } },
      { name: "Nathan Swift", position: "Defender", stats: { speed: 98, technique: 88, power: 85 } },
      { name: "Jack Wallside", position: "Defender", stats: { speed: 75, technique: 85, power: 95 } },
      { name: "Kevin Dragonfly", position: "Forward", stats: { speed: 90, technique: 88, power: 92 } },
      { name: "Scotty Banyan", position: "Midfielder", stats: { speed: 92, technique: 90, power: 85 } },
      { name: "Thor Stoutberg", position: "Defender", stats: { speed: 85, technique: 88, power: 93 } },
      { name: "Darren LaChance", position: "Goalkeeper/Midfielder", stats: { speed: 88, technique: 92, power: 90 } },
      { name: "Erik Eagle", position: "Midfielder", stats: { speed: 90, technique: 93, power: 88 } }
    ]
  },
  {
    teamName: "Royal Academy",
    overallRating: 88,
    stats: { attack: 85, defense: 85, teamwork: 80 },
    players: [
      { name: "David Samford", position: "Midfielder", stats: { speed: 85, technique: 90, power: 85 } },
      { name: "Joseph King", position: "Goalkeeper", stats: { speed: 75, technique: 85, power: 90 } },
      { name: "Alan Master", position: "Forward", stats: { speed: 90, technique: 85, power: 85 } },
      { name: "Herman Waldon", position: "Defender", stats: { speed: 80, technique: 85, power: 90 } },
      { name: "Gus Martin", position: "Midfielder", stats: { speed: 85, technique: 85, power: 80 } },
      { name: "Dan Simmonds", position: "Forward", stats: { speed: 85, technique: 80, power: 85 } },
      { name: "Ben Simmons", position: "Defender", stats: { speed: 80, technique: 80, power: 85 } },
      { name: "Derek Swing", position: "Midfielder", stats: { speed: 80, technique: 85, power: 80 } },
      { name: "Bob Shearer", position: "Defender", stats: { speed: 75, technique: 80, power: 85 } },
      { name: "Paul Siddon", position: "Midfielder", stats: { speed: 80, technique: 80, power: 80 } },
      { name: "John Bloom", position: "Forward", stats: { speed: 85, technique: 80, power: 80 } }
    ]
  },
  {
    teamName: "Zeus Junior High",
    overallRating: 92,
    stats: { attack: 95, defense: 90, teamwork: 85 },
    players: [
      { name: "Byron Love", position: "Forward", stats: { speed: 95, technique: 98, power: 95 } },
      { name: "Henry House", position: "Midfielder", stats: { speed: 90, technique: 90, power: 90 } },
      { name: "Paul Peabody", position: "Defender", stats: { speed: 85, technique: 90, power: 95 } },
      { name: "Daniel Hatch", position: "Midfielder", stats: { speed: 90, technique: 90, power: 90 } },
      { name: "Arion Sherwind", position: "Forward", stats: { speed: 95, technique: 90, power: 90 } },
      { name: "Hector Helio", position: "Defender", stats: { speed: 85, technique: 90, power: 95 } },
      { name: "Artie Mishman", position: "Midfielder", stats: { speed: 90, technique: 90, power: 90 } },
      { name: "Demetrius Deka", position: "Goalkeeper", stats: { speed: 85, technique: 95, power: 95 } },
      { name: "Artemis Rune", position: "Defender", stats: { speed: 85, technique: 90, power: 95 } },
      { name: "Apollo Light", position: "Midfielder", stats: { speed: 90, technique: 90, power: 90 } },
      { name: "Ares Rout", position: "Forward", stats: { speed: 95, technique: 90, power: 90 } }
    ]
  },
  {
    teamName: "Genesis",
    overallRating: 95,
    stats: { attack: 98, defense: 92, teamwork: 95 },
    players: [
      { name: "Xavier Foster", position: "Forward", stats: { speed: 98, technique: 98, power: 98 } },
      { name: "Jordan Greenway", position: "Midfielder", stats: { speed: 95, technique: 97, power: 93 } },
      { name: "Bellatrix", position: "Forward", stats: { speed: 96, technique: 95, power: 94 } },
      { name: "Wheeze", position: "Defender", stats: { speed: 92, technique: 94, power: 96 } },
      { name: "Pandora", position: "Midfielder", stats: { speed: 94, technique: 95, power: 93 } },
      { name: "Gordo", position: "Defender", stats: { speed: 90, technique: 93, power: 97 } },
      { name: "Metron", position: "Midfielder", stats: { speed: 95, technique: 94, power: 93 } },
      { name: "Bomber", position: "Forward", stats: { speed: 95, technique: 93, power: 95 } },
      { name: "Io", position: "Defender", stats: { speed: 93, technique: 92, power: 95 } },
      { name: "Keeve", position: "Defender", stats: { speed: 92, technique: 93, power: 94 } },
      { name: "Nero", position: "Goalkeeper", stats: { speed: 90, technique: 96, power: 97 } }
    ]
  },
  {
    teamName: "Chaos",
    overallRating: 93,
    stats: { attack: 96, defense: 90, teamwork: 88 },
    players: [
      { name: "Claude Beacons", position: "Forward", stats: { speed: 95, technique: 96, power: 97 } },
      { name: "Bryce Withingale", position: "Forward", stats: { speed: 96, technique: 97, power: 95 } },
      { name: "Torch", position: "Midfielder", stats: { speed: 94, technique: 93, power: 95 } },
      { name: "Gazelle", position: "Midfielder", stats: { speed: 95, technique: 94, power: 93 } },
      { name: "Heat", position: "Defender", stats: { speed: 92, technique: 91, power: 94 } },
      { name: "Bonitona", position: "Defender", stats: { speed: 93, technique: 92, power: 93 } },
      { name: "Nepper", position: "Midfielder", stats: { speed: 93, technique: 92, power: 94 } },
      { name: "Droll", position: "Defender", stats: { speed: 91, technique: 93, power: 95 } },
      { name: "Bomber", position: "Forward", stats: { speed: 94, technique: 93, power: 95 } },
      { name: "Gokka", position: "Defender", stats: { speed: 92, technique: 91, power: 94 } },
      { name: "Dave Quagmire", position: "Goalkeeper", stats: { speed: 90, technique: 95, power: 96 } }
    ]
  },
  {
    teamName: "Gemini Storm",
    overallRating: 82,
    stats: { attack: 85, defense: 80, teamwork: 85 },
    players: [
      { name: "Janus", position: "Forward", stats: { speed: 90, technique: 88, power: 87 } },
      { name: "Diam", position: "Midfielder", stats: { speed: 88, technique: 89, power: 86 } },
      { name: "Pandora", position: "Midfielder", stats: { speed: 87, technique: 88, power: 86 } },
      { name: "Gordo", position: "Defender", stats: { speed: 85, technique: 86, power: 89 } },
      { name: "Io", position: "Defender", stats: { speed: 86, technique: 85, power: 88 } },
      { name: "Ganimede", position: "Forward", stats: { speed: 88, technique: 87, power: 86 } },
      { name: "Metron", position: "Midfielder", stats: { speed: 87, technique: 88, power: 85 } },
      { name: "Karon", position: "Defender", stats: { speed: 85, technique: 86, power: 87 } },
      { name: "Grisley", position: "Defender", stats: { speed: 84, technique: 85, power: 88 } },
      { name: "Gigu", position: "Midfielder", stats: { speed: 86, technique: 87, power: 85 } },
      { name: "Gash", position: "Goalkeeper", stats: { speed: 83, technique: 87, power: 88 } }
    ]
  },
  {
    teamName: "Epsilon",
    overallRating: 88,
    stats: { attack: 90, defense: 87, teamwork: 89 },
    players: [
      { name: "Dvalin", position: "Forward", stats: { speed: 95, technique: 96, power: 97 } },
      { name: "Zel", position: "Midfielder", stats: { speed: 90, technique: 91, power: 89 } },
      { name: "Metron", position: "Midfielder", stats: { speed: 89, technique: 90, power: 88 } },
      { name: "Crypto", position: "Defender", stats: { speed: 88, technique: 89, power: 91 } },
      { name: "Hammer", position: "Defender", stats: { speed: 87, technique: 88, power: 92 } },
      { name: "Mecho", position: "Forward", stats: { speed: 91, technique: 90, power: 89 } },
      { name: "Borg", position: "Midfielder", stats: { speed: 89, technique: 90, power: 88 } },
      { name: "Fadora", position: "Defender", stats: { speed: 88, technique: 89, power: 90 } },
      { name: "Drone", position: "Defender", stats: { speed: 87, technique: 88, power: 91 } },
      { name: "Giga", position: "Midfielder", stats: { speed: 89, technique: 90, power: 88 } },
      { name: "Ika", position: "Goalkeeper", stats: { speed: 86, technique: 91, power: 92 } }
    ]
  }
];

async function seedUsers() {
  const users = [
    { username: 'mark_evans', email: 'mark@raimon.com', password: 'goalkeeper123' },
    { username: 'axel_blaze', email: 'axel@raimon.com', password: 'striker456' },
    { username: 'jude_sharp', email: 'jude@raimon.com', password: 'midfielder789' },
    { username: 'nathan_swift', email: 'nathan@raimon.com', password: 'defender101' },
    { username: 'byron_love', email: 'byron@raimon.com', password: 'forward102' },
  ];

  for (let user of users) {
    await User.create(user);
  }
  console.log('Users seeded');
}

async function seedTeamsAndPlayers() {
  const users = await User.find();

  for (const teamData of inazumaElevenData) {
    const team = new Team({
      name: teamData.teamName,
      formation: '4-4-2', // Default formation
      overallRating: teamData.overallRating,
      stats: teamData.stats,
      user: users[Math.floor(Math.random() * users.length)]._id // Assign a random user
    });

    await team.save();

    for (const playerData of teamData.players) {
      const player = new Player({
        name: playerData.name,
        position: playerData.position,
        number: Math.floor(Math.random() * 99) + 1, // Random number between 1 and 99
        stats: playerData.stats,
        team: team._id
      });

      await player.save();
      team.players.push(player._id);
    }

    await team.save();
  }
  console.log('Teams and Players seeded');
}

async function seedMatches() {
  const teams = await Team.find();
  const players = await Player.find();

  const matches = [
    {
      date: new Date(),
      teams: [
        { team: teams[0]._id, score: 3 },
        { team: teams[1]._id, score: 2 }
      ],
      players: players.slice(0, 22).map(p => p._id), // First 22 players
      result: `${teams[0].name} wins`
    }
  ];

  for (let match of matches) {
    await Match.create(match);
  }
  console.log('Matches seeded');
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    await User.deleteMany({});
    await Team.deleteMany({});
    await Player.deleteMany({});
    await Match.deleteMany({});
    await seedUsers();
    await seedTeamsAndPlayers();
    await seedMatches();
    console.log('Database seeded successfully');
} catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();