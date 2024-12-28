export class UserModel {
    id: number = 1;
    firstName: string = '';
    lastName: string = '';
    userName: string = '';
    email: string = '';
    phone: string = '';
    website: string = '';
    company: string = '';
    imageUrl: string = '';

    constructor(data: Partial<UserModel>) {
        Object.assign(this, data);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}