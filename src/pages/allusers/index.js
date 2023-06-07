import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const index = () => {
	const [data,setData]=useState(null);
	useEffect(()=>{
		axios.get("api/getAllUsers").then(res=>{
			setData([...res.data.data])
		})
	},[])
	return (
		<div className="main-section">
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email-ID</th>
						<th>Gender</th>
						<th>Date Of Birth</th>
						<th>Country</th>
						<th>State</th>
					</tr>
					{
						data?.map((items,index)=>{
							return <tr key={items.email+"_"+index}>
								<td>{items.firstname}</td>
								<td>{items.lastname}</td>
								<td>{items.email}</td>
								<td>{items.gender}</td>
								<td>{items.dateofbirth}</td>
								<td>{items.country}</td>
								<td>{items.state}</td>
							</tr>
						})
					}
				</tbody>
			</table>
			<Link href={"/"}>Registration</Link>
		</div>
	);
};

export default index;

export const ServerSideProps = async () => {
	const data = await axios.get("api/getAllUsers");
	return {
		props: {
			data: data.data,
		},
	};
};
