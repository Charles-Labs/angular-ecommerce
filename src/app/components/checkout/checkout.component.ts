import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { EcommerceFormService } from 'src/app/services/ecommerce-form.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

	checkoutFormGroup!: FormGroup;

	totalPrice: number = 0;
	totalQuantity: number = 0;
	creditCardYears: number[] = [];
	crediCardMonths: number[] = [];
	countries: Country[] = [];

	constructor(private formBuilder: FormBuilder,
		private ecommerceFormService: EcommerceFormService) { }

	ngOnInit(): void {
		this.checkoutFormGroup = this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName: [''],
				lastName: [''],
				email: ['']
			}),
			shippingAddress: this.formBuilder.group({
				street: [''],
				city: [''],
				province: [''],
				country: [''],
				areaCode: ['']
			}),
			billingAddress: this.formBuilder.group({
				street: [''],
				city: [''],
				state: [''],
				country: [''],
				zipCode: ['']
			}),
			creditCard: this.formBuilder.group({
				cardType: [''],
				nameOnCard: [''],
				cardNumber: [''],
				securityCode: [''],
				expirationMonth: [''],
				expirationYear: ['']
			})
		});

		// populate credit card months
		const startMonth: number = new Date().getMonth() + 1;
		console.log("startMonth: " + startMonth);
		this.setCredictCardMonths(startMonth);

		// populate credit card years
		this.ecommerceFormService.getCreditCardYears().subscribe(
			data => {
				console.log("Retrieved credit card years: " + JSON.stringify(data));
				this.creditCardYears = data;
			}
		);

		// populate countries
		this.ecommerceFormService.getCountries().subscribe(
			data => {
				console.log("Retrieved countries: " + JSON.stringify(data));
				this.countries = data;
			}
		);
	}

	handleMonthsAndYears() {
		const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

		const currentYear: number = new Date().getFullYear();
		const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

		// if the current year equals the selected year, then start with current month

		let startMonth: number = 1;
		if (currentYear === selectedYear) {
			startMonth = new Date().getMonth() + 1;
		}

		this.setCredictCardMonths(startMonth);
	}

	private setCredictCardMonths(startMonth: number) {
		this.ecommerceFormService.getCreditCardMonths(startMonth).subscribe(
			data => {
				console.log("Retrieved credit card months: " + JSON.stringify(data));
				this.crediCardMonths = data;
			}
		);
	}

	onSubmit() {
		console.log("Handling the submit button");
		console.log(this.checkoutFormGroup.get('customer')?.value);
	}

	getStates() {
		throw new Error('Method not implemented.');
	}
}
