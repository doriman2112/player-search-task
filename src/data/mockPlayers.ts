import { Player } from '../types/player';

const BASE_PLAYERS: Player[] = [
  { playerId: "3846852", name: "John Smith", email: "john.smith@example.com", balance: 500.00, bonusBalance: 50.00, language: "EN(US)", online: false, page: "casino", platform: "web" },
  { playerId: "3846845", name: "Maria Garcia", email: "maria.garcia@example.com", balance: 45.30, bonusBalance: 0.00, language: "ES(MX)", online: true, onlineTime: "01:30:20", page: "sports", platform: "mobile" },
  { playerId: "3846838", name: "Peter Jones", email: "peter.jones@example.com", balance: 0.00, bonusBalance: 100.00, language: "EN(GB)", online: false, page: "poker", platform: "desktop" },
  { playerId: "3846831", name: "Lisa Mueller", email: "lisa.mueller@example.com", balance: 330.50, bonusBalance: 15.00, language: "DE(DE)", online: true, onlineTime: "03:45:11", page: "live-casino", platform: "web" },
  { playerId: "3846824", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", balance: 125.00, bonusBalance: 0.00, language: "JA(JP)", online: false, page: "slots", platform: "mobile" },
  { playerId: "3846817", name: "Ahmed Hassan", email: "ahmed.hassan@example.com", balance: 200.00, bonusBalance: 20.00, language: "AR(SA)", online: true, onlineTime: "00:55:40", page: "casino", platform: "web" },
  { playerId: "3846810", name: "Sophie Dubois", email: "sophie.dubois@example.com", balance: 50.00, bonusBalance: 5.00, language: "FR(FR)", online: false, page: "sports", platform: "desktop" },
  { playerId: "3846803", name: "Carlos Rodriguez", email: "carlos.rodriguez@example.com", balance: 0.00, bonusBalance: 75.00, language: "ES(ES)", online: true, onlineTime: "02:20:15", page: "poker", platform: "mobile" },
  { playerId: "3846796", name: "Anna Kowalski", email: "anna.kowalski@example.com", balance: 180.75, bonusBalance: 0.00, language: "PL(PL)", online: false, page: "slots", platform: "web" },
  { playerId: "3846789", name: "David Chen", email: "david.chen@example.com", balance: 400.00, bonusBalance: 40.00, language: "ZH(CN)", online: true, onlineTime: "01:10:30", page: "live-casino", platform: "desktop" },
  { playerId: "3846782", name: "Emma Wilson", email: "emma.wilson@example.com", balance: 95.50, bonusBalance: 0.00, language: "EN(AU)", online: false, page: "casino", platform: "mobile" },
  { playerId: "3846775", name: "Luca Rossi", email: "luca.rossi@example.com", balance: 0.00, bonusBalance: 30.00, language: "IT(IT)", online: true, onlineTime: "00:35:25", page: "sports", platform: "web" },
  { playerId: "3846768", name: "Sara Andersson", email: "sara.andersson@example.com", balance: 275.00, bonusBalance: 25.00, language: "SV(SE)", online: false, page: "poker", platform: "desktop" },
  { playerId: "3846761", name: "Mikhail Petrov", email: "mikhail.petrov@example.com", balance: 150.25, bonusBalance: 0.00, language: "RU(RU)", online: true, onlineTime: "04:05:50", page: "slots", platform: "mobile" },
  { playerId: "3846754", name: "Olivia Brown", email: "olivia.brown@example.com", balance: 0.00, bonusBalance: 60.00, language: "EN(CA)", online: false, page: "live-casino", platform: "web" },
  { playerId: "3846747", name: "Hassan Alawi", email: "hassan.alawi@example.com", balance: 420.00, bonusBalance: 35.00, language: "AR(AE)", online: true, onlineTime: "02:40:18", page: "casino", platform: "desktop" },
  { playerId: "3846740", name: "Nina Silva", email: "nina.silva@example.com", balance: 65.75, bonusBalance: 0.00, language: "PT(BR)", online: false, page: "sports", platform: "mobile" },
  { playerId: "3846733", name: "Thomas Laurent", email: "thomas.laurent@example.com", balance: 310.50, bonusBalance: 30.00, language: "FR(CA)", online: true, onlineTime: "01:55:42", page: "poker", platform: "web" },
  { playerId: "3846726", name: "Elena Popescu", email: "elena.popescu@example.com", balance: 88.00, bonusBalance: 10.00, language: "RO(RO)", online: false, page: "slots", platform: "mobile" },
  { playerId: "3846719", name: "James O'Brien", email: "james.obrien@example.com", balance: 210.00, bonusBalance: 0.00, language: "EN(IE)", online: true, onlineTime: "00:22:10", page: "casino", platform: "web" },
];

const PLATFORMS = ['web', 'mobile', 'desktop'] as const;
const PAGES = ['casino', 'slots', 'poker', 'sports', 'live-casino'] as const;
const LANGUAGES = ['EN(US)', 'EN(GB)', 'ES(ES)', 'DE(DE)', 'FR(FR)', 'IT(IT)', 'PT(BR)', 'RU(RU)', 'AR(SA)', 'ZH(CN)', 'JA(JP)', 'PL(PL)', 'SV(SE)'] as const;

/** Deterministic pseudo-random number seeded by index — keeps data stable across renders */
const seededRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const generatePlayer = (index: number): Player => {
  const r = (offset = 0) => seededRandom(index * 7 + offset);
  const base = BASE_PLAYERS[index % BASE_PLAYERS.length];
  const id = 3846852 - (index + BASE_PLAYERS.length) * 7;

  return {
    playerId: String(id),
    name: `${base.name.split(' ')[0]} ${['A', 'B', 'C', 'D', 'E'][Math.floor(r(1) * 5)]}-${index + 100}`,
    email: `player${id}@example.com`,
    balance: Math.floor(r(2) * 1000 * 100) / 100,
    bonusBalance: Math.floor(r(3) * 100 * 100) / 100,
    language: LANGUAGES[Math.floor(r(4) * LANGUAGES.length)],
    online: r(5) > 0.5,
    onlineTime: r(5) > 0.5 ? `0${Math.floor(r(6) * 9)}:${Math.floor(r(7) * 59).toString().padStart(2, '0')}:${Math.floor(r(8) * 59).toString().padStart(2, '0')}` : undefined,
    page: PAGES[Math.floor(r(9) * PAGES.length)],
    platform: PLATFORMS[Math.floor(r(10) * PLATFORMS.length)],
  };
};

const GENERATED: Player[] = Array.from({ length: 180 }, (_, i) => generatePlayer(i));

/**
 * Full dataset: 20 hand-crafted base players + 180 generated = 200 total.
 * In production this would be fetched from an API.
 */
export const MOCK_PLAYERS: Player[] = [...BASE_PLAYERS, ...GENERATED];
