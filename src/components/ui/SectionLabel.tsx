interface SectionLabelProps {
  children: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionLabel({ children, centered, light }: SectionLabelProps) {
  return (
    <p
      className={['eyebrow', centered ? 'is-centered' : '', light ? 'light' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </p>
  );
}
