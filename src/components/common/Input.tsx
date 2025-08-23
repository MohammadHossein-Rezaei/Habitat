type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm ${props.className}`}
    />
  );
}
