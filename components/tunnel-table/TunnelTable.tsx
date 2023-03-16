'use client';

import * as React from 'react';
import Tunnel from '@/tunneling/Tunnel';

import style from './TunnelTable.module.css';

const TunnelTable = () => {
    const [tunnels, setTunnels] = React.useState<Tunnel[] | undefined>(()=>{
        fetch('http://localhost:3000/api/tunnels', {
            method: 'GET'
        }).then(async (response: Response) => {
            return await response.json();
        }).then((tunnels: Tunnel[]) => {
            setTunnels(tunnels);
        }).catch((error: Error) => {
            console.error(error);
        });
        return undefined;
    });

    return (
        <div id={style.container}>
            {
                tunnels?.map((tunnel: Tunnel, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <div className={style.column}>{tunnel.name}</div>
                            <div className={style.column}>{tunnel.srcPort}</div>
                            <div className={style.column}>{tunnel.destHost}</div>
                            <div className={style.column}>{tunnel.destPort}</div>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default TunnelTable;