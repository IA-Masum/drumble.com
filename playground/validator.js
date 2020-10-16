const router = require('express').Router()
const {check, validationResult} = require('express-validator')

router.get('/validator', (req, res, next) => {

    res.render('playground/signUp', {pageTitle: "Validator"})
});

router.post('/validator',
    [
        check('userName')
            .not()
            .isEmpty()
            .withMessage('userName Should not be Empty')
            .isLength({max: 15})
            .withMessage('userName Should be with in 15 character'),

        check('email')
            .isEmail()
            .withMessage('Please Enter valid Email'),

        check('password')
            .custom(value => {
                if(value.length <= 5 ){
                    throw  new Error('Password Must be more than 5 character!')
                }
                return true
            }),

        check('confirmPassword')
            .custom((value, {req}) => {
                if(value != req.body.password){
                    throw new Error('Passwords don\'t match!')
                }
                return true
            })
    ],

    (req, res, next) => {

        let errors = validationResult(req)
        const formater = ({msg}) => msg
        res.end();
        return console.log(errors.formatWith(formater).mapped())

    });


module.exports = router;