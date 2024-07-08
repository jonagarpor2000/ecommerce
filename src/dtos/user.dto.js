export default class UserDto{
    constructor(user){
        this.id = user.id
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.password = user.password
        this.fullname = `${user.first_name} ${user.last_name}`
    }
}