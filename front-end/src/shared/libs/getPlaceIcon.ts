const PLACE_ICONS: string[] = ['🥇', '🥈', '🥉', '🏅', '🎖', '🎫'];

export const getPlaceIcon = (place: number) => {
  return PLACE_ICONS[place];
};
