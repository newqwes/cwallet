export interface UserTelegramInitDataModel {
  allowsWriteToPm: boolean;
  firstName: string;
  id: number;
  languageCode: string;
  lastName: string;
}

export interface TelegramInitDataModel {
  /**
   * Authentication date in ISO 8601 format.
   * Example: "2024-05-29T08:26:42.000Z"
   */
  authDate: string;
  hash: string;
  queryId: string;
  user: UserTelegramInitDataModel;
}
