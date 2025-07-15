import brcrypt from 'bcrypt';

export const hashPassword = (password:string):string => {
    return brcrypt.hashSync(password,10);
}