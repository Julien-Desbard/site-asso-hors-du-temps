import type { StrapiApp } from "@strapi/strapi/admin";
import frTranslations from './translations/fr.json';

export default {
  config: {
    locales: ['fr'],
    translations: {
      fr: frTranslations,
    },
  },
	bootstrap(app: StrapiApp) {
		console.log(app);
		console.log("bootstrap chargé")
	},
};
