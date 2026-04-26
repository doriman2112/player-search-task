import React from 'react';
import { Player } from '../types/player';

/**
 * TODO: Implement PlayerTable Component
 * 
 * Requirements:
 * - Display players in a table format
 * - Columns: Player ID, Name, Email, Balance, Status (Online/Offline)
 * - Accept array of players as prop
 * - Style to match RealPlay BO aesthetic
 * 
 * Props interface:
 * interface PlayerTableProps {
 *   players: Player[];
 * }
 * 
 * Bonus features (optional):
 * - Show online indicator with colored badge
 * - Format balance with currency symbol
 * - Show "No results" message when players array is empty
 * - Add hover effects on table rows
 */

interface PlayerTableProps {
  players: Player[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  // TODO: Implement component logic here

  return (
    <div>
      <p>TODO: Implement PlayerTable component</p>
      <p>Players to display: {players.length}</p>
      {/* Add your implementation here */}
    </div>
  );
};

export default PlayerTable;
