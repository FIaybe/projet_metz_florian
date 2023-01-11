export class Client {
  id: number = 0;
  lastname: string = '';
  firstName: string = '';
  address: string = '';
  zipCode: string = '';
  city: string = '';
  country: string = '';
  phone: string = '';
  email: string = '';
  gender: string = '';
  login: string = '';
  password: string = '';
  passwordValidation: string = '';
  constructor(id: number = 0,
    name: string = '', firstName: string = '', address: string = '',
    zipCode: string = '', city: string = '', country: string = '',
    phone: string = '', email: string = '', gender: string = '', login: string = '',
    password: string = '', passwordValidation: string = '') {
    this.id = id;
    this.lastname = name;
    this.firstName = firstName;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
    this.login = login;
    this.password = password;
    this.passwordValidation = passwordValidation;
  }

}
