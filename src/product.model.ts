import { IsPositive, IsNumber, IsNotEmpty } from 'class-validator';

export default class Product {
	@IsNotEmpty() 
   private title: string;
	@IsPositive()
	@IsNumber()
	private price: number;
	constructor (t: string, p: number) {
		this.title = t;
		this.price = p;
	}
	getInfo (): string {
		return `${this.title}, $${this.price}`;
	}
}
