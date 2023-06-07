import { useEffect, useState } from "react";

import { Country, State } from "country-state-city";
import axios from "axios";
import Link from "next/link";

export default function Home() {
	const [form, setForm] = useState({
		firstname: "",
		lastname: "",
		email: "",
		gender: "",
		dateofbirth: "",
		age: "",
		country: "",
		state: "",
		city: "",
	});
	const [formError, setFormError] = useState({
		firstname: "",
		lastname: "",
		email: "",
		gender: "",
		dateofbirth: "",
		age: "",
		country: "",
		state: "",
		city: "",
	});
	const [loading, setLoading] = useState(false);

	const allCountries = Country.getAllCountries();

	const ValidateForm = (form) => {
		const emailReg =
			/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

		if (form.firstname === "") {
			setFormError((pre) => ({
				...pre,
				firstname: "*First Name is Empty...",
			}));
			return true;
		}
		setFormError((pre) => ({ ...pre, firstname: "" }));

		if (form.lastname === "") {
			setFormError((pre) => ({
				...pre,
				lastname: "*Last Name is Empty...",
			}));
			return true;
		}
		setFormError((pre) => ({ ...pre, lastname: "" }));

		if (form.email === "") {
			setFormError((pre) => ({ ...pre, email: "*Email-ID is Empty..." }));
			return true;
		}
		if (!emailReg.test(form.email)) {
			setFormError((pre) => ({
				...pre,
				email: "*Enter Valid Email-ID...",
			}));
			return true;
		}
		setFormError((pre) => ({ ...pre, email: "" }));

		if (form.gender === "") {
			setFormError((pre) => ({
				...pre,
				gender: "*Please Select Gender...",
			}));
			return true;
		}
		setFormError((pre) => ({ ...pre, gender: "" }));

		if (form.country === "Select Country" || form.country === "") {
			setFormError((pre) => ({
				...pre,
				country: "*Please Select Country...",
			}));
			return true;
		}
		setFormError((pre) => ({ ...pre, country: "" }));

		if (form.state === "Select State" || form.state === "") {
			setFormError((pre) => ({
				...pre,
				state: "*Please Select State...",
			}));
			return true;
		}
		setFormError((pre) => ({ ...pre, state: "" }));

		if (form.dateofbirth === "") {
			setFormError((pre) => ({
				...pre,
				dateofbirth: "*Please Select Date of Birth...",
			}));
			return true;
		}
		setFormError((pre) => ({ ...pre, dateofbirth: "" }));

		return false;
	};

	const SubmitData = async (e) => {
		e.preventDefault();
		// console.log(ValidateForm(form));
		if (ValidateForm(form)) return;
		setLoading(true);
		const {
			firstname,
			lastname,
			gender,
			country,
			state,
			email,
			dateofbirth,
		} = form;

		const formData = new FormData();
		formData.append("firstname", firstname);
		formData.append("lastname", lastname);
		formData.append("email", email);
		formData.append("dateofbirth", dateofbirth);
		formData.append("country", Country.getCountryByCode(country).name);
		formData.append("state", state);
		formData.append("gender", gender);

		const data = await axios.post("api/addUser", formData, {
			headers: { "Content-Type": "application/json" },
		});

		setLoading(false);
		alert(data.data.message);

		if (data.data.error) {
			return;
		}
		if (data.data.success) {
			// --- this condition for the routing purpose
			if (data.data.isUserExist) {
				// ---- not calling login page condition
				return;
			} else {
				setForm({
					firstname: "",
					lastname: "",
					email: "",
					gender: "",
					dateofbirth: "",
					age: "",
					country: "",
					state: "",
					city: "",
				});
				// ---- calling login page to login
				return;
			}
		}
	};

	return (
		<div className="main-section">
			<form onSubmit={SubmitData}>
				<div className="inputs-section">
					<input
						className="input-text"
						type="text"
						value={form.firstname}
						onChange={(e) => {
							setForm((pre) => ({
								...pre,
								firstname: e.target.value,
							}));
						}}
						placeholder="First Name..."
					/>
					<label className="error-text">{formError.firstname}</label>
				</div>

				<div className="inputs-section">
					<input
						className="input-text"
						type="text"
						value={form.lastname}
						onChange={(e) => {
							setForm((pre) => ({
								...pre,
								lastname: e.target.value,
							}));
						}}
						placeholder="Last Name..."
					/>
					<label className="error-text">{formError.lastname}</label>
				</div>

				<div className="inputs-section">
					<input
						className="input-text"
						type="text"
						value={form.email}
						onChange={(e) => {
							setForm((pre) => ({
								...pre,
								email: e.target.value,
							}));
						}}
						placeholder="Email-ID..."
					/>
					<label className="error-text">{formError.email}</label>
				</div>

				<div className="radio-select-inputs-section">
					<label className="radio-select-btn-header">Gender</label>

					<div className="radio-btns-section">
						<input
							id="male"
							type="radio"
							value={"Male"}
							onChange={(e) => {
								setForm((pre) => ({
									...pre,
									gender: e.target.value,
								}));
							}}
							name="gender"
						/>
						<label htmlFor="male" className="radio-btn-text">
							Male
						</label>
					</div>

					<div className="radio-btns-section">
						<input
							id="female"
							type="radio"
							value={"Female"}
							onChange={(e) => {
								setForm((pre) => ({
									...pre,
									gender: e.target.value,
								}));
							}}
							name="gender"
						/>
						<label htmlFor="female" className="radio-btn-text">
							Female
						</label>
					</div>

					<div className="radio-btns-section">
						<input
							id="other"
							type="radio"
							value={"Other"}
							onChange={(e) => {
								setForm((pre) => ({
									...pre,
									gender: e.target.value,
								}));
							}}
							name="gender"
						/>
						<label htmlFor="other" className="radio-btn-text">
							Other
						</label>
					</div>

					<label className="error-text">{formError.gender}</label>
				</div>

				<div className="radio-select-inputs-section">
					<label className="radio-select-btn-header">Country</label>
					<select
						onChange={(e) => {
							setForm((pre) => ({
								...pre,
								country: e.target.value,
							}));
						}}
					>
						<option value={"Select Country"}>
							Select Country...
						</option>
						{allCountries?.map((items, index) => {
							return (
								<option
									key={items.isoCode}
									value={items.isoCode}
								>
									{items.name}
								</option>
							);
						})}
					</select>

					<label className="error-text">{formError.country}</label>
				</div>

				<div className="radio-select-inputs-section">
					<label className="radio-select-btn-header">State</label>
					<select
						onChange={(e) => {
							setForm((pre) => ({
								...pre,
								state: e.target.value,
							}));
						}}
					>
						<option value={"Select State"}>Select State...</option>
						{State.getStatesOfCountry(form.country)?.map(
							(items, index) => {
								return (
									<option
										key={items.isoCode}
										value={items.name}
									>
										{items.name}
									</option>
								);
							}
						)}
					</select>

					<label className="error-text">{formError.state}</label>
				</div>

				<div className="inputs-section">
					<input
						type="date"
						className="input-text"
						value={form.dateofbirth}
						onChange={(e) => {
							setForm((pre) => ({
								...pre,
								dateofbirth: e.target.value,
							}));
							console.log(e.target.value);
						}}
					/>

					<label className="error-text">
						{formError.dateofbirth}
					</label>
				</div>

				<button className="submit-btn" type="submit" disabled={loading}>
					{loading ? <span className="loading" /> : "Submit"}
				</button>
			</form>
			<Link href={"/allusers"}>See All Users Data</Link>
		</div>
	);
}
