// netlify/functions/partners.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
	try {
		const SONATO_URL =
			process.env.SONATO_URL ||
			"https://sonato.com/py/api/alliance/partner/p_list/018153d7-b2e5-7e35-8fe5-eab4ea62efbd";

		const res = await fetch(SONATO_URL);
		if (!res.ok) {
			return {
				statusCode: res.status,
				body: `Error fetching partner list: ${res.statusText}`,
			};
		}

		const json = await res.json();

		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*", // or lock down to your domain
				"Access-Control-Allow-Headers": "Content-Type",
			},
			body: JSON.stringify(json),
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: `Server error: ${err.message}`,
		};
	}
};
