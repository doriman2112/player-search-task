/**
 * Player data structure from RealPlay back office
 */
export interface Player {
  playerId: string;
  name: string;
  email: string;
  balance: number;
  bonusBalance: number;
  language: string;
  online: boolean;
  onlineTime?: string;
  page: string;
  platform: string;
}
