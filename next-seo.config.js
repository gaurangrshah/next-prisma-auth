const BASE_URL = "https://<site-path>.vercel.app";

const title = "next-prisma-auth";
const description = "Next.js FullStack";

const SEO = {
  title,
  description,
  url: `${BASE_URL}`,
  canonical: `${BASE_URL}`,
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${BASE_URL}`,
    title,
    description,
    images: [
      {
        url: `${BASE_URL}/static/images/logo.png`,
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
    site_name: `${title}`,
  },
};

export default SEO;
