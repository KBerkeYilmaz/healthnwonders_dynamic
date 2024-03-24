const { body } = require('express-validator');

const validationRules = [
    body('contact-name').trim().not().isEmpty().withMessage('Name is required'),
    body('contact-email').isEmail().withMessage('Invalid email format'),
    body('contact-phone').matches(/^\d{10,}$/).withMessage('Invalid phone number'),
    body('contact-date').not().isEmpty().withMessage('Date is required'),
    body('contact-gender').not().isEmpty().withMessage('Gender is required'),
    body('contact-doctor').not().isEmpty().withMessage('Doctor is required'),
    body('contact-treatment').not().isEmpty().withMessage('Treatment is required'),
    body('contact-privacy-agreement').equals('on').withMessage('Privacy agreement is required'),
    body('contact-privacy-policy').equals('on').withMessage('Privacy policy acceptance is required'),
  ];
  

  module.exports = validationRules;
