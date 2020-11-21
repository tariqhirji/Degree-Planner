import User from '../models/user';
import { sendEmail } from '../utils/sendEmail';
import bcrypt from 'bcrypt';
import { redis } from '../app';
import { v4 } from 'uuid';

export const login = async (req, res) => {
    const { username, password } = req.body;

    let user;
    const errors = [];
    let field;

    if(username.includes('@')){
        user = await User.findOne({ email : username});
        field = 'Email';
    } else{ 
        user = await User.findOne({username});
        field = 'Username';
    }

    if(!user){
        errors.push({
            field,
            message: `${field} doesn't exist`
        });
    }

    else{
        const valid = await bcrypt.compare(password, user.password);

        if(valid){
            user.password = '';
            req.session.uid = user._id;
        } else{
            errors.push({
                field: 'Password',
                message: 'Incorrect password'
            });

            user = null;
        }
    }

    res.json({user, errors});
}

export const register = async (req, res) => {
    const { username, password, email } = req.body;

    const errors = [];
    let user;

    if(username.includes('@')){
        errors.push({
            field: 'Username',
            message: 'Username cannot include the @ sign'
        });
    }

    if(!email.includes('@')){
        errors.push({
            field: 'Email',
            message: 'Email should include the @ sign'
        });
    }

    user = await User.findOne({ email });

    if(user){
        errors.push({
            field: 'Email',
            message: 'Email is already taken'
        });

        user = null;
    }

    user = await User.findOne({ username });

    if(user){
        errors.push({
            field: 'Username',
            message: 'Username is already taken'
        });

        user = null;
    }

    if(errors.length === 0){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({...req.body, password: hashedPassword});

        user = await newUser.save();
        user.password = '';

        req.session.uid = user._id;
    }

    res.json({ user, errors });
}

export const logout = async (req, res) => {
    await req.session.destroy(err => {
        res.clearCookie(process.env.COOKIE_NAME);

        if(err) {
            res.json({message: 'Something went wrong'});
        }

        else{
            res.json({message: 'Sucessfuly signed out'});
        }
    });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        res.json({success: true});
    }

    else{
        const token = v4();
        const href = `<a href='${process.env.CLIENT}/change_password/${token}'>Reset Password</a>`;

        await redis.set(
            'forgot-password:' + token, //key
             user._id, //session
            'ex', //expires
            1000 * 60 * 60 * 24 *3
        ); //token expires in 3 days

        await sendEmail(email ,href);

        res.json({success: true});
    }
}

export const changePassword = async (req, res) => {
    const { token, newPassword } = req.body;
    
    let user = null;
    let errors = [];

    const key = 'forgot-password:' + token;
    const uid = await redis.get(key);

    if(!uid){
        errors.push({
            field: 'Token',
            message: 'Token expired'
        });
    }

    //token has not expired
    else{
        user = await User.findOne({ _id: uid });
        
        //user no longer exists
        if(!user){
            errors.push({
                field: 'token',
                message: 'User no longer exists'
            });
        }

        else{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await User.updateOne({ _id: uid }, { password: hashedPassword});

            req.session.uid = user._id;
        }
    }

    res.json({ user, errors });
}

export const getMe = async (req, res) => {
    if(req.session.uid){
        const user = await User.findOne({ _id: req.session.uid });
        user.password = '';

        res.json(user);
    }

    else{
        res.json(null);
    }
}

export const setAcademia = async(req, res) => {
    const{university, year, degree, dept, coursesTaken} = req.body;
    if(req.session.uid){        
        const user = await User.findByIdAndUpdate({_id: req.session.uid},
                                                {university: university},
                                                {yearOfStudy: year},
                                                {degree: degree},
                                                {department: dept},
                                                {coursesTaken: coursesTaken});
        if(user === null){
            res.json(null);
        } else{
            res.json({success: true});
        }
    }
}