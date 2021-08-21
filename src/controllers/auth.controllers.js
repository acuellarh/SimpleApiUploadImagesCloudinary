const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

/**
 * Controller to register a new user
 * @param {Object} req 
 * @param {Object} res 
 */
const createUser = async (req, res) => {

  const { name, lastname, email, password, confirmationPassword } = req.body;
  if (!name || !lastname || !email || !password || !confirmationPassword ) {
    res.status(403).json({ error: { status: 403,
    message: 'Some fields weren\'t send, please check if the name, lastname, email, password and confirmation password ' } });
  }
  if (password !== confirmationPassword) {
    res.status(403).json({ error: { status: 403, message: 'passwords doesn\'t match' } });
  }

  try {
    console.log(email);

    const user = await new User({ name, lastname, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    // error.statusCode = 403
    // error.message = ' user not created'
    //FIXME: fix handling erros
    throw new Error(error);
  }
}

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403).json({ error: { status: 403, message: 'email are password required' } });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      //TODO: validate password
      console.log(user);
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      res.status(200).json({ token });
    }

  } catch (error) {
    throw new Error(error);
  }

}

const logOut = (req, res) => {
  console.log('logout user');
}

const showData = (req, res) => {
  console.log(req.headers);
  res.status(200).json({ message: 'private data' })
}

const updateUser = async (req, res) => {
  const id = req.params.id
  let { name, lastname, email } = req.body;

  if (!name){
    user = await User.findById(id)
    name = user.name
    console.log(name)
  }

  if (!lastname){
    user = await User.findById(id)
    lastname = user.lastname
    console.log(lastname)
  }

  if (!email){
    user = await User.findById(id)
    email = user.email
    console.log(email)
  }

  try {
    const user = await User.findByIdAndUpdate(id, { name, lastname, email })    
    res.status(201).json(user);    
  } catch (error) {
    res.status(400).json({error})
  }
} 


module.exports = {
  createUser, loginUser, logOut, showData, updateUser
}