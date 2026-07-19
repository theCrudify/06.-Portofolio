type Props = {
  className?: string;
};

export function DataStream({ className = "" }: Props) {
  return <div className={`data-stream ${className}`} aria-hidden="true" />;
}
