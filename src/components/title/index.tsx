interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <div className="flex flex-row justify-center">
      <h1 className="text-center text-theme-color underline-animation text-4xl md:text-5xl font-bold">
        {title}
      </h1>
    </div>
  );
}

export default Title;
