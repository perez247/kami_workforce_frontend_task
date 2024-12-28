export class UserModel {
    id = 1;
    firstName = '';
    lastName = '';
    userName = '';
    email = '';
    phone = '';
    website = '';
    company = '';
    imageUrl = '';

    constructor(data: Partial<UserModel>) {
        Object.assign(this, data);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}