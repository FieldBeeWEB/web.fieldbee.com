const authPages = {
  home: "/",
  profile: "/profile",
  fields: "/fields",
  tasks: "/tasks",
  map: "/map",
  field: (id: string, uri: string) => `/fields/${id}?uri=${uri}`,
  importFields: "/import-fields",
  editField: (id: string, uri: string) => `/edit-field/${id}?uri=${uri}`,
  addField: "add-field",
} as const;

const publicPages = {
  login: "/login",
  emailLogin: "/email-login",
  resetPassword: "/reset-password",
  setNewPassword: "/set-new-password",
  signUp: "/sign-up",
} as const;

export const authedPagePaths = Object.values(authPages);

export const pagePaths = {
  publicPages,
  authPages,
  logout: "/logout",
} as const;
