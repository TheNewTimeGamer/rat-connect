'use client';

import * as React from 'react';
import Tunnel from '@/tunneling/Tunnel';

import style from './TunnelInput.module.css';

const TunnelInput = () => {
    const [name, setName] = React.useState<string>('');
    const [srcPort, setSrcPort] = React.useState<string>('');
    const [destHost, setDestHost] = React.useState<string>('');
    const [destPort, setDestPort] = React.useState<string>('');

    const handleOnClick = () => {
        console.log('saving');
        fetch('http://localhost:3000/api/tunnels', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                srcPort: srcPort,
                destHost: destHost,
                destPort: destPort
            })
        }).then(async (response: Response) => {
            return await response.json();
        }).then((tunnels: Tunnel[]) => {
            console.log(tunnels);
        }).catch((error: Error) => {
            console.error(error);
        });
        return undefined;
    }

    return (
        <div id={style.container}>
            <input value={name} onChange={(e: any) => {setName(e.target.value)}} className={style.input}></input>
            <input value={srcPort} onChange={(e: any) => {setSrcPort(e.target.value)}} className={style.input}></input>
            <input value={destHost} onChange={(e: any) => {setDestHost(e.target.value)}} className={style.input}></input>
            <input value={destPort} onChange={(e: any) => {setDestPort(e.target.value)}} className={style.input}></input>
            <div id={style.add} onClick={handleOnClick}>+</div>
        </div>
    );
}

export default TunnelInput;