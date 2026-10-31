import React from 'react';

interface PageHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHeader({
  badge,
  title,
  titleAccent,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="relative mb-8 text-center md:text-left">
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-fire/10 text-fire border border-fire/30">
          <span className="w-1.5 h-1.5 rounded-full bg-fire animate-pulse" />
          {badge}
        </div>
      )}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
        {title}{' '}
        {titleAccent && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-soft to-amber">
            {titleAccent}
          </span>
        )}
      </h1>
      <p className="mt-2 text-base md:text-lg text-slate-400 max-w-2xl">
        {description}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
