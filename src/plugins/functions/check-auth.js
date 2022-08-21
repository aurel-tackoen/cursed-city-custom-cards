module.exports = function checkAuth(context) {
  return new Promise((resolve, reject) => {
    const user = context.clientContext && context.clientContext.user;
    if (!user) {
      return reject(new Error('Not authenticated'));
    }
    console.log('user', user);
    return resolve(user);
  });
};
