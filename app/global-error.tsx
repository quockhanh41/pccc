"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-navy">Đã xảy ra sự cố!</h2>
        <p className="mt-2 text-sm text-muted">Vui lòng thử tải lại trang hoặc liên hệ hỗ trợ.</p>
        <button
          onClick={() => reset()}
          className="mt-4 cursor-pointer rounded-md bg-accent px-5 py-2.5 font-semibold text-white transition hover:bg-accent-dark"
        >
          Thử lại
        </button>
      </body>
    </html>
  );
}
