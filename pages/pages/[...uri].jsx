import { NextSeo } from 'next-seo';
import { setEdgeHeader } from '@pantheon-systems/wordpress-kit';
import { ContentWithImage } from '@pantheon-systems/nextjs-kit';
import { IMAGE_URL } from '../../lib/constants';

import Layout from '../../components/layout';

import { getFooterMenu } from '../../lib/Menus';
import { getPageByUri } from '../../lib/Pages';

export default function PageTemplate({ menuItems, page }) {
	return (
		<Layout footerMenu={menuItems}>
			<NextSeo
				title="Decoupled Next WordPress Demo"
				description="Generated by create next app."
			/>
			<ContentWithImage
				title={page.title}
				content={page.content}
				date={new Date(page.date).toLocaleDateString('en-US', {
					timeZone: 'UTC',
				})}
				imageProps={
					page.featuredImage
						? {
								src: page.featuredImage?.node.sourceUrl,
								alt: page.featuredImage?.node.altText,
						  }
						: undefined
				}
				contentClassName="ps-wp-content"
			/>
		</Layout>
	);
}

export async function getServerSideProps({ params: { uri }, res }) {
	const menuItems = await getFooterMenu();
	const page = await getPageByUri(uri);
	setEdgeHeader({ res });

	if (!page) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			menuItems,
			page,
		},
	};
}