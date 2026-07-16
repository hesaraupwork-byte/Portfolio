export default function Spinner({ scale = 1, dark = false }) {
  const style = { transform: `scale(${scale})` };
  if (dark) {
    style['--spinner-border'] = '#000';
    style['--spinner-bg'] = 'rgba(0, 0, 0, 0.15)';
  }

  return (
    <div style={style}>
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
