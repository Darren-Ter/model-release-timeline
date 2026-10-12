interface Props {
  name: string;
  url: string | null;
  className?: string;
}

export function XPostLink({ name, url, className = '' }: Props) {
  const icon = <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>;
  if (!url) {
    return <button type="button" className={`x-post-link ${className}`} disabled
      aria-label={`No verified X announcement for ${name}`} title="No verified X announcement post">
      {icon}
    </button>;
  }
  return <a className={`x-post-link ${className}`} href={url} target="_blank" rel="noopener noreferrer"
    aria-label={`View ${name} announcement on X (opens in a new tab)`} title="View announcement on X">
    {icon}
  </a>;
}
