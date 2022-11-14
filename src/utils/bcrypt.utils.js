import bcrypt from 'bcrypt';

export const encryptPassword =  password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
  }

export const confirmPassword = (password,hash) => bcrypt.compareSync(password, hash);