'use client';

import { useState, useEffect } from 'react';
import { Twitter, Linkedin, Facebook, MessageCircle, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  variant?: 'row' | 'sidebar';
}

export default function ShareButtons({ url, title, variant = 'row' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Ensure we have the full URL on the client side
    setShareUrl(window.location.origin + url);
  }, [url]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter size={14} />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-black hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={14} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-[#0077b5] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={14} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#1877f2] hover:text-white',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={14} />,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (variant === 'sidebar') {
    return (
      <div className="flex gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 border border-[var(--heading-primary)] flex items-center justify-center text-[var(--heading-primary)] transition-all duration-300 ${link.color}`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="w-9 h-9 border border-[var(--heading-primary)] flex items-center justify-center text-[var(--heading-primary)] hover:bg-[var(--heading-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 relative"
          title="Copy Link"
        >
          {copied ? <Check size={14} className="text-green-600" /> : <LinkIcon size={14} />}
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-6 py-3 border-2 border-[var(--heading-primary)] text-[var(--heading-primary)] text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group ${link.color}`}
        >
          {link.icon} <span>{link.name}</span>
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 px-6 py-3 border-2 border-[var(--heading-primary)] text-[var(--heading-primary)] text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--heading-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 relative"
      >
        {copied ? <Check size={14} className="text-green-600" /> : <LinkIcon size={14} />}
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}
