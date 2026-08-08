function WhatsAppFloat() {
  return (
    <a
      href="#"
      aria-label="Contacter sur WhatsApp"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 80,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '13px 18px 13px 15px',
        borderRadius: 999,
        background: 'rgba(20,17,14,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,162,75,0.3)',
        color: '#F5EFE6',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
      }}
    >
      <span style={{ color: '#6FD397', display: 'flex' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 9c0 3.5 3 6.5 6.5 6.5.6 0 1-.5 1-1l-.2-1.6-2 .5c-1.4-.6-2.6-1.8-3.2-3.2l.5-2L9.5 8c-.5 0-1 .4-1 1z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 600 }}>WhatsApp</span>
    </a>
  );
}

export default WhatsAppFloat;
