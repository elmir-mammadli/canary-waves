"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type PolicyEditorProps = {
  privacyPolicy: string;
  termsOfUse: string;
};

export default function PolicyEditor({
  privacyPolicy,
  termsOfUse,
}: PolicyEditorProps) {
  const searchParams = useSearchParams();
  const initialDoc = useMemo(
    () => (searchParams.get("doc") === "terms" ? "terms" : "privacy"),
    [searchParams],
  );
  const [activeDoc, setActiveDoc] = useState<"privacy" | "terms">(initialDoc);
  const [privacyDraft, setPrivacyDraft] = useState(privacyPolicy);
  const [termsDraft, setTermsDraft] = useState(termsOfUse);

  const isPrivacy = activeDoc === "privacy";
  const editorValue = isPrivacy ? privacyDraft : termsDraft;

  return (
    <div style={{ marginTop: "28px", display: "grid", gap: "14px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setActiveDoc("privacy")}
          style={{
            borderRadius: "999px",
            border: "1px solid rgba(31,23,22,0.2)",
            background: isPrivacy ? "var(--watcher)" : "#fff",
            color: "var(--mineral)",
            padding: "10px 16px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Privacy Policy
        </button>
        <button
          type="button"
          onClick={() => setActiveDoc("terms")}
          style={{
            borderRadius: "999px",
            border: "1px solid rgba(31,23,22,0.2)",
            background: !isPrivacy ? "var(--watcher)" : "#fff",
            color: "var(--mineral)",
            padding: "10px 16px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Terms of Use
        </button>
      </div>

      <label style={{ display: "grid", gap: "8px" }}>
        <span style={{ color: "rgba(31,23,22,0.75)", fontWeight: 600 }}>
          Editor ({isPrivacy ? "Privacy Policy" : "Terms of Use"})
        </span>
        <textarea
          value={editorValue}
          onChange={(event) =>
            isPrivacy
              ? setPrivacyDraft(event.target.value)
              : setTermsDraft(event.target.value)
          }
          style={{
            width: "100%",
            minHeight: "420px",
            resize: "vertical",
            borderRadius: "14px",
            border: "1px solid rgba(31,23,22,0.16)",
            background: "#fff",
            color: "var(--mineral)",
            padding: "16px",
            lineHeight: 1.7,
            font: "inherit",
          }}
        />
      </label>

      <div
        style={{
          borderRadius: "14px",
          border: "1px solid rgba(31,23,22,0.16)",
          background: "#fff",
          padding: "16px",
        }}
      >
        <p style={{ margin: 0, color: "rgba(31,23,22,0.7)", fontWeight: 600 }}>
          Live Preview
        </p>
        <pre
          style={{
            margin: "12px 0 0",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            font: "inherit",
            lineHeight: 1.75,
            color: "var(--mineral)",
          }}
        >
          {editorValue}
        </pre>
      </div>
    </div>
  );
}
