import { Link } from 'react-router-dom';

function TableNav({ items = [] }) {
    return (
        <div className="admin-nav">
            {items.map((item, index) => {
                const button = (
                    <button className="admin-nav-btn" onClick={item.onClick}>
                        {item.label}
                    </button>
                );

                return item.to ? (
                    <Link to={item.to} key={index}>
                        {button}
                    </Link>
                ) : (
                    <div key={index}>{button}</div>
                );
            })}
        </div>
    );
}

export default TableNav;