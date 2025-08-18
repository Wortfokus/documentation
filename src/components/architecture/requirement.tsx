import React, { useState } from "react";

export type RequirementPriority = "low" | "medium" | "high";
export type RequirementStatus = "draft" | "proposed" | "approved" | "implemented" | "deprecated";

export interface Requirement {
    id: string;
    title: string;
    summary?: string;
    description?: string;
    type?: string;
    priority?: RequirementPriority;
    status?: RequirementStatus;
    acceptanceCriteria?: string[];
    owner?: string;
    stakeholders?: string[];
    tags?: string[];
    estimate?: string;
    createdAt?: string;
    updatedAt?: string;
    links?: { label: string; href: string }[];
}

const priorityColor = (p?: RequirementPriority) => {
    switch (p) {
        case "high": return "#ff6b6b";
        case "medium": return "#ffb86b";
        default: return "#8bd49b";
    }
};

const statusLabel = (s?: RequirementStatus) => {
    if (!s) return "unknown";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const RequirementCard: React.FC<{ req: Requirement }> = ({ req }) => {
    const [open, setOpen] = useState(false);
    return (
        <article
            aria-labelledby={`req-${req.id}-title`}
            style={{
                borderLeft: `6px solid ${priorityColor(req.priority)}`,
                background: "#ffffff",
                borderRadius: 8,
                padding: 12,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                marginBottom: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                <div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{req.id}</div>
                    <h3 id={`req-${req.id}-title`} style={{ margin: "4px 0" }}>{req.title}</h3>
                    {req.summary ? <div style={{ color: "#374151", fontSize: 13 }}>{req.summary}</div> : null}
                </div>
                <div style={{ textAlign: "right", minWidth: 110 }}>
                    <div style={{ fontSize: 12, marginBottom: 6 }}>
                        <span style={{
                            background: "#f3f4f6",
                            padding: "4px 8px",
                            borderRadius: 999,
                            marginRight: 6,
                            fontSize: 12,
                        }}>{req.type ?? "Requirement"}</span>
                        <span style={{
                            background: "#f3f4f6",
                            padding: "4px 8px",
                            borderRadius: 999,
                            fontSize: 12,
                        }}>{statusLabel(req.status)}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                        <div>Owner: {req.owner ?? "—"}</div>
                        <div style={{ marginTop: 6 }}>Estimate: {req.estimate ?? "—"}</div>
                    </div>
                </div>
            </header>

            <section>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(req.tags || []).map(t => (
                        <span key={t} style={{
                            background: "#eef2ff",
                            color: "#3730a3",
                            padding: "2px 8px",
                            borderRadius: 999,
                            fontSize: 12
                        }}>{t}</span>
                    ))}
                </div>
            </section>

            <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {req.links?.slice(0, 2).map(l => (
                        <a key={l.href} href={l.href} style={{ fontSize: 12, color: "#2563eb" }}>{l.label}</a>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setOpen(v => !v)} aria-expanded={open} style={{
                        background: "transparent", border: "1px solid #e5e7eb", padding: "6px 10px", borderRadius: 6, cursor: "pointer"
                    }}>{open ? "Less" : "More"}</button>
                    <button style={{
                        background: "#111827", color: "#fff", borderRadius: 6, padding: "6px 10px", border: "none", cursor: "pointer"
                    }}>Edit</button>
                </div>
            </footer>

            {open && (
                <div style={{ marginTop: 8, borderTop: "1px solid #f3f4f6", paddingTop: 8 }}>
                    {req.description ? <p style={{ marginBottom: 8 }}>{req.description}</p> : null}
                    {req.acceptanceCriteria && req.acceptanceCriteria.length > 0 && (
                        <div>
                            <strong>Acceptance criteria</strong>
                            <ul>
                                {req.acceptanceCriteria.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </article>
    );
};