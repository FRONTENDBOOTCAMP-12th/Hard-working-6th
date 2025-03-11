interface TextLabelProps {
    text: string;
    className?: string;
  }
  
  const TextLabel = ({ text, className }: TextLabelProps) => {
    return <p className={`text-[var(--color-font)] ${className}`}>{text}</p>;
  };
  
  export default TextLabel;
  