export function FloatingWhatsApp() {
  const number = process.env.WHATSAPP_NUMBER;
  if (!number) return null;

  const url = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hola! Quiero hacer una consulta sobre Besga Agro Solar."
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-4 right-4 z-[60] inline-flex min-h-14 items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg no-underline transition hover:scale-[1.02] hover:shadow-xl sm:bottom-5 sm:right-5"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M19.11 17.4c-.29-.15-1.73-.85-2-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.95 1.15-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.53.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.73-.71 1.97-1.4.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.57-.35Z" />
          <path d="M16.03 3.2c-7.07 0-12.8 5.72-12.8 12.78 0 2.26.59 4.46 1.72 6.39L3.1 28.8l6.6-1.73a12.83 12.83 0 0 0 6.33 1.61h.01c7.06 0 12.79-5.73 12.79-12.79 0-3.42-1.33-6.63-3.75-9.05A12.73 12.73 0 0 0 16.03 3.2Zm0 23.31h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.92 1.03 1.05-3.82-.26-.39a10.59 10.59 0 0 1-1.63-5.63c0-5.88 4.79-10.67 10.67-10.67 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.12 7.52c0 5.88-4.79 10.67-10.66 10.67Z" />
        </svg>
      </span>

      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}