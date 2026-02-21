import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">Xiaohongshu</h1>
    </main>
  );
}
