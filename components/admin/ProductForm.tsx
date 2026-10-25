"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product, ProductVariant, ProductCategory, ProductStatus, CATEGORIES } from "@/lib/types";
import { Plus, Trash2, Upload, Loader2, ArrowLeft, Check, AlertCircle } from "lucide-react";

function createCleanVariant(): ProductVariant {
  return {
    id: `var_new_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    productId: "",
    color: "",
    colorHex: "#181818",
    images: [],
    sizes: [
      { id: `sz_new_${Date.now()}_30`, size: "30", stock: 5 },
      { id: `sz_new_${Date.now()}_32`, size: "32", stock: 8 },
      { id: `sz_new_${Date.now()}_34`, size: "34", stock: 4 },
    ],
  };
}

interface ProductFormProps {
  initialData?: Product;
  mode: "new" | "edit";
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState(initialData?.name ?? "");
  const [price, setPrice] = useState(initialData?.price ? initialData.price.toString() : "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState<ProductCategory>(initialData?.category ?? "pants");
  const [status, setStatus] = useState<ProductStatus>(initialData?.status ?? "draft");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [variants, setVariants] = useState<ProductVariant[]>(
    initialData?.variants && initialData.variants.length > 0
      ? initialData.variants
      : [createCleanVariant()]
  );

  function addVariant() {
    setVariants((prev) => [...prev, createCleanVariant()]);
  }

  function removeVariant(variantId: string) {
    if (variants.length <= 1) return;
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
  }

  function updateVariant(variantId: string, field: "color" | "colorHex", value: string) {
    setVariants((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, [field]: value } : v))
    );
  }

  function updateStock(variantId: string, sizeId: string, value: string) {
    const num = Math.max(0, parseInt(value) || 0);
    setVariants((prev) =>
      prev.map((v) =>
        v.id === variantId
          ? {
              ...v,
              sizes: v.sizes.map((s) => (s.id === sizeId ? { ...s, stock: num } : s)),
            }
          : v
      )
    );
  }

  function addSize(variantId: string) {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === variantId
          ? {
              ...v,
              sizes: [
                ...v.sizes,
                { id: `sz_new_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`, size: "", stock: 0 },
              ],
            }
          : v
      )
    );
  }

  function removeSize(variantId: string, sizeId: string) {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === variantId
          ? { ...v, sizes: v.sizes.filter((s) => s.id !== sizeId) }
          : v
      )
    );
  }

  function updateSizeLabel(variantId: string, sizeId: string, value: string) {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === variantId
          ? { ...v, sizes: v.sizes.map((s) => (s.id === sizeId ? { ...s, size: value } : s)) }
          : v
      )
    );
  }

  function addImageUrl(variantId: string, url: string) {
    if (!url.trim()) return;
    setVariants((prev) =>
      prev.map((v) =>
        v.id === variantId
          ? {
              ...v,
              images: [
                ...v.images,
                {
                  id: `img_new_${Date.now()}`,
                  url: url.trim(),
                  alt: `${name} - ${v.color}`,
                  sortOrder: v.images.length,
                },
              ],
            }
          : v
      )
    );
  }

  function removeImage(variantId: string, imageId: string) {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === variantId
          ? { ...v, images: v.images.filter((img) => img.id !== imageId) }
          : v
      )
    );
  }

  async function handleFileUpload(variantId: string, e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.images) {
        setVariants((prev) =>
          prev.map((v) => {
            if (v.id !== variantId) return v;
            const newImages = data.images.map((img: any, idx: number) => ({
              id: `img_new_${Date.now()}_${idx}`,
              url: img.url,
              alt: img.alt || name,
              sortOrder: v.images.length + idx,
            }));
            return { ...v, images: [...v.images, ...newImages] };
          })
        );
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch {
      alert("Failed to upload image file");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveStatus("saving");
    setErrorMessage("");

    try {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        throw new Error("Please specify a valid price.");
      }

      const payload = {
        id: initialData?.id,
        name: name.trim(),
        price: numericPrice,
        description: description.trim(),
        category,
        status,
        featured,
        variants,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save product.");
      }

      setSaveStatus("saved");
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 800);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setSaveStatus("error");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        maxWidth: "960px",
        margin: "0 auto",
        width: "100%",
        paddingBottom: "80px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "20px",
          borderBottom: "1px solid #e5e7eb",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: "8px",
              border: "1px solid #e5e7eb",
              borderRadius: "2px",
              background: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#374151",
            }}
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#9ca3af",
                display: "block",
              }}
            >
              {mode === "new" ? "New Atelier Piece" : "Edit Piece"}
            </span>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#000000",
                margin: "2px 0 0",
              }}
            >
              {mode === "new" ? "Create Garment Record" : name || "Edit Product"}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            background: saveStatus === "saved" ? "#15803d" : "#000000",
            color: "#ffffff",
            border: "none",
            borderRadius: "2px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: saving ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {saving ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : saveStatus === "saved" ? (
            <>
              <Check size={15} />
              <span>Saved Successfully</span>
            </>
          ) : (
            <span>Save & Publish</span>
          )}
        </button>
      </div>

      {errorMessage && (
        <div
          style={{
            padding: "12px 16px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: "12px",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Basic Attributes Card */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "3px",
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <h2
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#000000",
            paddingBottom: "12px",
            borderBottom: "1px solid #f0f0f0",
            margin: 0,
          }}
        >
          1. General Details
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111827", marginBottom: "6px" }}>
              Garment Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tailored Baggy Pleated Trouser"
              className="input-base"
              style={{ width: "100%", height: "42px", padding: "0 12px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111827", marginBottom: "6px" }}>
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              style={{ width: "100%", height: "42px", padding: "0 12px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "13px", background: "#ffffff" }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111827", marginBottom: "6px" }}>
              Price (INR ₹) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="3490"
              style={{ width: "100%", height: "42px", padding: "0 12px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111827", marginBottom: "6px" }}>
              Publication Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductStatus)}
              style={{ width: "100%", height: "42px", padding: "0 12px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "13px", background: "#ffffff" }}
            >
              <option value="draft">Draft (Private)</option>
              <option value="published">Published (Storefront Live)</option>
              <option value="sold_out">Sold Out</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "26px" }}>
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              style={{ width: "16px", height: "16px", accentColor: "#000000" }}
            />
            <label htmlFor="featured" style={{ fontSize: "12px", fontWeight: 600, color: "#111827", cursor: "pointer" }}>
              Feature in Drop Showcase Badge
            </label>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111827", marginBottom: "6px" }}>
              Fabric & Cut Narrative
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe textile weight, weave details, sizing advice, and drape profile..."
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "13px", resize: "vertical", fontFamily: "inherit" }}
            />
          </div>
        </div>
      </div>

      {/* Variants & Inventory Card */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "3px",
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: "12px",
          }}
        >
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#000000",
              margin: 0,
            }}
          >
            2. Colorways, Imagery & Size Matrix
          </h2>
          <button
            type="button"
            onClick={addVariant}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000000",
              background: "none",
              border: "1px solid #e5e7eb",
              borderRadius: "2px",
              padding: "5px 10px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Plus size={13} />
            <span>Add Colorway</span>
          </button>
        </div>

        {variants.map((v, vIdx) => (
          <div
            key={v.id}
            style={{
              padding: "20px",
              border: "1px solid #e5e7eb",
              borderRadius: "3px",
              background: "#fafafa",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #eaeaea",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111827" }}>
                Colorway {vIdx + 1}
              </span>
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(v.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#dc2626",
                    fontSize: "11px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Trash2 size={13} />
                  <span>Remove Variant</span>
                </button>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Color Title *
                </label>
                <input
                  type="text"
                  required
                  value={v.color}
                  onChange={(e) => updateVariant(v.id, "color", e.target.value)}
                  placeholder="e.g. Charcoal Black, Raw Indigo"
                  style={{ width: "100%", height: "38px", padding: "0 10px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "12px", background: "#ffffff" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4b5563", marginBottom: "4px" }}>
                  Color Swatch (Hex)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="color"
                    value={v.colorHex || "#181818"}
                    onChange={(e) => updateVariant(v.id, "colorHex", e.target.value)}
                    style={{ width: "38px", height: "38px", padding: "2px", border: "1px solid #d1d5db", borderRadius: "2px", cursor: "pointer", background: "#ffffff" }}
                  />
                  <input
                    type="text"
                    value={v.colorHex || "#181818"}
                    onChange={(e) => updateVariant(v.id, "colorHex", e.target.value)}
                    style={{ flex: 1, height: "38px", padding: "0 10px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "12px", fontFamily: "monospace", background: "#ffffff" }}
                  />
                </div>
              </div>
            </div>

            {/* Imagery */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
              <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4b5563" }}>
                Imagery
              </label>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {v.images.map((img) => (
                  <div
                    key={img.id}
                    style={{
                      position: "relative",
                      width: "72px",
                      height: "88px",
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(v.id, img.id)}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.7)",
                        color: "#ffffff",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Remove image"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}

                <label
                  style={{
                    width: "72px",
                    height: "88px",
                    border: "1px dashed #9ca3af",
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "#ffffff",
                    gap: "4px",
                  }}
                >
                  <Upload size={16} style={{ color: "#6b7280" }} />
                  <span style={{ fontSize: "10px", color: "#6b7280" }}>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(v.id, e)}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              {/* Direct image URL input */}
              <div style={{ display: "flex", gap: "8px", paddingTop: "4px" }}>
                <input
                  type="url"
                  placeholder="Or paste image URL (e.g. /images/pleated-trousers.jpg)"
                  id={`img_input_${v.id}`}
                  style={{ flex: 1, height: "36px", padding: "0 10px", border: "1px solid #d1d5db", borderRadius: "2px", fontSize: "12px", background: "#ffffff" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`img_input_${v.id}`) as HTMLInputElement;
                    if (el && el.value) {
                      addImageUrl(v.id, el.value);
                      el.value = "";
                    }
                  }}
                  style={{
                    padding: "0 14px",
                    height: "36px",
                    background: "#ffffff",
                    border: "1px solid #d1d5db",
                    borderRadius: "2px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Add URL
                </button>
              </div>
            </div>

            {/* Sizes & Stock */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4b5563" }}>
                  Sizes & Stock Units
                </label>
                <button
                  type="button"
                  onClick={() => addSize(v.id)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#374151",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Plus size={12} />
                  <span>Add Size</span>
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                  gap: "8px",
                }}
              >
                {v.sizes.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      padding: "8px",
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "2px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      position: "relative",
                    }}
                  >
                    <input
                      type="text"
                      value={s.size}
                      onChange={(e) => updateSizeLabel(v.id, s.id, e.target.value)}
                      placeholder="Size"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        border: "none",
                        borderBottom: "1px solid #f3f4f6",
                        paddingBottom: "2px",
                        outline: "none",
                      }}
                    />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                      <span style={{ fontSize: "10px", color: "#9ca3af" }}>Qty:</span>
                      <input
                        type="number"
                        min="0"
                        value={s.stock}
                        onChange={(e) => updateStock(v.id, s.id, e.target.value)}
                        style={{
                          width: "36px",
                          textAlign: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: "monospace",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </div>
                    {v.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSize(v.id, s.id)}
                        style={{
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          background: "none",
                          border: "none",
                          color: "#9ca3af",
                          cursor: "pointer",
                          padding: "2px",
                        }}
                        aria-label="Remove size"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
