interface ProductBadgeProps {
  label: string;
}

export function ProductBadge({ label }: ProductBadgeProps) {
  return (
    /* Menggunakan breakpoint (sm:) untuk menyesuaikan posisi top */
    <div className="absolute top-2 sm:top-4 right-0 z-50">
      <div className="relative flex items-center">
        {/* SISI KIRI: Ribbon Tail (Responsif w-3 ke w-4) */}
        <div
          className="absolute -left-3 sm:-left-4 h-full w-3 sm:w-4 bg-[#414d2e]"
          style={{
            clipPath: "polygon(100% 0, 0 0, 50% 50%, 0 100%, 100% 100%)",
          }}
        />

        {/* BAGIAN TENGAH: Badge Utama (Responsif padding dan text size) */}
        <div className="bg-[#414d2e] text-white pr-3 sm:pr-4 pl-1 sm:pl-2 py-1 sm:py-2 min-w-[100px] sm:min-w-[140px] flex justify-center items-center shadow-md">
          <span className="text-[10px] sm:text-sm font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em] whitespace-nowrap">
            {label}
          </span>
        </div>

        {/* SISI KANAN BAWAH: Lipatan (Responsif ukuran border) */}
        {/* Menggunakan ukuran border lebih kecil di mobile (8px) dan lebih besar di desktop (12px) */}
        <div
          className="absolute top-full right-0 w-0 h-0 
          border-t-[8px] sm:border-t-[12px] border-t-[#252c1a] 
          border-r-[8px] sm:border-r-transparent"
        />
      </div>
    </div>
  );
}
