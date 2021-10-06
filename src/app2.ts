import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import Product from './product.model';

const products = [
	{
		title: 'book',
		price: 10.99,
	},
	{
		title: 'another book',
		price: 20.99,
	},
];
import _ from 'lodash';
console.log(_.shuffle([ 1, 2, 3, 4, 5, 6 ]));

const productsInst = plainToClass(Product, products);
// console.log(productsInst)
for (let prod of productsInst) console.log(prod.getInfo());

const newProd = new Product('ttt', 5.99);
validate(newProd).then((errors) => {
	if (errors.length > 0) {
		console.log('We have some errors!');
		console.log(errors);
	} else console.log(newProd.getInfo());
});
