import { loginSuccess, logoutSuccess } from "../redux/features/auth";

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === loginSuccess.type) {
    localStorage.setItem("auth", JSON.stringify(store.getState().auth));
  }

  if (action.type === logoutSuccess.type) {
    localStorage.removeItem("auth");
  }

  return next(action);
};

export default localStorageMiddleware;
