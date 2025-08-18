import React, { useMemo, useState } from "react";
import { RequirementCard, Requirement } from "./Requirement";

export const sortFunctions = {
    "priority-desc": (a: Requirement, b: Requirement) => {
        const rank = { high: 3, medium: 2, low: 1 } as any;
        return (rank[b.priority ?? "low"] || 0) - (rank[a.priority ?? "low"] || 0);
    },
    "priority-asc": (a: Requirement, b: Requirement) => {
        const rank = { high: 3, medium: 2, low: 1 } as any;
        return (rank[a.priority ?? "low"] || 0) - (rank[b.priority ?? "low"] || 0);
    },
    "title-asc": (a: Requirement, b: Requirement) => (a.title || "").localeCompare(b.title || ""),
    "status-asc": (a: Requirement, b: Requirement) => (a.status || "").localeCompare(b.status || ""),
};

export const RequirementGrid: React.FC<{
    requirements: Requirement[];
    columns?: number;
}> = ({ requirements, columns = 3 }) => {
    const [query, setQuery] = useState("");
    const [tag, setTag] = useState<string | "">("");
    const [sort, setSort] = useState<keyof typeof sortFunctions>("priority-desc");

    const allTags = useMemo(() => {
        const s = new Set<string>();
        requirements.forEach(r => (r.tags || []).forEach(t => s.add(t)));
        return Array.from(s).sort();
    }, [requirements]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return requirements
            .filter(r => {
                if (tag && !(r.tags || []).includes(tag)) return false;
                if (!q) return true;
                return (
                    (r.id || "").toLowerCase().includes(q) ||
                    (r.title || "").toLowerCase().includes(q) ||
                    (r.summary || "").toLowerCase().includes(q) ||
                    (r.description || "").toLowerCase().includes(q) ||
                    (r.tags || []).join(" ").toLowerCase().includes(q)
                );
            })
            .sort(sortFunctions[sort]);
    }, [requirements, query, tag, sort]);

    return (
        <section>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
                <input
                    aria-label="Suchen"
                    placeholder="Suchen (id, Titel, Tag...)"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{
                        padding: "8px 10px",
                        borderRadius: 6,
                        border: "1px solid #e5e7eb",
                        minWidth: 220,
                    }}
                />

                <select
                    value={tag}
                    onChange={e => setTag(e.target.value as any)}
                    style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                >
                    <option value="">Alle Tags</option>
                    {allTags.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <select
                    value={sort}
                    onChange={e => setSort(e.target.value as any)}
                    style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e5e7eb" }}
                >
                    <option value="priority-desc">Priority (High → Low)</option>
                    <option value="priority-asc">Priority (Low → High)</option>
                    <option value="title-asc">Title (A → Z)</option>
                    <option value="status-asc">Status (A → Z)</option>
                </select>

                <div style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280" }}>
                    {filtered.length} von {requirements.length}
                </div>
            </div>

            <div
                role="list"
                style={{
                    display: "grid",
                    gap: 12,
                    gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(
                        220,
                        Math.floor(1000 / columns)
                    )}px, 1fr))`,
                }}
            >
                {filtered.map(r => (
                    <div key={r.id} role="listitem">
                        <RequirementCard req={r} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RequirementGrid;