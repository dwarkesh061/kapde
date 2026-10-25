import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        color: "var(--text)",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <Image
          src="/Kapde-logo-no-bg.svg"
          alt="KAPDE"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
      </div>

      <h1
        style={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        404 — Page Not Found
      </h1>

      <p
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          maxWidth: "360px",
          lineHeight: 1.6,
          marginBottom: "32px",
        }}
      >
        The silhouette or page you are seeking could not be found or has been archived from our collection.
      </p>

      <Link
        href="/"
        className="btn-primary"
        style={{ height: "42px", padding: "0 24px" }}
      >
        Return to Collection
      </Link>
    </div>
  );
}
