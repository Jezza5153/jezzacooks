// src/components/seo/json-ld.tsx
//
// Tiny helper for embedding JSON-LD. Prefer this over inline <script> blocks
// so that every schema block on the site goes through the same escaping path
// and is easy to audit/grep.

type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
};

export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify already escapes </ so this is safe against HTML
      // injection. We only ever pass in data we construct ourselves from
      // typed site config, never user input.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      {...(id ? { id } : {})}
    />
  );
}
