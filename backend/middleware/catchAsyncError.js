// if no value is passed in the create product so it will throw an error
// 1.13.00

module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
