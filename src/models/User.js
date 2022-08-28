export default class User {
    static empty() {
        let obj = new User();
        obj.name = null;
        //obj.email = null;
        //obj.password = null;
        obj.profilePicture = '/profile-pictures/default.png';
        return obj;
    }
}