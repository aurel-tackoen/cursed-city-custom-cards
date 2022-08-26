module.exports = function checkAuth(user, data) {
  return new Promise((resolve, reject) => {
    const isOwner = user.email === data.user.email;
    if (!isOwner) {
      return reject(new Error('Not owner'));
    }
    return resolve(true);
  });
};
