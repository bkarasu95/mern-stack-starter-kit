export interface Language {
  forms: {
    login: string;
    logout: string;
    username: string;
    password: string;
  };
  sidebar: {
    greetings: string;
  };
  general: {
    notFound: string;
  };
  resource: {
    management: string;
    add: string;
    list: string;
    edit: string;
    update: string;
  };
}

export type LanguageGroup = {
  [key: string]: Language;
};
