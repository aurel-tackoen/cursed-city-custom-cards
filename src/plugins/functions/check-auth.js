module.exports = function checkAuth(context) {
  return new Promise((resolve, reject) => {
    // Reading the context.clientContext will give us the current user
    const user = context.clientContext && context.clientContext.user;
    if (!user) {
      return reject(new Error('Not authenticated'));
    }
    console.log('user', user);
    return resolve(user);
  });
};
