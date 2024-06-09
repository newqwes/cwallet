import { postEvent } from "@tma.js/sdk";

export type IImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
export type IType = 'impact' | 'notification' | 'selection_change';
export type INotificationType = 'error' | 'success' | 'warning';

export const vibrateNow = (notification_type: INotificationType, type: IType = 'notification', impact_style: IImpactStyle = 'heavy') => {
  postEvent('web_app_trigger_haptic_feedback', {
    type,
    impact_style,
    notification_type
  });
}
