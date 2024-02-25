interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <h1 className="text-theme-color underline-animation text-6xl font-bold">
      {title}
    </h1>
  );
}

export default Title;
