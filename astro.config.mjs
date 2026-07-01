import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

function cleanAstroLinks() {
  return (tree) => {
    function walk(node) {
      if (!node) return;
      
      if (node.type === 'link' && node.url) {
        if (node.url.endsWith('.md') || node.url.endsWith('.mdx')) {
          
          let newUrl = node.url.replace(/\.mdx?$/, '');
          newUrl = newUrl.replace(/[()]/g, '');
          
          node.url = newUrl;
        }
      }
      
      if (Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    }
    walk(tree);
  };
}

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
    	remarkPlugins: [cleanAstroLinks]
  }
});
