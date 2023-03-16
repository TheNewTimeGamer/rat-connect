import * as React from 'react';

import style from './TunnelHeader.module.css';

const TunnelHeader = () => {
    return (
        <div id={style.container}>
            <div className={style.columnHeader}>Name</div>
            <div className={style.columnHeader}>Source port</div>
            <div className={style.columnHeader}>Destination host</div>
            <div className={style.columnHeader}>Destination port</div>
        </div>
    );
}

export default TunnelHeader;