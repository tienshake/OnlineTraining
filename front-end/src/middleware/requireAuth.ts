const requireAuth = (store: any) => (nextState: any, replace: any) => {
  const { auth } = store.getState();

  if (!auth.isAuthenticated) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export default requireAuth;
