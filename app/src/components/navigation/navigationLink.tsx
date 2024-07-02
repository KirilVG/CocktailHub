import { Link } from 'react-router-dom';

interface NavigationLinkProp {
    dataTestId: string,
    to: string,
    iconComponent?: any,
    id?: string,
    text?: string
}

const NavigationLink:React.FC<NavigationLinkProp> = ({ id, to, text, dataTestId, iconComponent: Icon }) => {
  return (
    <Link id={id} to={to} className="block text-white" data-testid={dataTestId}>
      {text}
      {Icon && <Icon className="text-white hover:text-[#E27532] size-10" />}
    </Link>
  );
};

export default NavigationLink;
