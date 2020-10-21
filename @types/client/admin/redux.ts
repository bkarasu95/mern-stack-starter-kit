export const SERVER_RESULT = "server_result";
export const CLEAR_RESULT = "clear_result";
export const SET_SHOWED_RESULT = "set_showed_result";
export type result = 'error' | 'info' | 'success' | 'warning' | null;

export interface Message {
    message: string | null
    type: result | null,
    redirected: boolean, // we should show the redirected.
    showed: boolean
}

export interface ServerResult {
    type: typeof SERVER_RESULT;
    payload: Message;
}

export interface ClearResult {
    type: typeof CLEAR_RESULT;
    payload: Message;
}

export interface SetShowedResult {
    type: typeof SET_SHOWED_RESULT;
    payload: Message;
}

export type ResultTypes = ServerResult | ClearResult | SetShowedResult;


export const SET_THEME = "set_theme";
export interface SetTheme {
    type: typeof SET_THEME;
    payload: any
}
