import '@styles/options.scss';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  return <div className="OptionsContainer">{title} Page</div>;
};

export default Options;
