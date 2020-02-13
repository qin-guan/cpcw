import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function EquationHeader(props: { formula: string; title: string; topic: string; width: number }) {
    return (
        <div style={{ display: "flex", justifyContent: 'space-between', flexDirection: props.width < 850 ? "column" : 'row', alignItems: props.width < 850 ? 'flex-start' : 'center' }}>
            <div style={{marginRight: 15}}>
                <h1 style={{ fontWeight: 'bold' }}>{props.title}</h1>
                <h5>{props.topic}</h5>
            </div>
            <BlockMath math={"\\huge " + props.formula}></BlockMath>
        </div>
    )
}