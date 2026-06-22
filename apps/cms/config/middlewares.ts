export default [
	"strapi::logger",
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			origin: [
				"https://assohorsdutemps.fr",
				"http://localhost:3000",
			],
			methods: ["GET", "POST", "PUT", "DELETE"],
			headers: ["Content-Type", "Authorization"],
			keepHeaderOnError: true,
		},
	},
	"strapi::poweredBy",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];
