const SECRET_LEVEL_SMILE = ['', '🐶', '🐱', '🐭', '🐹', '🐰', ' 🦊', '🐻', '🐼', '🐻', '❄', '🐨', '️🐯', '🦁', '🐮', '🐷', '🐽'];

export const secretLevelToSmile = (level: number): string => {
  return SECRET_LEVEL_SMILE[level]
}
