export default class UserDto{
   constructor(user){
        this._id = user._id
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.cartID = user.cartID
        this.role = user.role
        this.fullname = `${user.first_name} ${user.last_name}`
    }
}


export class AllUserDto extends UserDto{
    constructor(user){
        super(user)  
        this.password = user.password
    }

}