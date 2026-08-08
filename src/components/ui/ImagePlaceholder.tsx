type Props = {
  label: string;
};

function ImagePlaceholder({ label }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(135deg, #2a241d 0%, #1a1712 50%, #14110E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(230, 200, 120, 0.55)',
        fontSize: 13,
        fontStyle: 'italic',
        padding: 20,
        textAlign: 'center',
        letterSpacing: 0.4,
      }}
    >
      {label}
    </div>
  );
}

export default ImagePlaceholder;
