import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/MagicTech.png' : 'assets/layout/images/MagicTech.png'} alt="Logo" height="20" className="mr-2" style={{'height': '2.7em','width':'3em',}}/>
            por
            <span className="font-medium ml-2">MAGIC TECH</span>
        </div>
    );
}
