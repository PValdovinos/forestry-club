import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { ContainerNavButton } from './ContainerNavButton';

const StyledNav = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'end',
}));

function ContainerNav({ items = [] }) {
    return (
        <StyledNav>
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
        </StyledNav>
    );
}

export default ContainerNav;