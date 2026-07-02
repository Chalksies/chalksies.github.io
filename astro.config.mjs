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
      if (Array.isArray(node.children)) node.children.forEach(walk);
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
			title: 'ChalkiiCat',
			/*customCss: [
				'/src/assets/schism.css',
				'/src/assets/home.css'
			],*/
			head: [
				{
					tag: 'script',
					content: `
            			(function() {
              				const path = window.location.pathname;
              				const head = document.querySelector('head');
              
              				// base css load
              				const baseLink = document.createElement('link');
              				baseLink.rel = 'stylesheet';
              				baseLink.href = '/styles/base.css';
              				head.appendChild(baseLink);

              				// load based on path
              				const themeLink = document.createElement('link');
              				themeLink.rel = 'stylesheet';
              
              				if (path.includes('/schism')) {
                			themeLink.href = '/styles/schism.css';
              				} else {
                			themeLink.href = '/styles/home.css';
              				}
              			head.appendChild(themeLink);
					})();
          			`,}
			],
			sidebar: [],
			components: {
				PageTitle: './src/components/CustomPageTitle.astro',
				SiteTitle: './src/components/CustomSiteTitle.astro',
			}
		}),
	],
	markdown: {
    	remarkPlugins: [cleanAstroLinks]
  }
});
