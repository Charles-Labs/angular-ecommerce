import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { EcommerceFormService } from 'src/app/services/ecommerce-form.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

	checkoutFormGroup!: FormGroup;
	shippingAddressStates: State[] = [];
	billingAddressStates: State[] = [];

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
				firstName: new FormControl('',
					[Validators.required, Validators.minLength(2)]),
				lastName: new FormControl('',
					[Validators.required, Validators.minLength(2)]),
				email: new FormControl('',
					[Validators.required, 
					Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
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
				province: [''],
				country: [''],
				areaCode: ['']
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
		console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
		console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);
	}

	getStates(formGroupName: string) {

		const formGroup = this.checkoutFormGroup.get(formGroupName)!;

		const countryCode = formGroup.value.country.code;
		const countryName =formGroup.value.country.name;

		console.log(`${formGroupName} country code: ${countryCode}`);
		console.log(`${formGroupName} country name: ${countryName}`);
		
		// populate states
		this.ecommerceFormService.getStates(countryCode).subscribe(
			data => {
				console.log("Retrieved states: " + JSON.stringify(data));

				if (formGroupName === 'shippingAddress') {
					this.shippingAddressStates = data;
				} else {
					this.billingAddressStates = data;
				}

				// select first state value by default
				formGroup.get('province')?.setValue(data[0]);
			}
		);
	}

	copyShippingAddressToBillingAddress(event: any) {
		if (event.target.checked) {
			this.checkoutFormGroup.controls['billingAddress']
				.setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

			// bug fix for states
			this.billingAddressStates = this.shippingAddressStates;
		} else {
			this.checkoutFormGroup.controls['billingAddress'].reset();
		}
	}

	get firstName() {
		return this.checkoutFormGroup.get('customer.firstName');
	}

	
}
