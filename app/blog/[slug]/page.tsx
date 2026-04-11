import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { blogArticles, getBlogArticleBySlug } from "@/shared/data/blogArticles";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      title: "Статья не найдена",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.thumbnail],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto max-w-5xl px-4">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Назад к блогу
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card-hover">
          <div className="aspect-[16/8] overflow-hidden bg-muted">
            <img src={article.thumbnail} alt={article.thumbnailAlt} className="h-full w-full object-cover" />
          </div>
          <div className="p-6 md:p-10">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border border-border px-3 py-1">{article.heroEyebrow}</span>
              <span>{article.date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={14} />
                {article.readTime}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-display md:text-5xl">{article.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">{article.intro}</p>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-3 rounded-2xl border border-border bg-background/70 p-5 text-sm leading-6 text-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-background/80 p-5 text-sm text-muted-foreground">
              Изображение для статьи:{" "}
              <a
                href={article.imageSourceHref}
                target="_blank"
                rel="noreferrer"
                className="text-primary transition-colors hover:text-primary/80"
              >
                {article.imageSourceLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
