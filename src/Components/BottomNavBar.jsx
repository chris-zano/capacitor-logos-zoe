// Import necessary components
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BottomNavBarComponent = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { name: 'Home', icon: 'home', path: '/' },
        { name: 'Explore', icon: 'compass', path: '/explore' },
        { name: 'Broadcast', icon: 'broadcast-tower', path: '/broadcast' },
        { name: 'Shop', icon: 'shopping-cart', path: '/shop' },
        { name: 'Donate', icon: 'circle-dollar-to-slot', path: '/donate' }
    ];

    return (
        <footer id="footer_bottom_navbar">
            <ul id="bottom-navigation-list">
                {navItems.map(item => (
                    <li
                        key={item.name}
                        className={`nav-item ${currentPath === item.path ? 'nav-btn-active' : ''}`}
                        title={item.name}
                        aria-current={currentPath === item.path ? 'page' : undefined}
                    >
                        <NavLink to={item.path}>
                            <FontAwesomeIcon icon={['fas', item.icon]} />
                            <small>{item.name}</small>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </footer>
    );
};

export default BottomNavBarComponent;
