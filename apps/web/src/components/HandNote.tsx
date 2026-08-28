import styles from './HandNote.module.css';

interface HandNoteProps {
  text: string;
}

export default function HandNote({ text }: HandNoteProps) {
  const paragraphes = text.split(/\n\n+/).filter(Boolean);

  return (
    <div className={styles.sheet}>
      <span className="tape" />
      {paragraphes.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
