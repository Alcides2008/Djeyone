"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import {
  getSiteContent,
  saveSiteContent,
  defaultContent,
  type SiteContent,
  type HeroSlide,
} from "@/lib/content";
import { buttonClasses } from "@/components/ui/Button";

const inputCls =
  "mt-1.5 w-full rounded-sm border border-line bg-cream px-3 py-2.5 text-sm focus:border-gold focus:outline-none";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="tracking-luxe text-[11px] uppercase text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

const emptySlide: HeroSlide = {
  eyebrow: "",
  title: "",
  subtitle: "",
  ctaLabel: "",
  ctaHref: "/loja",
};

export function ContentManager() {
  const [c, setC] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getSiteContent()
      .then(setC)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const setSlide = (i: number, patch: Partial<HeroSlide>) =>
    setC((prev) => ({
      ...prev,
      hero: prev.hero.map((s, j) => (j === i ? { ...s, ...patch } : s)),
    }));

  const save = async () => {
    setSaving(true);
    setDone(false);
    try {
      await saveSiteContent(c);
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch (e) {
      alert("Falha ao guardar.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-muted">A carregar…</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl text-ink">Conteúdo do site</h1>
      <p className="mt-1 text-sm text-muted">
        Edite os textos principais da página inicial.
      </p>

      {/* Barra de anúncio */}
      <section className="mt-8">
        <h2 className="text-sm font-medium text-ink">Barra de anúncio (topo)</h2>
        <input
          value={c.announcement}
          onChange={(e) => setC({ ...c, announcement: e.target.value })}
          className={inputCls}
        />
      </section>

      {/* Hero */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-ink">Slides do Hero</h2>
          <button
            onClick={() => setC({ ...c, hero: [...c.hero, { ...emptySlide }] })}
            className="tracking-luxe flex items-center gap-1.5 text-[11px] uppercase text-muted hover:text-gold"
          >
            <Plus className="h-3.5 w-3.5" /> Adicionar slide
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-5">
          {c.hero.map((s, i) => (
            <div key={i} className="rounded-sm border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="tracking-luxe text-[10px] uppercase text-muted">
                  Slide {i + 1}
                </span>
                {c.hero.length > 1 && (
                  <button
                    onClick={() =>
                      setC({
                        ...c,
                        hero: c.hero.filter((_, j) => j !== i),
                      })
                    }
                    aria-label="Remover slide"
                    className="text-muted hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-col gap-3">
                <Field label="Sobretítulo">
                  <input
                    value={s.eyebrow}
                    onChange={(e) => setSlide(i, { eyebrow: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field label="Título (Enter = nova linha)">
                  <textarea
                    value={s.title}
                    onChange={(e) => setSlide(i, { title: e.target.value })}
                    rows={2}
                    className={inputCls}
                  />
                </Field>
                <Field label="Subtítulo">
                  <textarea
                    value={s.subtitle}
                    onChange={(e) => setSlide(i, { subtitle: e.target.value })}
                    rows={2}
                    className={inputCls}
                  />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Texto do botão">
                    <input
                      value={s.ctaLabel}
                      onChange={(e) =>
                        setSlide(i, { ctaLabel: e.target.value })
                      }
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Link do botão">
                    <input
                      value={s.ctaHref}
                      onChange={(e) => setSlide(i, { ctaHref: e.target.value })}
                      className={inputCls}
                    />
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo */}
      <section className="mt-10">
        <h2 className="text-sm font-medium text-ink">Banner promocional</h2>
        <div className="mt-3 flex flex-col gap-3 rounded-sm border border-line p-4">
          <Field label="Sobretítulo">
            <input
              value={c.promo.eyebrow}
              onChange={(e) =>
                setC({ ...c, promo: { ...c.promo, eyebrow: e.target.value } })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Título">
            <input
              value={c.promo.title}
              onChange={(e) =>
                setC({ ...c, promo: { ...c.promo, title: e.target.value } })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Subtítulo">
            <textarea
              value={c.promo.subtitle}
              onChange={(e) =>
                setC({ ...c, promo: { ...c.promo, subtitle: e.target.value } })
              }
              rows={2}
              className={inputCls}
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Texto do botão">
              <input
                value={c.promo.ctaLabel}
                onChange={(e) =>
                  setC({
                    ...c,
                    promo: { ...c.promo, ctaLabel: e.target.value },
                  })
                }
                className={inputCls}
              />
            </Field>
            <Field label="Link do botão">
              <input
                value={c.promo.ctaHref}
                onChange={(e) =>
                  setC({ ...c, promo: { ...c.promo, ctaHref: e.target.value } })
                }
                className={inputCls}
              />
            </Field>
          </div>
        </div>
      </section>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className={buttonClasses("primary", "lg", "min-w-32")}
        >
          {saving ? "A guardar…" : "Guardar alterações"}
        </button>
        {done && (
          <span className="flex items-center gap-1.5 text-sm text-gold-deep">
            <Check className="h-4 w-4" /> Guardado
          </span>
        )}
      </div>
    </div>
  );
}
