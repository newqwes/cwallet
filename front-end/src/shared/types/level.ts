export interface ILevelData {
  id: string;
  level: number;
  price: number;
  upgrade: string[];
  name: 'Earn' | 'Luck' | 'Time' | 'Secret';
}
