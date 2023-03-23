'use client';

import * as React from 'react';
import Tunnel from '@/tunneling/Tunnel';

import style from './TunnelTable.module.css';
import TunnelHeader from '../tunnel-header/TunnelHeader';
import TunnelInput from '../tunnel-input/TunnelInput';

const TunnelTable = () => {
    const [tunnels, setTunnels] = React.useState<Tunnel[] | undefined>(()=>{
        fetch('http://localhost:3000/api/tunnels', {
            method: 'GET'
        }).then(async (response: Response) => {
            if(response.status >= 300) {
                throw await response.json()
            }
            return await response.json();
        }).then((tunnels: Tunnel[]) => {
            setTunnels(tunnels);
        }).catch((error: Error) => {
            console.error(error);
        });
        return undefined;
    });

    const handleOnDelete = (tunnel: Tunnel) => {
        fetch('http://localhost:3000/api/tunnels/' + tunnel.name, {
            method: 'DELETE'
        }).then(async (response: Response) => {
            if(response.status >= 300) {
                throw await response.json()
            }
            return await response.json();
        }).then((tunnels: Tunnel[]) => {
            setTunnels(tunnels);
        }).catch((error: Error) => {
            console.error(error);
        });
    }

    return (
        <React.Fragment>
            <TunnelHeader></TunnelHeader>
            <TunnelInput tunnels={tunnels} setTunnels={setTunnels}></TunnelInput>
            <div id={style.container}>
                {
                    tunnels?.map((tunnel: Tunnel, index: number) => {
                        return (
                            <div key={index} className={style.row}>
                                <div className={style.column}>{tunnel.name}</div>
                                <div className={style.column}>{tunnel.srcPort}</div>
                                <div className={style.column}>{tunnel.destHost}</div>
                                <div className={style.column}>{tunnel.destPort}</div>
                                <div className={style.delete} onClick={()=>{handleOnDelete(tunnel)}}>X</div>
                            </div>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default TunnelTable;