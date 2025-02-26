import type React from "react";
import Head from "next/head";

interface PageHeadingProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  description,
  breadcrumbs,
}) => {
  return (
    <>
      <Head>
        <title>{title} | Quikmemo - Note-taking App</title>
        <meta
          name="description"
          content={description || `Learn more about ${title}`}
        />
      </Head>
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {breadcrumbs && (
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-500">/</span>}
                    <a
                      href={crumb.href}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {crumb.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-2 text-xl text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PageHeading;
