import { Player } from '../types/player';

/**
 * Mock player data for testing the search and pagination functionality
 * In production, this would come from an API endpoint
 */
export const MOCK_PLAYERS: Player[] = [
  {
    playerId: "3846852",
    name: "asdasdas",
    email: "asdasdas@example.com",
    balance: 0.00,
    bonusBalance: 12.50,
    language: "EN(US)",
    online: true,
    onlineTime: "01:25:46",
    page: "casino",
    platform: "web"
  },
  {
    playerId: "3846845",
    name: "sdasdsad asgasg",
    email: "sdasdsad.asgasg@example.com",
    balance: 45.30,
    bonusBalance: 0.00,
    language: "EN(US)",
    online: false,
    page: "slots",
    platform: "mobile"
  },
  {
    playerId: "3846838",
    name: "asfasd asdasd",
    email: "asfasd.asdasd@example.com",
    balance: 120.75,
    bonusBalance: 5.00,
    language: "EN(GB)",
    online: true,
    onlineTime: "00:45:12",
    page: "poker",
    platform: "web"
  },
  {
    playerId: "3846831",
    name: "asfaf asdasd",
    email: "asfaf.asdasd@example.com",
    balance: 0.00,
    bonusBalance: 25.00,
    language: "ES(ES)",
    online: false,
    page: "sports",
    platform: "mobile"
  },
  {
    playerId: "3846824",
    name: "afaga gasdasd",
    email: "afaga.gasdasd@example.com",
    balance: 89.20,
    bonusBalance: 0.00,
    language: "FR(FR)",
    online: true,
    onlineTime: "02:15:33",
    page: "casino",
    platform: "web"
  },
  {
    playerId: "3846817",
    name: "asfq azb",
    email: "asfq.azb@example.com",
    balance: 250.00,
    bonusBalance: 10.00,
    language: "DE(DE)",
    online: false,
    page: "live-casino",
    platform: "desktop"
  },
  {
    playerId: "3846810",
    name: "adasdaadas gasgasgag",
    email: "adasdaadas.gasgasgag@example.com",
    balance: 15.50,
    bonusBalance: 0.00,
    language: "EN(US)",
    online: true,
    onlineTime: "00:12:05",
    page: "slots",
    platform: "mobile"
  },
  {
    playerId: "3846803",
    name: "john.smith",
    email: "john.smith@example.com",
    balance: 500.00,
    bonusBalance: 50.00,
    language: "EN(US)",
    online: false,
    page: "casino",
    platform: "web"
  },
  {
    playerId: "3846796",
    name: "maria.garcia",
    email: "maria.garcia@example.com",
    balance: 75.25,
    bonusBalance: 0.00,
    language: "ES(MX)",
    online: true,
    onlineTime: "01:30:20",
    page: "sports",
    platform: "mobile"
  },
  {
    playerId: "3846789",
    name: "peter.jones",
    email: "peter.jones@example.com",
    balance: 0.00,
    bonusBalance: 100.00,
    language: "EN(GB)",
    online: false,
    page: "poker",
    platform: "desktop"
  },
  {
    playerId: "3846782",
    name: "lisa.mueller",
    email: "lisa.mueller@example.com",
    balance: 330.50,
    bonusBalance: 15.00,
    language: "DE(DE)",
    online: true,
    onlineTime: "03:45:11",
    page: "live-casino",
    platform: "web"
  },
  {
    playerId: "3846775",
    name: "yuki.tanaka",
    email: "yuki.tanaka@example.com",
    balance: 125.00,
    bonusBalance: 0.00,
    language: "JA(JP)",
    online: false,
    page: "slots",
    platform: "mobile"
  },
  {
    playerId: "3846768",
    name: "ahmed.hassan",
    email: "ahmed.hassan@example.com",
    balance: 200.00,
    bonusBalance: 20.00,
    language: "AR(SA)",
    online: true,
    onlineTime: "00:55:40",
    page: "casino",
    platform: "web"
  },
  {
    playerId: "3846761",
    name: "sophie.dubois",
    email: "sophie.dubois@example.com",
    balance: 50.00,
    bonusBalance: 5.00,
    language: "FR(FR)",
    online: false,
    page: "sports",
    platform: "desktop"
  },
  {
    playerId: "3846754",
    name: "carlos.rodriguez",
    email: "carlos.rodriguez@example.com",
    balance: 0.00,
    bonusBalance: 75.00,
    language: "ES(ES)",
    online: true,
    onlineTime: "02:20:15",
    page: "poker",
    platform: "mobile"
  },
  {
    playerId: "3846747",
    name: "anna.kowalski",
    email: "anna.kowalski@example.com",
    balance: 180.75,
    bonusBalance: 0.00,
    language: "PL(PL)",
    online: false,
    page: "slots",
    platform: "web"
  },
  {
    playerId: "3846740",
    name: "david.chen",
    email: "david.chen@example.com",
    balance: 400.00,
    bonusBalance: 40.00,
    language: "ZH(CN)",
    online: true,
    onlineTime: "01:10:30",
    page: "live-casino",
    platform: "desktop"
  },
  {
    playerId: "3846733",
    name: "emma.wilson",
    email: "emma.wilson@example.com",
    balance: 95.50,
    bonusBalance: 0.00,
    language: "EN(AU)",
    online: false,
    page: "casino",
    platform: "mobile"
  },
  {
    playerId: "3846726",
    name: "luca.rossi",
    email: "luca.rossi@example.com",
    balance: 0.00,
    bonusBalance: 30.00,
    language: "IT(IT)",
    online: true,
    onlineTime: "00:35:25",
    page: "sports",
    platform: "web"
  },
  {
    playerId: "3846719",
    name: "sara.andersson",
    email: "sara.andersson@example.com",
    balance: 275.00,
    bonusBalance: 25.00,
    language: "SV(SE)",
    online: false,
    page: "poker",
    platform: "desktop"
  },
  {
    playerId: "3846712",
    name: "mikhail.petrov",
    email: "mikhail.petrov@example.com",
    balance: 150.25,
    bonusBalance: 0.00,
    language: "RU(RU)",
    online: true,
    onlineTime: "04:05:50",
    page: "slots",
    platform: "mobile"
  },
  {
    playerId: "3846705",
    name: "olivia.brown",
    email: "olivia.brown@example.com",
    balance: 0.00,
    bonusBalance: 60.00,
    language: "EN(CA)",
    online: false,
    page: "live-casino",
    platform: "web"
  },
  {
    playerId: "3846698",
    name: "hassan.alawi",
    email: "hassan.alawi@example.com",
    balance: 420.00,
    bonusBalance: 35.00,
    language: "AR(AE)",
    online: true,
    onlineTime: "02:40:18",
    page: "casino",
    platform: "desktop"
  },
  {
    playerId: "3846691",
    name: "nina.silva",
    email: "nina.silva@example.com",
    balance: 65.75,
    bonusBalance: 0.00,
    language: "PT(BR)",
    online: false,
    page: "sports",
    platform: "mobile"
  },
  {
    playerId: "3846684",
    name: "thomas.laurent",
    email: "thomas.laurent@example.com",
    balance: 310.50,
    bonusBalance: 30.00,
    language: "FR(CA)",
    online: true,
    onlineTime: "01:55:42",
    page: "poker",
    platform: "web"
  }
];
