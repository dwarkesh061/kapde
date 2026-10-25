import Link from "next/link";
import Image from "next/image";

export function StorefrontFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src="/Kapde-logo-no-bg.svg"
            alt="KAPDE"
            width={18}
            height={18}
            className="object-contain"
          />
          <p className="footer-copy">
            © {new Date().getFullYear()} KAPDE. All rights reserved.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/about" className="footer-link">
            About
          </Link>
          <Link href="/privacy" className="footer-link">
            Privacy
          </Link>
          <Link href="/terms" className="footer-link">
            Terms
          </Link>
          <Link href="/admin/login" className="footer-link" style={{ fontWeight: 500 }}>
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
