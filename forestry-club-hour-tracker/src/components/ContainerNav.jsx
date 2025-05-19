import { Link } from 'react-router-dom';
import { ContainerNavButton } from './ContainerNavButton';

function ContainerNav({ items = [] }) {
    return (
        <div className="admin-nav">
            {items.map((item, index) => (
                <ContainerNavButton
                    key={index}
                    onClick={item.onClick}
                    component={item.to ? Link : 'button'}
                    to={item.to}
                >
                    {item.label}
                </ContainerNavButton>
            ))}
        </div>
    );
}

export default ContainerNav;