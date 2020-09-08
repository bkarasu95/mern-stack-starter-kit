import { LOG_OUT, LOG_IN } from '../../../resources/strings/actions';
import { IUser } from './../../../../common/resources/types/user';
export interface Authenticate {
    user?: IUser
}

// Action constants and shape
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

interface LoginAction {
    type: typeof LOG_IN
    payload: Authenticate
}

interface LogoutAction {
    type: typeof LOG_OUT
}

export type AuthenticateActionTypes = LoginAction | LogoutAction
