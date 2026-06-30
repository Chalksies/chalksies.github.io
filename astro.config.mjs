// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import wikiLinkPlugin from 'remark-wiki-link';
import { remarkMark } from 'remark-mark-highlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://chalksies.github.io/',
	// base: '/TheIrisSchism/',
	integrations: [
		starlight({
			title: 'ChailkiiCat',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
	markdown: {
		remarkPlugins: [
			[wikiLinkPlugin, {
				aliasDivider: '|',
				hrefTemplate: (/** @type {string} */ permalink) => {
					const slug = permalink
					.toLowerCase()
                    .replace(/[()]/g, '')
                    .replace(/[\s_]+/g, '-')
                    .replace(/-+/g, '-');
				}
            }],
			remarkMark
        ]
    }
});
